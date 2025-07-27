"use client";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useLanguage } from "@/hooks/useLanguage";
import type { PropertiesResponse } from "@/types/property";

interface LoadMoreButtonProps {
  data?: PropertiesResponse;
  currentPage: number;
  isLoading: boolean;
  onLoadMore: () => void;
}

export function LoadMoreButton({
  data,
  currentPage,
  isLoading,
  onLoadMore,
}: LoadMoreButtonProps) {
  const { t } = useLanguage();

  if (!data || currentPage >= data.totalPages - 1) {
    return null;
  }

  return (
    <div className="text-center mt-12">
      <Button
        onClick={onLoadMore}
        disabled={isLoading}
        size="lg"
        className="bg-blue-600 hover:bg-blue-700"
      >
        {isLoading && <LoadingSpinner size="sm" className="mr-2" />}
        {t("common.loadMore")}
      </Button>
    </div>
  );
}
