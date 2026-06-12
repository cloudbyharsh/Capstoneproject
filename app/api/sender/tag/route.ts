import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/sender/tag
 *
 * Two-step approach:
 *   1. Upsert the subscriber via POST /v2/subscribers
 *   2. Add them to each group via POST /v2/subscribers/groups/{groupId}
 *      (works for both new AND existing subscribers)
 *
 * Body: { email: string; name?: string; groups: GroupKey[] }
 *
 * GroupKey values (Vercel env vars → Sender group ID, e.g. "eZVD4w"):
 *   "kundli_lead"       → SENDER_GROUP_KUNDLI_LEAD
 *   "report_sent"       → SENDER_GROUP_REPORT_SENT
 *   "preview_viewed"    → SENDER_GROUP_PREVIEW_VIEWED
 *   "unlock_clicked"    → SENDER_GROUP_UNLOCK_CLICKED
 *   "consult_interest"  → SENDER_GROUP_CONSULT_INTEREST
 *
 * NOTE: Group IDs must be the Sender API id (e.g. "eZVD4w"), NOT the filter
 * URL slug (e.g. "g-MCSCVU"). Check Sender dashboard → Groups → copy the ID
 * shown in the URL when you open a group, or use GET /v2/groups to list them.
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

  // Resolve group keys → Sender group IDs from env vars; silently skip unconfigured ones
  const groupIds: string[] = groups
    .map((key) => process.env[GROUP_ENV_MAP[key]] ?? "")
    .filter(Boolean);

  if (groupIds.length === 0) {
    console.warn("[sender/tag] No group IDs configured for keys:", groups);
    console.warn("[sender/tag] Env vars present:", Object.keys(process.env).filter(k => k.startsWith("SENDER_GROUP")));
    return NextResponse.json({ success: true, note: "no_groups_configured", keys: groups });
  }

  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  const firstname = name?.split(" ")[0] || "";
  const lastname = name?.split(" ").slice(1).join(" ") || "";

  try {
    // Step 1: Upsert subscriber (create if new, update if existing)
    const upsertRes = await fetch(`${SENDER_BASE}/subscribers`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, firstname, lastname }),
    });
    const upsertBody = await upsertRes.json().catch(() => ({}));

    if (!upsertRes.ok) {
      console.error("[sender/tag] Upsert failed:", upsertRes.status, JSON.stri