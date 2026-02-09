"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import { fadeSmokeWind } from "@/app/components/utils/animations";

type Role = "assistant" | "user";
type Stage = "choose_spread" | "ask_question" | "reading" | "follow_up";

type Message = {
  id: string;
  role: Role;
  content: string;
  chips?: { label: string; value: string }[];
};

type TarotCard = {
  name: string;
  keywords: string[];
  upright: string;
  reversed: string;
};

const MAJOR_ARCANA: TarotCard[] = [
  { name: "Le Mat", keywords: ["départ", "liberté", "imprévu"], upright: "Nouvelle aventure, spontanéité, confiance en la route.", reversed: "Impulsivité, dispersion, manque de direction." },
  { name: "Le Bateleur", keywords: ["initiative", "potentiel", "action"], upright: "Tu as les outils. Lance-toi, expérimente, commence petit.", reversed: "Doute, procrastination, énergie mal canalisée." },
  { name: "La Papesse", keywords: ["intuition", "silence", "savoir intérieur"], upright: "Écoute ta voix intérieure. Observe avant d’agir.", reversed: "Secrets lourds, confusion, intuition ignorée." },
  { name: "L’Impératrice", keywords: ["créativité", "abondance", "expression"], upright: "Expansion, communication, création fertile.", reversed: "Surmenage, besoin de structure, créativité bloquée." },
  { name: "L’Empereur", keywords: ["structure", "leadership", "stabilité"], upright: "Cadre, stratégie, décisions claires.", reversed: "Rigidité, contrôle excessif, peur de lâcher prise." },
  { name: "Le Pape", keywords: ["conseil", "tradition", "valeurs"], upright: "Cherche un mentor, aligne-toi à tes valeurs.", reversed: "Dogme, dépendance aux avis, hypocrisie." },
  { name: "L’Amoureux", keywords: ["choix", "union", "alignement"], upright: "Choix du cœur. Cohérence entre désir et actions.", reversed: "Indécision, tentation, désalignement." },
  { name: "Le Chariot", keywords: ["volonté", "avance", "victoire"], upright: "Momentum. Tu peux gagner si tu tiens le cap.", reversed: "Précipitation, ego, perte de contrôle." },
  { name: "La Justice", keywords: ["équilibre", "vérité", "responsabilité"], upright: "Décision juste. Fais le point, tranche avec lucidité.", reversed: "Injustice, biais, évitement des conséquences." },
  { name: "L’Hermite", keywords: ["retrait", "sagesse", "clarification"], upright: "Prends du recul. La réponse vient dans le calme.", reversed: "Isolement, rumination, peur du monde." },
  { name: "La Roue de Fortune", keywords: ["cycles", "changement", "opportunité"], upright: "Un tournant arrive. Sois prêt à t’adapter.", reversed: "Résistance au changement, répétition de schémas." },
  { name: "La Force", keywords: ["courage", "maîtrise", "douceur"], upright: "Puissance tranquille. Patience + constance.", reversed: "Impulsivité, colère, perte d’énergie." },
  { name: "Le Pendu", keywords: ["pause", "nouveau regard", "lâcher-prise"], upright: "Change de perspective. Attends le bon moment.", reversed: "Blocage, sacrifice inutile, entêtement." },
  { name: "L’Arcane Sans Nom", keywords: ["transformation", "fin", "renouveau"], upright: "Fin nécessaire. Nettoyage et renaissance.", reversed: "Peur de finir, attachement, stagnation." },
  { name: "Tempérance", keywords: ["harmonie", "patience", "alchimie"], upright: "Équilibre. Mélange subtil, progrès stable.", reversed: "Excès, impatience, manque de mesure." },
  { name: "Le Diable", keywords: ["attachements", "désirs", "matérialité"], upright: "Désir puissant. Attention aux chaînes invisibles.", reversed: "Libération, reprise de contrôle, lucidité." },
  { name: "La Maison Dieu", keywords: ["révélation", "rupture", "vérité"], upright: "Choc libérateur. Ce qui est faux tombe.", reversed: "Changement retardé, peur de reconstruire." },
  { name: "L’Étoile", keywords: ["espoir", "guérison", "inspiration"], upright: "Foi. Les choses se réparent, avance doucement.", reversed: "Doute, perte de repères, pessimisme." },
  { name: "La Lune", keywords: ["intuition", "illusions", "émotions"], upright: "Écoute tes rêves. Ne décide pas dans le brouillard.", reversed: "Clarté qui revient, illusions dissipées." },
  { name: "Le Soleil", keywords: ["joie", "succès", "vitalité"], upright: "Clarté, bonheur, réussite partagée.", reversed: "Ego, fatigue, succès retardé." },
  { name: "Le Jugement", keywords: ["appel", "réveil", "pardon"], upright: "Réponse à l’appel. Clôture et nouveau chapitre.", reversed: "Auto-jugement, peur d’avancer, regrets." },
  { name: "Le Monde", keywords: ["accomplissement", "intégration", "fin heureuse"], upright: "Aboutissement. Tu boucles un cycle avec grâce.", reversed: "Inachèvement, dispersion, manque de clôture." },
];

const SPREADS = [
  { key: "one", label: "🃏 1 carte (clair & rapide)", draw: 1 },
  { key: "three", label: "🔮 3 cartes (passé / présent / futur)", draw: 3 },
  { key: "moon", label: "🌙 Guidance lunaire (émotions & intuition)", draw: 2 },
] as const;

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function pickUniqueCards(deck: TarotCard[], n: number) {
  const copy = [...deck];
  const picked: { card: TarotCard; reversed: boolean }[] = [];
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    const card = copy.splice(idx, 1)[0];
    const reversed = Math.random() < 0.35;
    picked.push({ card, reversed });
  }
  return picked;
}

export default function OracleLandingPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);

  const [stage, setStage] = useState<Stage>("choose_spread");
  const [spreadKey, setSpreadKey] = useState<(typeof SPREADS)[number]["key"]>("one");
  const [question, setQuestion] = useState("");
  const [input, setInput] = useState("");

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  const initialMessages: Message[] = useMemo(
    () => [
      {
        id: uid(),
        role: "assistant",
        content:
          "Bienvenue… ✨ Je suis **la Sorcière de L’Oracle**.\n\nChoisis ton tirage, puis pose ta question — je te guiderai pas à pas.",
        chips: SPREADS.map((s) => ({ label: s.label, value: s.key })),
      },
      {
        id: uid(),
        role: "assistant",
        content:
          "🧿 *Note:* ceci est une guidance symbolique (tarot) — à utiliser comme un miroir intérieur, pas comme une vérité absolue.",
      },
    ],
    []
  );

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // Auto-scroll sur chaque nouveau message
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const messagesRef = useRef<Message[]>(initialMessages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  function pushMessage(msg: Omit<Message, "id">) {
    setMessages((prev) => [...prev, { id: uid(), ...msg }]);
  }

  function resetToStart() {
    setStage("choose_spread");
    setSpreadKey("one");
    setQuestion("");
    setInput("");
    setMessages(initialMessages);
  }

  function handleChooseSpread(key: string) {
    const exists = SPREADS.find((s) => s.key === key);
    if (!exists) return;

    setSpreadKey(exists.key);
    setStage("ask_question");

    pushMessage({ role: "user", content: exists.label });

    pushMessage({
      role: "assistant",
      content:
        "Très bien. Maintenant, écris ta question.\n\n💡 Astuce: une question claire = une réponse plus utile (ex: “Que dois-je comprendre sur… ?”).",
      chips: [
        { label: "💜 Amour", value: "Que dois-je comprendre sur ma vie amoureuse en ce moment ?" },
        { label: "💼 Travail", value: "Quelle énergie entoure mon travail et ma prochaine étape ?" },
        { label: "💰 Argent", value: "Quel conseil pour mes finances et mes priorités ?" },
        { label: "🧘 Intérieur", value: "Quel message pour mon alignement intérieur aujourd’hui ?" },
      ],
    });
  }

  async function runReading(q: string) {
    setStage("reading");

    pushMessage({ role: "user", content: q });
    pushMessage({ role: "assistant", content: "🌀 Je mélange les cartes… respire doucement. (3 secondes)" });

    try {
      await new Promise((r) => setTimeout(r, 900));

      const spread = SPREADS.find((s) => s.key === spreadKey)!;
      const drawn = pickUniqueCards(MAJOR_ARCANA, spread.draw);

      const drawnPayload = drawn.map((d) => ({
        name: d.card.name,
        keywords: d.card.keywords,
        reversed: d.reversed,
        meaning: d.reversed ? d.card.reversed : d.card.upright,
      }));

      const historyForAPI = messagesRef.current.slice(-12).map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/tarot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spreadKey, question: q, drawn: drawnPayload, history: historyForAPI }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`AI tarot failed (${res.status}): ${errText}`);
      }

      const ai = await res.json();

      const reading =
        `🕯️ **${ai.title}**\n\n` +
        `${ai.reading}\n\n` +
        `**✨ Conseils**\n- ${ai.advice.join("\n- ")}\n\n` +
        `**🔎 Pour aller plus loin**\n- ${ai.followUps.join("\n- ")}\n\n` +
        `🧿 _${ai.safetyNote}_`;

      pushMessage({
        role: "assistant",
        content: reading,
        chips: [
          { label: "🔁 Refaire un tirage", value: "__redo__" },
          { label: "🧭 Clarifier ma question", value: "__clarify__" },
          { label: "⬇️ Installer la PWA", value: "__install__" },
        ],
      });

      setStage("follow_up");
    } catch (e) {
      console.error(e);

      pushMessage({
        role: "assistant",
        content:
          "Je sens un voile dans l’air… ✨ (Erreur technique)\n\nRéessaie dans un instant, ou relance un tirage.",
        chips: [
          { label: "🔁 Refaire un tirage", value: "__redo__" },
          { label: "⬇️ Installer la PWA", value: "__install__" },
        ],
      });

      setStage("follow_up");
    }
  }

  async function handleSend(value?: string) {
    const v = (value ?? input).trim();
    if (!v) return;

    if (stage === "reading") return;

    // Chip actions
    if (v === "__redo__") {
      pushMessage({ role: "user", content: "🔁 Refaire un tirage" });
      if (question) await runReading(question);
      return;
    }
    if (v === "__clarify__") {
      pushMessage({ role: "user", content: "🧭 Clarifier ma question" });
      setStage("ask_question");
      pushMessage({
        role: "assistant",
        content:
          "D’accord. Reformule ta question en 1 phrase.\n\nExemples:\n- “Quelle est la prochaine étape la plus sage ?”\n- “Que dois-je lâcher pour avancer ?”\n- “Quel est le vrai enjeu derrière ce blocage ?”",
      });
      return;
    }
    if (v === "__install__") {
      pushMessage({ role: "user", content: "⬇️ Installer la PWA" });
      pushMessage({
        role: "assistant",
        content: "Parfait. Tu peux l’installer ici 👇\n\n(Et revenir ensuite pour continuer le chat.)",
      });
      return;
    }

    setInput("");

    if (stage === "choose_spread") {
      const maybe = SPREADS.find((s) => s.label.toLowerCase().includes(v.toLowerCase()));
      if (maybe) return handleChooseSpread(maybe.key);

      pushMessage({ role: "user", content: v });
      pushMessage({
        role: "assistant",
        content: "Choisis plutôt un tirage via les boutons ci-dessous 🙂",
        chips: SPREADS.map((s) => ({ label: s.label, value: s.key })),
      });
      return;
    }

    if (stage === "ask_question") {
      setQuestion(v);
      await runReading(v);
      return;
    }

    setQuestion(v);
    await runReading(v);
  }

  if (!mounted) return null;

  // Fondo inmersivo full-screen
  const bgColor = isDark ? "bg-transparent" : "bg-[#F3EFEA] text-gray-900";
  const glass = isDark ? "bg-black/35 border-white/10" : "bg-white/55 border-black/10";
  const subtleText = isDark ? "text-gray-300" : "text-gray-700";

  return (
    <main className={`relative min-h-[100svh] ${bgColor}`}>
      {/* Decorative layers (full screen) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={
            isDark
              ? "absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:26px_26px]"
              : "absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#5C4B6C_1px,transparent_0)] [background-size:28px_28px]"
          }
        />
      </div>

      {/* Fog overlay while reading (immersive smoke) */}
      <AnimatePresence>
        {stage === "reading" && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              className={`absolute inset-0 ${isDark ? "bg-white/5" : "bg-[#5C4B6C]/10"} blur-3xl`}
              animate={{
                x: [0, 34, -26, 0],
                y: [0, -18, 22, 0],
                opacity: [0.22, 0.32, 0.22],
              }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen layout */}
      <div className="relative min-h-[100svh] flex flex-col">
        {/* Header sticky (top) — smoke on mount */}
        <motion.header
          className={`sticky top-16 z-20 border-b ${glass} backdrop-blur-xl`}
          variants={fadeSmokeWind("right")}
          initial="hidden"
          animate="visible"
          custom={0.08}
        >
          <div className="mx-auto w-full max-w-5xl px-4 py-4 flex items-start md:items-center justify-between gap-3">
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold font-titles">
                L’Oracle <span className="text-purple-500">— Chat</span>
              </h1>
              <p className={`${subtleText} text-xs md:text-sm`}>
                Guidance symbolique • Tirages rapides • Style “Sorcière”
              </p>

              <div className="mt-2 text-[11px] md:text-xs">
                <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {stage === "choose_spread"
                    ? "Étape: choisir un tirage"
                    : stage === "ask_question"
                    ? "Étape: poser ta question"
                    : stage === "reading"
                    ? "Lecture en cours…"
                    : "Tu peux poser une nouvelle question"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/pwa-download"
                className="px-3 py-2 rounded-xl text-sm font-semibold bg-purple-600 hover:bg-purple-700 text-white transition shadow"
              >
                Installer
              </Link>
              <button
                onClick={resetToStart}
                className={`px-3 py-2 rounded-xl text-sm font-semibold border transition ${
                  isDark ? "border-white/15 hover:bg-white/5" : "border-black/10 hover:bg-black/5"
                }`}
                title="Recommencer"
              >
                ↺
              </button>
            </div>
          </div>
        </motion.header>

        {/* Messages area */}
        <section ref={scrollRef} className="flex-1 overflow-y-auto relative z-0">
          <div className="mx-auto w-full max-w-5xl px-4 py-6 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => {
                const delayIndex = Math.min(i, 10); // evita delays gigantes si hay muchos mensajes
                return (
                  <motion.div
                    key={m.id}
                    variants={fadeSmokeWind(m.role === "user" ? "right" : "left")}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                    custom={0.05 + delayIndex * 0.03}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[92%] md:max-w-[70%] rounded-2xl px-4 py-3 text-sm md:text-base whitespace-pre-line leading-relaxed shadow ${
                        m.role === "user"
                          ? "bg-purple-600 text-white"
                          : isDark
                          ? "bg-black/70 text-gray-100 border border-white/10"
                          : "bg-white text-gray-900 border border-black/10"
                      }`}
                    >
                      {m.content}

                      {m.chips && m.chips.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {m.chips.map((c) => (
                            <button
                              key={c.value + c.label}
                              onClick={() => {
                                if (stage === "choose_spread") handleChooseSpread(c.value);
                                else handleSend(c.value);
                              }}
                              className={`text-xs md:text-sm px-3 py-2 rounded-full border transition ${
                                isDark ? "border-white/15 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
                              }`}
                            >
                              {c.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* Input sticky bottom — smoke on mount */}
        <motion.footer
          className="sticky bottom-0 z-20"
          variants={fadeSmokeWind("left")}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          <div
            className="
              mx-auto w-full max-w-5xl px-4 pt-3
              pb-[calc(env(safe-area-inset-bottom)+0.75rem)]
            "
          >
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder={stage === "choose_spread" ? "Choisis un tirage ci-dessus…" : "Écris ta question…"}
                className={`w-full rounded-2xl px-4 py-3 outline-none border transition ${
                  isDark
                    ? "bg-[#111828] border-white/10 focus:border-purple-500/60"
                    : "bg-white border-black/10 focus:border-purple-500/60"
                } ${stage === "reading" ? "opacity-60" : ""}`}
                disabled={stage === "reading"}
              />
              <button
                onClick={() => handleSend()}
                disabled={stage === "reading"}
                className={`px-4 md:px-5 rounded-2xl font-semibold bg-purple-600 hover:bg-purple-700 text-white transition shadow ${
                  stage === "reading" ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {stage === "reading" ? "..." : "Envoyer"}
              </button>
            </div>
          </div>
        </motion.footer>
      </div>
    </main>
  );
}
