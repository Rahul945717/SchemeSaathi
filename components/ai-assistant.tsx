"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, Send, Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"

type Msg = { role: "user" | "bot"; text: string }

// Very small rule-based "RAG-style" responder for the prototype.
function respond(input: string, lang: "en" | "hi"): string {
  const q = input.toLowerCase()
  const en = {
    emi: "For a ₹5,00,000 PMEGP loan at 11% over 84 months, your EMI is about ₹8,560/month. Open the EMI Calculator in your dashboard to try other amounts.",
    eligible:
      "Eligibility depends on your age, income, category and project cost. Based on the demo profile you qualify for PMEGP (94% match) and MUDRA (90% match).",
    partner:
      "The nearest processing partner for your scheme is State Bank Partner — MG Road, 2.4 km away, currently Available. I can route your application there.",
    business:
      "For business funding, the best matches are PMEGP, MUDRA and Stand-Up India. PMEGP offers up to 35% margin-money subsidy.",
    default:
      "I can help you discover schemes, check eligibility, estimate EMIs and find the right partner. Try asking about 'business loan', 'eligibility' or 'EMI'.",
  }
  const hi = {
    emi: "₹5,00,000 के PMEGP ऋण पर 11% ब्याज और 84 महीनों में आपकी ईएमआई लगभग ₹8,560/माह होगी। अन्य राशि आज़माने के लिए डैशबोर्ड में ईएमआई कैलकुलेटर खोलें।",
    eligible:
      "पात्रता आपकी आयु, आय, श्रेणी और परियोजना लागत पर निर्भर करती है। डेमो प्रोफ़ाइल के अनुसार आप PMEGP (94% मैच) और MUDRA (90% मैच) के लिए योग्य हैं।",
    partner:
      "आपकी योजना के लिए निकटतम भागीदार State Bank Partner — MG Road है, 2.4 किमी दूर, अभी उपलब्ध। मैं आपका आवेदन वहां भेज सकता हूं।",
    business:
      "व्यवसाय वित्तपोषण के लिए सबसे अच्छे मैच PMEGP, MUDRA और Stand-Up India हैं। PMEGP 35% तक मार्जिन-मनी सब्सिडी देता है।",
    default:
      "मैं योजनाएं खोजने, पात्रता जांचने, ईएमआई अनुमान लगाने और सही भागीदार खोजने में मदद कर सकता हूं। 'बिज़नेस लोन', 'पात्रता' या 'ईएमआई' के बारे में पूछें।",
  }
  const table = lang === "hi" ? hi : en
  if (q.includes("emi") || q.includes("ईएमआई") || q.includes("loan") || q.includes("ऋण")) return table.emi
  if (q.includes("eligib") || q.includes("पात्र") || q.includes("qualif")) return table.eligible
  if (q.includes("partner") || q.includes("भागीदार") || q.includes("bank") || q.includes("बैंक")) return table.partner
  if (q.includes("business") || q.includes("व्यवसाय") || q.includes("funding")) return table.business
  return table.default
}

export function AiAssistant() {
  const { lang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Msg[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "bot", text: t("assistant.greeting") }])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  const suggestions =
    lang === "hi"
      ? ["बिज़नेस लोन", "मेरी पात्रता", "ईएमआई कितनी है?"]
      : ["Business loan options", "Am I eligible?", "Calculate my EMI"]

  function send(text: string) {
    const value = text.trim()
    if (!value) return
    setMessages((m) => [...m, { role: "user", text: value }])
    setInput("")
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: respond(value, lang) }])
    }, 450)
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105"
        aria-label="Open AI assistant"
      >
        {open ? <X className="size-5" /> : <Sparkles className="size-5" />}
        <span className="hidden text-sm font-medium sm:inline">AI Assistant</span>
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-50 flex h-[520px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
            <span className="grid size-9 place-items-center rounded-full bg-white/15">
              <Bot className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{t("assistant.title")}</p>
              <p className="truncate text-xs text-primary-foreground/70">{t("assistant.subtitle")}</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                    m.role === "user"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm bg-muted text-foreground",
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("assistant.placeholder")}
              className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:border-primary"
            />
            <Button type="submit" size="icon" className="rounded-full">
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  )
}
