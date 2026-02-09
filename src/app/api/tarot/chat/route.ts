import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

export const runtime = "nodejs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const BodySchema = z.object({
  spreadKey: z.enum(["one", "three", "moon"]),
  question: z.string().min(1).max(600),
  drawn: z
    .array(
      z.object({
        name: z.string(),
        keywords: z.array(z.string()),
        reversed: z.boolean(),
        meaning: z.string(),
      })
    )
    .min(1)
    .max(3),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() }))
    .max(30)
    .default([]),
});

const TarotResponse = z.object({
  title: z.string(),
  summary: z.string(),
  reading: z.string(),
  advice: z.array(z.string()).min(2).max(6),
  followUps: z.array(z.string()).min(2).max(6),
  safetyNote: z.string(),
});

function spreadLabel(key: "one" | "three" | "moon") {
  if (key === "one") return "1 carte (clair & rapide)";
  if (key === "three") return "3 cartes (passé / présent / futur)";
  return "Guidance lunaire (émotions & intuition)";
}

export async function POST(req: Request) {
  try {
    const body = BodySchema.parse(await req.json());

    const system = `
Tu es "La Sorcière de L’Oracle", une assistante de tarot en français.
Objectif: guidance symbolique, empathique, actionable, sans prédictions absolues.

Règles:
- Pas de médical/financier/légal prescriptif. Si risque, recommande un pro.
- Évite le déterminisme ("cela arrivera"). Préfère ("cela suggère", "cela indique").
- Intègre explicitement les cartes + orientation (droite/renversée).
- Donne des conseils concrets et courts (actions, journaling, réflexion).
- Réponds strictement selon le format structuré demandé.
`.trim();

    const user = `
Tirage: ${spreadLabel(body.spreadKey)}
Question: ${body.question}

Cartes tirées (ne change pas ces cartes):
${body.drawn
  .map(
    (c, idx) =>
      `- (${idx + 1}) ${c.name}${c.reversed ? " (renversée)" : ""} | mots-clés: ${c.keywords.join(
        ", "
      )} | sens court: ${c.meaning}`
  )
  .join("\n")}

Historique récent:
${body.history.map((m) => `- ${m.role}: ${m.content}`).join("\n")}
`.trim();

    // ⚠️ Usa un modelo compatible con Structured Outputs
    // (gpt-4o-mini / gpt-4o-2024-08-06 y posteriores). :contentReference[oaicite:1]{index=1}
    const completion = await openai.chat.completions.parse({
      model: "gpt-4o-mini",
      temperature: 0.8,
      max_tokens: 900,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: zodResponseFormat(TarotResponse, "tarot_response"),
    });

    const msg = completion.choices[0]?.message;

    // Manejo de refusals (pueden romper el schema si no lo controlas). :contentReference[oaicite:2]{index=2}
    if (msg?.refusal) {
      return NextResponse.json(
        { error: "refusal", refusal: msg.refusal },
        { status: 403 }
      );
    }

    return NextResponse.json(msg?.parsed);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Invalid request or model output", details: String(err?.message ?? err) },
      { status: 400 }
    );
  }
}
