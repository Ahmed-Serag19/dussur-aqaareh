"use client";

import { HeroSection } from "@/components/hero/hero-section";
import { PropertiesSection } from "@/features/properties/components/properties-section";
import { ServicesSection } from "@/features/properties/components/services-section";
import { useProperties } from "@/features/properties/hooks/useProperties";
import { useMemo, useState, useRef } from "react";
import { PropertyListProvider } from "@/features/properties/components/property-list-context";
import { useEffect } from "react";

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
      {/* Contact Us Section (Arabic, Formsubmit.io) */}
      <section
        id="contact"
        className="w-full py-16 bg-gradient-to-t from-blue-50 to-white"
      >
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-950 mb-4">تواصل معنا</h2>
          <p className="text-lg text-gray-700 mb-8">
            إذا كان لديك أي استفسار أو ترغب في التواصل معنا، يرجى تعبئة النموذج
            أدناه.
          </p>
          {/* Contact Form with loading, error, and success handling */}
          <ContactForm />
        </div>
      </section>
    </PropertyListProvider>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Toast for success
  useEffect(() => {
    if (success) {
      timerRef.current = setTimeout(() => setSuccess(false), 4000);
    }
  }, [success]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "c61cffcb-6787-43d8-ad72-abf66a74de1e",
          to: "eng.abdulwahab7@gmail.com",
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(data.message || "حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.");
      }
    } catch {
      setError("حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* Success Toast */}
      {success && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold text-lg animate-fade-in">
          تم إرسال رسالتك بنجاح!
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center w-full"
      >
        <input
          type="text"
          name="name"
          placeholder="الاسم"
          required
          className="w-full max-w-md px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none text-right"
          value={form.name}
          onChange={handleChange}
          disabled={loading}
        />
        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          required
          className="w-full max-w-md px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none text-right"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
        />
        <textarea
          name="message"
          placeholder="رسالتك"
          rows={4}
          required
          className="w-full max-w-md px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none text-right"
          value={form.message}
          onChange={handleChange}
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-950 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-900 transition-colors flex items-center justify-center min-w-[120px]"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              جاري الإرسال...
            </span>
          ) : (
            "إرسال"
          )}
        </button>
        {success && (
          <div className="text-green-600 font-semibold mt-2 animate-fade-in">
            تم إرسال رسالتك بنجاح!
          </div>
        )}
        {error && (
          <div className="text-red-500 font-semibold mt-2 animate-fade-in">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
