"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Language } from "@/types/common"
import { translations } from "@/constants/translations"

interface LanguageState {
  currentLanguage: Language
  isRTL: boolean
  changeLanguage: (lang: Language) => void
  t: (key: string) => string
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: "ar",
      isRTL: true,
      changeLanguage: (lang: Language) => {
        set({
          currentLanguage: lang,
          isRTL: lang === "ar",
        })

        // Update document attributes
        if (typeof document !== "undefined") {
          document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
          document.documentElement.lang = lang
        }
      },
      t: (key: string) => {
        const { currentLanguage } = get()
        const keys = key.split(".")
        let value: any = translations[currentLanguage]

        for (const k of keys) {
          value = value?.[k]
        }

        return value || key
      },
    }),
    {
      name: "language-storage",
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== "undefined") {
          document.documentElement.dir = state.isRTL ? "rtl" : "ltr"
          document.documentElement.lang = state.currentLanguage
        }
      },
    },
  ),
)
