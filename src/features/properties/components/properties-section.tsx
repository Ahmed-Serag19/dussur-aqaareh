"use client";

import { PropertiesGrid } from "./properties-grid";
import { PropertiesLoading } from "./properties-loading";
import { LoadMoreButton } from "./load-more-button";
import { ErrorMessage } from "@/components/ui/error-message";
import { EmptyState } from "@/components/ui/empty-state";
import { useLanguage } from "@/hooks/useLanguage";
import type { PropertiesResponse } from "@/types/property";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PropertiesSectionProps {
  data?: PropertiesResponse;
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  onLoadMore: () => void;
  showViewMore?: boolean;
}

export function PropertiesSection({
  data,
  isLoading,
  error,
  currentPage,
  onLoadMore,
  showViewMore = false,
}: PropertiesSectionProps) {
  const { t } = useLanguage();

  if (isLoading && currentPage === 0) {
    return (
      <section id="properties" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-950 mb-4">
              {t("property.availableProperties")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("property.availablePropertiesDescription") ||
                "اكتشف مجموعة واسعة من العقارات المتاحة للإيجار في أفضل المواقع"}
            </p>
          </div>
          <PropertiesLoading />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="properties" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-950 mb-4">
              {t("property.availableProperties")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("property.availablePropertiesDescription") ||
                "اكتشف مجموعة واسعة من العقارات المتاحة للإيجار في أفضل المواقع"}
            </p>
          </div>
          <ErrorMessage message={t("property.errorLoading")} />
        </div>
      </section>
    );
  }

  if (!data || data.content.length === 0) {
    return (
      <section id="properties" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-950 mb-4">
              {t("property.availableProperties")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("property.availablePropertiesDescription") ||
                "اكتشف مجموعة واسعة من العقارات المتاحة للإيجار في أفضل المواقع"}
            </p>
          </div>
          <EmptyState message={t("property.noProperties")} />
        </div>
      </section>
    );
  }

  return (
    <section id="properties" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-950 mb-4">
            {t("property.availableProperties")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("property.availablePropertiesDescription") ||
              "اكتشف مجموعة واسعة من العقارات المتاحة للإيجار في أفضل المواقع"}
          </p>
        </div>
        <PropertiesGrid properties={data.content} />

        {showViewMore && (
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-blue-950 hover:bg-blue-900 text-white px-8 py-3 text-lg"
            >
              <Link href="/properties" className="flex items-center gap-2">
                {t("property.viewMore")}
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Link>
            </Button>
          </div>
        )}

        {!showViewMore && (
          <LoadMoreButton
            data={data}
            currentPage={currentPage}
            isLoading={isLoading}
            onLoadMore={onLoadMore}
          />
        )}
      </div>
    </section>
  );
}
