"use client";

import { HeroSection } from "@/components/hero/hero-section";
import { PropertiesSection } from "@/features/properties/components/properties-section";
import { ServicesSection } from "@/features/properties/components/services-section";
import { useProperties } from "@/features/properties/hooks/useProperties";
import { useMemo } from "react";
import { PropertyListProvider } from "@/features/properties/components/property-list-context";

function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full py-16 bg-gradient-to-t from-blue-50 to-white"
    >
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-blue-950 mb-4">Contact Us</h2>
        <p className="text-lg text-gray-700 mb-8">
          Have questions or want to get in touch? Fill out the form below or
          reach us at <span className="font-semibold">info@dusser.sa</span>.
        </p>
        <form className="flex flex-col gap-4 items-center">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full max-w-md px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full max-w-md px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full max-w-md px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-950 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default function HomePage() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useProperties();

  const allProperties = useMemo(() => {
    return data?.pages.flatMap((page) => page.content) ?? [];
  }, [data]);

  const currentPage = data?.pages.length ? data.pages.length - 1 : 0;

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const mockPropertiesResponse = data?.pages[0]
    ? {
        ...data.pages[0],
        content: allProperties,
      }
    : undefined;

  return (
    <PropertyListProvider properties={allProperties}>
      <HeroSection />
      <ServicesSection />
      <PropertiesSection
        data={mockPropertiesResponse}
        isLoading={isFetching}
        error={error}
        currentPage={currentPage}
        onLoadMore={handleLoadMore}
        showViewMore={true}
      />
      <ContactSection />
    </PropertyListProvider>
  );
}
