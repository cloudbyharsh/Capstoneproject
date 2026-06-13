import { NextRequest, NextResponse } from "next/server";

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

const SENDER_BASE = "https://api.sender.net/v2";

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

  const groupIds: string[] = groups
    .map((key) => process.env[GROUP_ENV_MAP[key]] ?? "")
    .filter(Boolean);

  if (groupIds.length === 0) {
    console.warn("[sender/tag] No group IDs configured for keys:", groups);
    console.warn("[sender/tag] Env vars present:", Object.keys(process.env).filter((k) => k.startsWith("SENDER_GROUP")));
    return NextResponse.json({ success: true, note: "no_groups_configured", keys: groups });
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const firstname = name?.split(" ")[0] || "";
  const lastname = name?.split(" ").slice(1).join(" ") || "";

  try {
    const upsertRes = await fetch(`${SENDER_BASE}/subscribers`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, firstname, lastname }),
    });
    const upsertBody = await upsertRes.json().catch(() => ({}));

    if (!upsertRes.ok) {
      console.error("[sender/tag] Upsert failed:", upsertRes.status, JSON.stringify(upsertBody));
      return NextResponse.json({ error: "Sender upsert failed.", detail: upsertBody }, { status: 500 });
    }

    const groupResults = await Promise.all(
      groupIds.map(async (groupId) => {
        const res = await fetch(`${SENDER_BASE}/subscribers/groups/${groupId}`, {
          method: "POST",
          headers,
          body: JSON.stringify({ subscribers: [email], trigger_automation: true }),
        });
        const resBody = await res.json().catch(() => ({}));
        if (!res.ok) {
          console.error(`[sender/tag] Add to group ${groupId} failed:`, res.status, JSON.stringify(resBody));
        } else {
          console.log(`[sender/tag] Added ${email} to group ${groupId}:`, JSON.stringify(resBody));
        }
        return { groupId, ok: res.ok, body: resBody };
      })
    );

    const anyFailed = groupResults.some((r) => !r.ok);
    return NextResponse.json({ success: !anyFailed, groups: groupResults });
  } catch (err) {
    console.error("[sender/tag] fetch error:", err);
    return NextResponse.json({ error: "Network error." }, { status: 500 });
  }
}
