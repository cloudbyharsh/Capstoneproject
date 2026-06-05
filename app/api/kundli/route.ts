import Groq from "groq-sdk";
import { NextRequest } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function geocode(location: string): Promise<{ lat: number; lng: number }> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Setu-Spiritual-Marketplace/1.0 (contact@setu.app)" },
    });
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
  } catch { /* fall back */ }
  return { lat: 43.65, lng: -79.38 };
}

async function fetchProkeralaKundli(
  birthDate: string, birthTime: string,
  lat: number, lng: number, birthLocation: string
): Promise<string> {
  try {
    const dt = new Date(`${birthDate}T${birthTime}`);
    const isIndia = ["india","mumbai","delhi","bangalore","chennai","kolkata","hyderabad","pune","ahmedabad"]
      .some(c => birthLocation.toLowerCase().includes(c));
    const offsetMin = isIndia ? 330 : Math.round(lng / 15) * 60;
    const sign = offsetMin >= 0 ? "+" : "-";
    const abs  = Math.abs(offsetMin);
    const hh   = String(Math.floor(abs / 60)).padStart(2, "0");
    const mm   = String(abs % 60).padStart(2, "0");
    const local = new Date(dt.getTime() + offsetMin * 60_000);
    const isoStr = local.toISOString().slice(0, 19) + `${sign}${hh}:${mm}`;

    const tokenRes = await fetch("https://api.prokerala.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id:  process.env.PROKERALA_CLIENT_ID!,
        client_secret: process.env.PROKERALA_CLIENT_SECRET!,
      }),
    });
    const token = (await tokenRes.json()).access_token;

    const url = new URL("https://api.prokerala.com/v2/astrology/kundli");
    url.searchParams.set("datetime",    isoStr);
    url.searchParams.set("coordinates", `${lat},${lng}`);
    url.searchParams.set("ayanamsa",    "1");

    const res = await fetch(url.toString(), { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return "(Chart data unavailable)";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any = await res.json();
    const d = raw?.data ?? raw;
    const lines: string[] = ["=== BIRTH CHART (Prokerala, Lahiri Ayanamsa) -- FOR INTERNAL USE ONLY ==="];

    if (d.ascendant)     lines.push(`Ascendant: ${d.ascendant.name ?? d.ascendant}`);
    if (d.moon_sign)     lines.push(`Moon Sign: ${d.moon_sign.name ?? d.moon_sign}`);
    if (d.sun_sign)      lines.push(`Sun Sign: ${d.sun_sign.name ?? d.sun_sign}`);
    if (d.nakshatra)     lines.push(`Nakshatra: ${d.nakshatra.name ?? d.nakshatra} (Pada ${d.nakshatra.pada ?? "--"})`);
    if (d.dasha?.name)   lines.push(`Mahadasha: ${d.dasha.name} (ends ${d.dasha.end ?? "--"})`);
    if (d.antardasha?.name) lines.push(`Antardasha: ${d.antardasha.name}`);
    if (Array.isArray(d.planets) && d.planets.length > 0) {
      lines.push("\nPlanetary Positions:");
      for (const p of d.planets) {
        const retro = p.is_retrograde ? " (R)" : "";
        lines.push(`  ${p.name ?? p.id}: ${p.rashi?.name ?? p.sign ?? "--"}, House ${p.house ?? "--"}${retro}`);
      }
    }
    return lines.join("\n");
  } catch (err) {
    console.error("[kundli] Prokerala fetch failed:", err);
    return "(Chart data unavailable -- derive from classical Vedic principles)";
  }
}

// Save lead to Sender subscriber list (fire-and-forget, non-fatal)
async function saveLeadToSender(
  email: string,
  name: string,
  birthDate: string,
  birthLocation: string
): Promise<void> {
  try {
    const groupId = process.env.SENDER_GROUP_ID;
    const apiKey = process.env.SENDER_API_KEY;
    if (!apiKey) return;

    await fetch("https://api.sender.net/v2/subscribers", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email,
        firstname: name?.split(" ")[0] || "",
        lastname: name?.split(" ").slice(1).join(" ") || "",
        groups: groupId ? [groupId] : [],
        tags: ["Free Kundli Lead"],
        fields: {
          birth_date: birthDate,
          birth_location: birthLocation,
          submitted_at: new Date().toISOString(),
        },
      }),
    });
  } catch (err) {
    console.error("[kundli] Lead save failed:", err);
  }
}

export async function POST(req: NextRequest) {
  const { name, birthDate, birthTime, birthLocation, email, consent } = await req.json();

  if (!birthDate || !birthTime || !birthLocation) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "A valid email address is required." }), { status: 400 });
  }
  if (!consent) {
    return new Response(JSON.stringify({ error: "Consent is required to generate your report." }), { status: 400 });
  }
  if (!process.env.GROQ_API_KEY) {
    return new Response(
      JSON.stringify({ error: "GROQ_API_KEY not configured. Add it to .env.local." }),
      { status: 503 }
    );
  }

  // Save lead before streaming (fire-and-forget)
  saveLeadToSender(email, name || "", birthDate, birthLocation);

  const { lat, lng } = await geocode(birthLocation);
  const chartData    = await fetchProkeralaKundli(birthDate, birthTime, lat, lng, birthLocation);
  const personName   = name || "the seeker";

  const systemPrompt =
    "You are a deeply perceptive Vedic astrology reader. Your task is not to generate an astrology report. " +
    "Your task is to produce a psychological reading that causes the user to feel emotionally recognized " +
    "and then creates a specific kind of incompleteness that makes them want to understand the deeper cause. " +
    "The reading must feel intimate and eerily accurate. It must never feel generic, mystical, or like a horoscope. " +
    "The tone is closer to a perceptive therapist than a spiritual guide. " +
    "\n\nCORE RULES:" +
    "\n1. Never use horoscope language or mystical phrasing." +
    "\n2. No generic trait lists. Every observation must feel emotionally specific." +
    "\n3. Use astrology internally for interpretation -- surface observations, not calculations." +
    "\n4. Never fully resolve an emotional pattern. Always withhold the planetary cause." +
    "\n5. Create open loops throughout -- the free report surfaces what, never why." +
    "\n6. Focus on internal contradictions more than strengths." +
    "\n7. Avoid 'you are X' statements. Use 'you may have noticed', 'there may be a recurring tendency', 'part of you'." +
    "\n8. NEVER use section headings or labels like 'Part 1', 'Part 2' in the output. Flow as continuous prose with natural paragraph breaks." +
    "\n9. The free report should end with the user feeling emotionally seen but causally unsatisfied." +
    "\n10. One moment in the report must feel uncomfortably specific -- slightly exposing, not negative.";

  const userPrompt =
    `Birth Date: ${birthDate}\nBirth Time: ${birthTime}\nBirth Location: ${birthLocation}\nName: ${personName}\n\n` +
    `${chartData}\n\n` +
    `Using the chart data above INTERNALLY ONLY (do not surface it as a data list), write the following reading as continuous flowing prose -- no headings, no labels, no bullet points until the chart layout and final CTA sections. ` +
    `Every section flows naturally into the next as a single intimate document.\n\n` +

    `PART 1 -- EMOTIONAL CORE (write as opening paragraphs, no heading):\n` +
    `Open with 2-3 sentences referencing the ascendant and moon sign in plain emotional language -- no jargon unless immediately translated. Create immediate self-recognition. ` +
    `Then surface one nakshatra-specific quality as a plain emotional observation -- do not name the nakshatra unless it adds recognition. ` +
    `Then add one Mahadasha anchor referencing the lord in plain-language emotional theme -- this signals individual calculation. ` +
    `Example: "You are currently in a [planet] period -- a phase that tends to reorganize how people relate to [plain-language theme]."\n\n` +

    `PART 2 -- PATTERNS FELT BUT NEVER NAMED (no heading, flows from Part 1):\n` +
    `Write 3 emotionally specific internal patterns as flowing prose. Each must feel intimate and slightly exposing -- naming something privately felt but never fully articulated. ` +
    `Use language like "you may replay," "there may be periods where," "you may outgrow." ` +
    `Never explain the planetary cause. ` +
    `After the third pattern, add naturally in the prose: "One placement in your chart may explain why this pattern repeats with more intensity than it does for most people." Do not say which placement.\n\n` +

    `PART 3 -- THE INNER CONTRADICTION (no heading):\n` +
    `Write one major psychological contradiction specific to this chart combination. Feels deeply human and slightly exposing. ` +
    `Follow with: "This tension tends to become most visible during emotionally significant phases -- and your chart suggests you may currently be in one of those phases." ` +
    `Then add as a natural observation (not a sales line): "The specific planetary dynamic behind this pattern is one of the more revealing things your complete reading surfaces -- because it also appears in your relationship and career timing."\n\n` +

    `PART 4 -- RELATIONSHIP PATTERN PREVIEW (no heading):\n` +
    `Surface: attachment tendency, core emotional need, one hidden relationship fear, one recurring emotional dynamic -- all in observational prose language. ` +
    `Then add: "There may be a recurring dynamic in your closer relationships that your chart maps quite specifically -- one that becomes much clearer when viewed through your current life phase timing." ` +
    `Close with: "Your full compatibility reading explores why certain emotional dynamics feel unusually significant or intense for you."\n\n` +

    `PART 5 -- CURRENT LIFE PHASE (no heading):\n` +
    `Describe the Mahadasha as emotional transition only. No predictions or event forecasts. Focus on what may be shifting internally, what is losing or gaining emotional weight, what quiet reassessment may be underway. ` +
    `Tone: something is reorganizing inside -- not dramatic, but real and ongoing. ` +
    `Close with: "The deeper reason why this particular phase feels the way it does -- and what it is likely moving toward -- is mapped in detail in your complete reading."\n\n` +

    `PART 6 -- WHAT PEOPLE MISREAD ABOUT YOU (no heading):\n` +
    `Write 2 observations about how others perceive this person incorrectly. Pull specifically from the ascendant and moon combination. This section should feel like private validation -- the user thinks "yes, and it frustrates me that people don't see that."\n\n` +

    `PART 7 -- HIDDEN THEMES (no heading):\n` +
    `Write 3 curiosity hooks as natural observations -- NOT marketing lines. The user should not be able to tell these are designed to create intent. ` +
    `Each implies depth without resolving it. Planetary cause always withheld. ` +
    `One must feel unusually precise about their emotional life. One must reference repeating life patterns. One must create a question about timing. ` +
    `WRONG tone: "A rare planetary combination affects your confidence." ` +
    `RIGHT tone: "One pattern in your chart may explain why certain experiences -- particularly around trust or emotional investment -- tend to affect you more deeply than they appear to affect others."\n\n` +

    `PART 8 -- CHART LAYOUT (brief, plain text, this section CAN use a simple list format):\n` +
    `List planetary placements, signs, houses, and current Mahadasha. Keep very brief. Purpose is credibility only. Do not interpret anything here. ` +
    `Label this section clearly as "Your Chart" with a simple line break before it.\n\n` +

    `PART 9 -- CLOSING CTA (can use light formatting for the bullet list):\n` +
    `Write exactly this, adapting name naturally:\n` +
    `"This reading surfaces the patterns. Your complete reading explains the causes -- the specific planetary combinations behind the contradictions you likely recognized above, the emotional timing of your current phase, and what the next significant personal window looks like for you specifically.\n\n` +
    `Your full report includes:\n` +
    `- Why certain emotional and relationship patterns repeat so strongly for you\n` +
    `- The planetary causes behind your career momentum and timing windows\n` +
    `- Compatibility and relationship karma analysis\n` +
    `- Your next 12 months mapped against your personal cycle\n` +
    `- Personalized remedies based on your specific chart\n` +
    `- Gemstone and mantra guidance\n\n` +
    `Most people who read this recognize something true about themselves. The complete reading explains why it is true."\n\n` +
    `*Book with a verified Setu astrologer -- starting at $175.*`;

  const stream = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    stream: true,
    max_tokens: 3000,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user",   content: userPrompt },
    ],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? "";
        if (text) controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
