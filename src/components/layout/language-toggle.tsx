"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { useEffect } from "react";

export function LanguageToggle() {
  const { currentLanguage, changeLanguage } = useLanguage();

  useEffect(() => {
    // Set initial direction and language
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "ar" ? "en" : "ar";
    changeLanguage(newLanguage);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="min-w-[60px] bg-transparent text-gray-800"
    >
      {currentLanguage === "ar" ? "EN" : "العربية"}
    </Button>
  );
}
