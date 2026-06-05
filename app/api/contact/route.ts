import { NextRequest, NextResponse } from "next/server";

function buildUserEmail(name: string, subject: string, message: string): string {
  const displayName = name || "there";
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Thanks for reaching out &middot; Setu</title></head>
<body style="margin:0;padding:0;background:#FAF7F0;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F0;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <tr><td style="background:linear-gradient(135deg,#2C1608,#610000);border-radius:12px 12px 0 0;padding:36px 40px;text-align:center;">
    <p style="font-size:13px;letter-spacing:0.1em;color:#C4922A;margin:0 0 10px;text-transform:uppercase;">Setu &middot; Sacred Moments Deserve Better</p>
    <h1 style="font-family:Georgia,serif;font-size:26px;color:#FAF7F0;margin:0 0 6px;font-weight:600;">Thank You for Connecting</h1>
    <p style="font-size:14px;color:rgba(250,247,240,0.65);margin:0;">We&rsquo;ve received your message, ${displayName}.</p>
  </td></tr>

  <tr><td style="background:#FCFAF5;padding:32px 40px;border-left:1px solid #e8dfd0;border-right:1px solid #e8dfd0;">
    <p style="font-family:Georgia,serif;color:#4a3728;font-size:15px;line-height:1.75;margin:0 0 16px;">
      Thank you for reaching out to Setu. We&rsquo;ve received your message and our team will get back to you within 24 hours.
    </p>
    <div style="background:#FAF7F0;border-left:3px solid #C4922A;padding:16px 20px;border-radius:0 8px 8px 0;margin:0 0 24px;">
      <p style="font-size:12px;color:#8a6a54;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 6px;">Your message</p>
      <p style="font-size:14px;color:#2C1608;font-weight:600;margin:0 0 4px;">${subject}</p>
      <p style="font-size:14px;color:#4a3728;margin:0;line-height:1.6;">${message}</p>
    </div>
    <p style="font-family:Georgia,serif;color:#4a3728;font-size:15px;line-height:1.75;margin:0;">
      While you wait, why not explore your free Kundli reading? Our AI &mdash; trained on classical Vedic Jyotish &mdash; will reveal your Ascendant, Moon sign, and current life phase in seconds.
    </p>
  </td></tr>

  <tr><td style="background:#FCFAF5;padding:0 40px 32px;border-left:1px solid #e8dfd0;border-right:1px solid #e8dfd0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#2C1608,#610000);border-radius:10px;padding:24px 28px;">
      <tr><td>
        <p style="font-size:16px;color:#FAF7F0;font-weight:600;margin:0 0 8px;">Explore Setu&rsquo;s Services</p>
        <p style="font-size:13px;color:rgba(250,247,240,0.75);margin:0 0 20px;line-height:1.6;">Book verified pandits, get your free Kundli, or consult a Vedic astrologer &mdash; all in one place.</p>
        <a href="https://capstoneproject-gilt.vercel.app/kundli"
           style="display:inline-block;background:#C4922A;color:#FAF7F0;font-size:14px;font-weight:600;padding:12px 28px;border-radius:6px;text-decoration:none;">
          Get Your Free Kundli &rarr;
        </a>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="background:#FAF7F0;border:1px solid #e8dfd0;border-top:none;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
    <p style="font-size:12px;color:#8a6a54;margin:0 0 6px;">&copy; 2026 Setu &middot; Sacred moments deserve better.</p>
    <p style="font-size:11px;color:#b09880;margin:0;">
      <a href="https://capstoneproject-gilt.vercel.app/privacy" style="color:#C4922A;">Privacy Policy</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}

function buildNotificationEmail(name: string, email: string, phone: string, subject: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>New Contact Form Submission &middot; Setu</title></head>
<body style="margin:0;padding:0;background:#FAF7F0;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F0;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr><td style="background:linear-gradient(135deg,#2C1608,#610000);border-radius:12px 12px 0 0;padding:28px 40px;">
    <p style="font-size:13px;letter-spacing:0.1em;color:#C4922A;margin:0 0 6px;text-transform:uppercase;">Setu Admin</p>
    <h1 style="font-family:Georgia,serif;font-size:22px;color:#FAF7F0;margin:0;font-weight:600;">New Contact Form Submission</h1>
  </td></tr>
  <tr><td style="background:#FCFAF5;padding:32px 40px;border-left:1px solid #e8dfd0;border-right:1px solid #e8dfd0;">
    <table width="100%" cellpadding="0" cellspacing="0">
      ${[
        ["Name", name],
        ["Email", email],
        ["Phone", phone],
        ["Subject", subject],
      ].map(([label, value]) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #e8dfd0;width:120px;">
          <span style="font-size:12px;color:#8a6a54;text-transform:uppercase;letter-spacing:0.08em;">${label}</span>
        </td>
        <td style="padding:8px 0 8px 16px;border-bottom:1px solid #e8dfd0;">
          <span style="font-size:14px;color:#2C1608;font-weight:600;">${value}</span>
        </td>
      </tr>`).join("")}
    </table>
    <div style="margin-top:24px;">
      <p style="font-size:12px;color:#8a6a54;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">Message</p>
      <p style="font-size:14px;color:#4a3728;line-height:1.7;margin:0;background:#FAF7F0;padding:16px;border-radius:8px;border-left:3px solid #C4922A;">${message}</p>
    </div>
    <div style="margin-top:24px;">
      <a href="mailto:${email}" style="display:inline-block;background:#2C1608;color:#FAF7F0;font-size:14px;font-weight:600;padding:10px 24px;border-radius:6px;text-decoration:none;">
        Reply to ${name} &rarr;
      </a>
    </div>
  </td></tr>
  <tr><td style="background:#FAF7F0;border:1px solid #e8dfd0;border-top:none;border-radius:0 0 12px 12px;padding:16px 40px;text-align:center;">
    <p style="font-size:11px;color:#b09880;margin:0;">Setu Admin Notification &middot; Do not share externally.</p>
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

  const { name, email, phone, subject, message } = await req.json();

  if (!name || !email || !phone || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const fromEmail = process.env.SENDER_FROM_EMAIL || "kundli@setu.app";
  const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL || "haarsh.shahh@gmail.com";
  const groupId = process.env.SENDER_GROUP_ID;

  try {
    // 1. Save to Sender.net subscriber list (fire-and-forget)
    fetch("https://api.sender.net/v2/subscribers", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email,
        firstname: name.split(" ")[0] || "",
        lastname: name.split(" ").slice(1).join(" ") || "",
        groups: groupId ? [groupId] : [],
        tags: ["Contact Form"],
        fields: {
          phone,
          subject,
          submitted_at: new Date().toISOString(),
        },
      }),
    }).catch(() => {});

    // 2. Send confirmation email to user
    const userRes = await fetch("https://api.sender.net/v2/transactional/email", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        from: { name: "Setu", email: fromEmail },
        to: [{ email, name }],
        subject: `${name.split(" ")[0]}, we received your message — Setu`,
        html: buildUserEmail(name, subject, message),
      }),
    });

    if (!userRes.ok) {
      console.error("[contact] User email failed:", await userRes.text());
    }

    // 3. Send notification email to admin
    const adminRes = await fetch("https://api.sender.net/v2/transactional/email", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        from: { name: "Setu Contact Form", email: fromEmail },
        to: [{ email: notifyEmail, name: "Setu Admin" }],
        subject: `New contact: ${subject} — from ${name}`,
        html: buildNotificationEmail(name, email, phone, subject, message),
      }),
    });

    if (!adminRes.ok) {
      console.error("[contact] Admin notification failed:", await adminRes.text());
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
