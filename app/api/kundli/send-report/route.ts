import { NextRequest, NextResponse } from "next/server";

function buildEmailHtml(
  name: string,
  reading: string,
  birthDate: string,
  birthTime: string,
  birthLocation: string
): string {
  const bodyHtml = reading
    .split("\n")
    .map((line) => {
      if (line.startsWith("### ")) return `<h3 style="font-family:Georgia,serif;color:#2C1608;margin:20px 0 6px;">${line.slice(4)}</h3>`;
      if (line.startsWith("## "))  return `<h2 style="font-family:Georgia,serif;color:#2C1608;font-size:18px;margin:24px 0 8px;">${line.slice(3)}</h2>`;
      if (line.startsWith("- "))   return `<li style="color:#4a3728;margin:4px 0 4px 16px;">${line.slice(2)}</li>`;
      if (line === "---")           return `<hr style="border:none;border-top:1px solid #e8dfd0;margin:20px 0;" />`;
      if (line.trim() === "")       return `<div style="height:8px;"></div>`;
      return `<p style="font-family:Georgia,serif;color:#4a3728;line-height:1.75;margin:0 0 10px;">${line}</p>`;
    })
    .join("\n");

  const displayName = name && name !== "Seeker" ? name : "Seeker";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Your Free Kundli Reading &middot; Setu</title></head>
<body style="margin:0;padding:0;background:#FAF7F0;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F0;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <tr><td style="background:linear-gradient(135deg,#2C1608,#610000);border-radius:12px 12px 0 0;padding:36px 40px;text-align:center;">
    <p style="font-size:13px;letter-spacing:0.1em;color:#C4922A;margin:0 0 10px;text-transform:uppercase;">Vedic Astrology &middot; Setu</p>
    <h1 style="font-family:Georgia,serif;font-size:28px;color:#FAF7F0;margin:0 0 6px;font-weight:600;">Your Free Kundli Reading</h1>
    <p style="font-size:14px;color:rgba(250,247,240,0.65);margin:0;">Prepared for ${displayName}</p>
  </td></tr>

  <tr><td style="background:#FCFAF5;padding:16px 40px;border-left:1px solid #e8dfd0;border-right:1px solid #e8dfd0;">
    <p style="font-size:12px;color:#8a6a54;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 4px;">Birth Details</p>
    <p style="font-size:14px;color:#2C1608;margin:0;">${birthDate} &middot; ${birthTime} &middot; ${birthLocation}</p>
  </td></tr>

  <tr><td style="background:#FCFAF5;padding:0 40px;border-left:1px solid #e8dfd0;border-right:1px solid #e8dfd0;">
    <div style="height:1px;background:#e8dfd0;"></div>
  </td></tr>

  <tr><td style="background:#FCFAF5;padding:32px 40px;border-left:1px solid #e8dfd0;border-right:1px solid #e8dfd0;">
    ${bodyHtml}
  </td></tr>

  <tr><td style="background:#FCFAF5;padding:0 40px 32px;border-left:1px solid #e8dfd0;border-right:1px solid #e8dfd0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#2C1608,#610000);border-radius:10px;padding:24px 28px;">
      <tr><td>
        <p style="font-size:16px;color:#FAF7F0;font-weight:600;margin:0 0 8px;">Ready for your complete reading?</p>
        <p style="font-size:13px;color:rgba(250,247,240,0.75);margin:0 0 20px;line-height:1.6;">Book a verified Setu astrologer for a full Jyotish report &mdash; career, relationships, timing, and personalized remedies.</p>
        <a href="https://capstoneproject-gilt.vercel.app/services?category=astrology"
           style="display:inline-block;background:#C4922A;color:#FAF7F0;font-size:14px;font-weight:600;padding:12px 28px;border-radius:6px;text-decoration:none;">
          Book a Full AI Reading &rarr;
        </a>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="background:#FAF7F0;border:1px solid #e8dfd0;border-top:none;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
    <p style="font-size:12px;color:#8a6a54;margin:0 0 6px;">&copy; 2026 Setu &middot; Sacred moments deserve better.</p>
    <p style="font-size:11px;color:#b09880;margin:0;">
      You received this because you requested a free Kundli reading at setu.app.<br/>
      <a href="https://capstoneproject-gilt.vercel.app/unsubscribe" style="color:#C4922A;">Unsubscribe</a> &middot;
      <a href="https://capstoneproject-gilt.vercel.app/privacy" style="color:#C4922A;">Privacy Policy</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.SENDER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
  }

  const { email, name, reading, birthDate, birthTime, birthLocation } = await req.json();
  if (!email || !reading) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const displayName = name && name !== "Seeker" ? name : "Seeker";
  const subject = `${displayName !== "Seeker" ? `${displayName}, your` : "Your"} free Kundli reading is ready ❖`;

  try {
    const res = await fetch("https://api.sender.net/v2/transactional/email", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        from: {
          name: "Setu · Sacred Astrology",
          email: process.env.SENDER_FROM_EMAIL || "kundli@setu.app",
        },
        to: [{ email, name: displayName }],
        subject,
        html: buildEmailHtml(displayName, reading, birthDate, birthTime, birthLocation),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[send-report] Sender error:", err);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[send-report] fetch error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
