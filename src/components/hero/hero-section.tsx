import { HeroContent } from "./hero-content";
import { HeroBackground } from "./hero-background";

export function HeroSection() {
  return (
    <section className="relative h-[800px] bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
      <HeroBackground />
      <HeroContent />
    </section>
  );
}
