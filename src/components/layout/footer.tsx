"use client";

import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/hooks/useLanguage";
import Link from "next/link";

export function Footer() {
  const { t } = useLanguage();

  const footerSections = [
    {
      title: "Dussur",
      items: [{ text: t("footer.description"), isDescription: true }],
    },
    {
      title: t("footer.quickLinks"),
      items: [
        { text: t("navigation.home"), href: "/" },
        { text: t("navigation.properties"), href: "/properties" },
        { text: t("navigation.about"), href: "/about" },
      ],
    },
    {
      title: t("footer.services"),
      items: [{ text: t("footer.services"), href: "/#services" }],
    },
    {
      title: t("footer.contactUs"),
      items: [
        { text: t("footer.location") },
        { text: t("footer.phone") },
        { text: t("footer.email") },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {"href" in item ? (
                      <Link
                        href={item.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item.text}
                      </Link>
                    ) : (
                      <span className="text-gray-400">{item.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="my-8 bg-gray-700" />
        <div className="text-center text-gray-400">
          <p>&copy; 2024 Dussur. {t("footer.copyright")}.</p>
        </div>
      </div>
    </footer>
  );
}
