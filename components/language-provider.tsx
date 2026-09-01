"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Lang = "en" | "hi"

const dict = {
  en: {
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.how": "How It Works",
    "nav.about": "About",
    "cta.login": "Login",
    "cta.signup": "Sign Up",
    "cta.findScheme": "Find My Scheme",
    "assistant.title": "SchemeSaathi Assistant",
    "assistant.subtitle": "Ask about schemes, eligibility or EMI",
    "assistant.placeholder": "Type your question...",
    "assistant.greeting":
      "Namaste! I can help you find schemes, check eligibility and estimate EMIs. What do you need help with today?",
  },
  hi: {
    "nav.home": "होम",
    "nav.features": "विशेषताएं",
    "nav.how": "यह कैसे काम करता है",
    "nav.about": "हमारे बारे में",
    "cta.login": "लॉग इन",
    "cta.signup": "साइन अप",
    "cta.findScheme": "मेरी योजना खोजें",
    "assistant.title": "स्कीमसाथी सहायक",
    "assistant.subtitle": "योजना, पात्रता या ईएमआई के बारे में पूछें",
    "assistant.placeholder": "अपना प्रश्न लिखें...",
    "assistant.greeting":
      "नमस्ते! मैं योजनाएं ढूंढने, पात्रता जांचने और ईएमआई का अनुमान लगाने में मदद कर सकता हूं। आज आपको किसमें सहायता चाहिए?",
  },
} as const

type Key = keyof (typeof dict)["en"]

type Ctx = {
  lang: Lang
  toggle: () => void
  t: (key: Key) => string
}

const LanguageContext = createContext<Ctx | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")
  const toggle = () => setLang((l) => (l === "en" ? "hi" : "en"))
  const t = (key: Key) => dict[lang][key] ?? key
  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
