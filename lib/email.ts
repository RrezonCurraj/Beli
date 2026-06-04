import { Resend } from "resend";

export type QuoteRequestPayload = {
  name: string;
  company?: string;
  phone: string;
  email: string;
  message: string;
  productName?: string;
  productSku?: string;
  productUrl?: string;
};

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(key);
}

export async function sendQuoteEmail(payload: QuoteRequestPayload) {
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const to = process.env.RESEND_TO_EMAIL;
  if (!to) {
    throw new Error("RESEND_TO_EMAIL is not set");
  }

  const subject = payload.productSku
    ? `Kërkesë oferte: ${payload.productName} (${payload.productSku})`
    : "Kërkesë oferte e re";

  const html = `
    <h2>Kërkesë oferte e re — Ntsh Beli</h2>
    <p><strong>Emri:</strong> ${escapeHtml(payload.name)}</p>
    ${payload.company ? `<p><strong>Kompania:</strong> ${escapeHtml(payload.company)}</p>` : ""}
    <p><strong>Telefoni:</strong> ${escapeHtml(payload.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    ${
      payload.productName
        ? `<p><strong>Produkti:</strong> ${escapeHtml(payload.productName)} (${escapeHtml(payload.productSku ?? "")})</p>`
        : ""
    }
    ${
      payload.productUrl
        ? `<p><strong>Linku:</strong> <a href="${escapeHtml(payload.productUrl)}">${escapeHtml(payload.productUrl)}</a></p>`
        : ""
    }
    <p><strong>Mesazhi:</strong></p>
    <p style="white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
  `;

  const resend = getResend();
  return resend.emails.send({
    from,
    to,
    subject,
    html,
    replyTo: payload.email,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
