import { LanguageToggle } from "./language-toggle";
import { Navigation } from "./navigation";
import { Logo } from "./logo";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b py-2 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <Navigation />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
