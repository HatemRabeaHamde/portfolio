"use server";

export type ContactState =
  | { status: "idle" }
  | { status: "error"; message: string; fields?: Partial<Record<"name" | "email" | "message", string>> }
  | { status: "sent"; name: string; projectType: string; timeline: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates the contact form and forwards it.
 * Set CONTACT_WEBHOOK_URL (e.g. a Formspree / Slack / Zapier / Resend relay endpoint)
 * to receive submissions as JSON. Without it, submissions are only logged on the server.
 */
export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim().slice(0, 120);
  const email = String(formData.get("email") ?? "").trim().slice(0, 200);
  const projectType = String(formData.get("projectType") ?? "").trim().slice(0, 60);
  const timeline = String(formData.get("timeline") ?? "").trim().slice(0, 60);
  const message = String(formData.get("message") ?? "").trim().slice(0, 5000);
  // Honeypot — bots fill every field.
  if (String(formData.get("company") ?? "")) return { status: "sent", name, projectType, timeline };

  const fields: Partial<Record<"name" | "email" | "message", string>> = {};
  if (!name) fields.name = "Tell me your name.";
  if (!EMAIL_RE.test(email)) fields.email = "Enter a valid email.";
  if (message.length < 10) fields.message = "A sentence or two helps me reply properly.";
  if (Object.keys(fields).length) {
    return { status: "error", message: "Please check the highlighted fields.", fields };
  }

  const payload = { name, email, projectType, timeline, message, sentAt: new Date().toISOString() };
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  try {
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else {
      console.info("[contact] CONTACT_WEBHOOK_URL not set — submission:", payload);
    }
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return { status: "error", message: "Something went wrong sending that. Please email me directly." };
  }

  return { status: "sent", name, projectType, timeline };
}
