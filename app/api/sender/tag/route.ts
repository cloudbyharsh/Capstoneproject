import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/sender/tag
 *
 * Adds (or updates) a subscriber in Sender and assigns them to one or more
 * automation groups. Each group ID maps to a Sender Group you created manually
 * in the Sender dashboard → Subscribers → Groups.
 *
 * Body: { email: string; name?: string; groups: GroupKey[] }
 *
 * GroupKey values (add these as Vercel env vars with the matching Sender group ID):
 *   "kundli_lead"       → SENDER_GROUP_KUNDLI_LEAD
 *   "report_sent"       → SENDER_GROUP_REPORT_SENT
 *   "preview_viewed"    → SENDER_GROUP_PREVIEW_VIEWED
 *   "unlock_clicked"    → SENDER_GROUP_UNLOCK_CLICKED
 *   "consult_interest"  → SENDER_GROUP_CONSULT_INTEREST
 *
 * Returns: { success: true } on success, or an error object.
 */

type GroupKey =
  | "kundli_lead"
  | "report_sent"
  | "preview_viewed"
  | "unlock_clicked"
  | "consult_interest";

const GROUP_ENV_MAP: Record<GroupKey, string> = {
  kundli_lead:      "SENDER_GROUP_KUNDLI_LEAD",
  report_sent:      "SENDER_GROUP_REPORT_SENT",
  preview_viewed:   "SENDER_GROUP_PREVIEW_VIEWED",
  unlock_clicked:   "SENDER_GROUP_UNLOCK_CLICKED",
  consult_interest: "SENDER_GROUP_CONSULT_INTEREST",
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.SENDER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.email || !Array.isArray(body.groups) || body.groups.length === 0) {
    return NextResponse.json({ error: "email and groups[] are required." }, { status: 400 });
  }

  const { email, name, groups } = body as { email: string; name?: string; groups: GroupKey[] };

  // Resolve group keys → Sender group IDs from env vars; silently skip unconfigured ones
  const groupIds: string[] = groups
    .map((key) => process.env[GROUP_ENV_MAP[key]] ?? "")
    .filter(Boolean);

  if (groupIds.length === 0) {
    // Groups not yet configured in Vercel — log and return success so the frontend
    // doesn't break. Set up the env vars to activate automations.
    console.warn("[sender/tag] No group IDs configured for keys:", groups);
    return NextResponse.json({ success: true, note: "no_groups_configured" });
  }

  try {
    const res = await fetch("https://api.sender.net/v2/subscribers", {
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
        groups: groupIds,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[sender/tag] Sender API error:", err);
      return NextResponse.json({ error: "Sender API error." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[sender/tag] fetch error:", err);
    return NextResponse.json({ error: "Network error." }, { status: 500 });
  }
}
