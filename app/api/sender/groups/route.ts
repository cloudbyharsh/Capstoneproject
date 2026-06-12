import { NextResponse } from "next/server";

/**
 * GET /api/sender/groups
 *
 * Lists all Sender groups with their IDs and names.
 * Use this to get the correct group IDs to put in your Vercel env vars.
 *
 * Remove or protect this endpoint after you've set up your env vars.
 */
export async function GET() {
  const apiKey = process.env.SENDER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "SENDER_API_KEY not configured." }, { status: 503 });
  }

  try {
    const res = await fetch("https://api.sender.net/v2/groups", {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Accept": "application/json",
      },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json({ error: "Sender API error.", detail: data }, { status: 500 });
    }

    // Also show what's currently configured in env vars
    const configured = {
      SENDER_GROUP_KUNDLI_LEAD:      process.env.SENDER_GROUP_KUNDLI_LEAD ?? "(not set)",
      SENDER_GROUP_REPORT_SENT:      process.env.SENDER_GROUP_REPORT_SENT ?? "(not set)",
      SENDER_GROUP_PREVIEW_VIEWED:   process.env.SENDER_GROUP_PREVIEW_VIEWED ?? "(not set)",
      SENDER_GROUP_UNLOCK_CLICKED:   process.env.SENDER_GROUP_UNLOCK_CLICKED ?? "(not set)",
      SENDER_GROUP_CONSULT_INTEREST: process.env.SENDER_GROUP_CONSULT_INTEREST ?? "(not set)",
    };

    return NextResponse.json({ groups: data, configured_env_vars: configured });
  } catch (err) {
    return NextResponse.json({ error: "Network error.", detail: String(err) }, { status: 500 });
  }
}
