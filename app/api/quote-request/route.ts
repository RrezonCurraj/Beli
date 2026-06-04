import { NextResponse } from "next/server";
import { z } from "zod";
import { sendQuoteEmail } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2).max(100),
  company: z.string().max(120).optional(),
  phone: z.string().min(6).max(30),
  email: z.string().email().max(120),
  message: z.string().min(5).max(2000),
  productName: z.string().max(200).optional(),
  productSku: z.string().max(50).optional(),
  productUrl: z.string().url().max(500).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Të dhënat e formularit janë të pavlefshme" },
      { status: 400 },
    );
  }

  try {
    await sendQuoteEmail(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Quote request failed", err);
    return NextResponse.json(
      { error: "Gabim i brendshëm. Provoni përsëri." },
      { status: 500 },
    );
  }
}
