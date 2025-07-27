"use client";

import { useLanguage } from "@/hooks/useLanguage";

import Link from "next/link";

export function HeroContent() {
  const { t } = useLanguage();

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
      <div className="text-center w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          {t("hero.title")}{" "}
          <span className="text-blue-300">{t("hero.subtitle")}</span>
        </h1>

        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
          {t("hero.description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#properties"
            className="px-5 py-2 rounded-lg text-lg font-semibold flex justify-center items-center bg-blue-950 text-white shadow hover:bg-blue-900 transition-colors"
          >
            {t("navigation.properties")}
          </Link>
          <Link
            href="/#contact"
            className="px-5 py-2 rounded-lg text-lg font-semibold flex justify-center items-center text-white border-1 border-white hover:bg-white hover:text-blue-900 transition-colors bg-transparent"
          >
            {t("navigation.contact")}
          </Link>
        </div>
      </div>
    </div>
  );
}
