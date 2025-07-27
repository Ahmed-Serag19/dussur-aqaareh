import { Metadata } from "next";
import { PropertiesPageContent } from "@/features/properties/components/properties-page-content";

export const metadata: Metadata = {
  title: "العقارات المتاحة | دُسر العقارية",
  description:
    "تصفح مجموعة واسعة من العقارات المتاحة للإيجار في المملكة العربية السعودية. شقق، فلل، محلات تجارية، وأراضي بمواقع مميزة وأسعار تنافسية.",
  keywords:
    "عقارات للإيجار, شقق للإيجار, فلل للإيجار, محلات للإيجار, أراضي للإيجار, عقارات السعودية",
  openGraph: {
    title: "العقارات المتاحة | دُسر العقارية",
    description:
      "تصفح مجموعة واسعة من العقارات المتاحة للإيجار في المملكة العربية السعودية.",
    url: "https://aqaar.dussur.sa/properties",
  },
  alternates: {
    canonical: "https://aqaar.dussur.sa/properties",
  },
};

export default function PropertiesPage() {
  return <PropertiesPageContent />;
}
