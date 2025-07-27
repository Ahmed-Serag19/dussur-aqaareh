import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";

const serviceIcons = [
  "🏢", // Apartment
  "🏡", // Villa
  "🏬", // Shop
  "🌍", // Land
];
const transition = {
  duration: 1.5,
  // delay: 0.05,
  ease: [0, 0.71, 0.2, 1.01],
};
const cardVariants = {
  hiddenRight: { opacity: 0, x: 100 },
  hiddenLeft: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { transition },
  },
};

export function ServicesSection() {
  const { t } = useLanguage();
  const services = t("footer.servicesList");

  return (
    <section
      id="services"
      className="w-full py-20 bg-gradient-to-b from-blue-50 to-white overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-blue-950">
          {t("footer.services")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {Array.isArray(services) &&
            services.map((service, idx) => (
              <motion.div
                key={service.title}
                className="flex flex-col items-center bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition group"
                initial={idx < 2 ? "hiddenRight" : "hiddenLeft"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
              >
                <div className="text-6xl mb-6 group-hover:scale-110 group-active:scale-95 transition-transform duration-300 ease-in-out">
                  {serviceIcons[idx]}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-blue-800 text-center">
                  {service.title}
                </h3>
                <p className="text-lg text-gray-600 text-center">
                  {service.description}
                </p>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
