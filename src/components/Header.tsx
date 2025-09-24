// src/components/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next"; // ✅ added import
import { SearchBar } from "./ui/search-bar";
import { LanguageToggle } from "./ui/language-toggle";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const navigate = useNavigate();

  const navigation = [
    { name: t("nav.africa"), href: "/category/africa-news" },
    { name: t("nav.europe"), href: "/category/europe-news" },
    { name: t("nav.diasporaVoices"), href: "/category/diaspora-voices" },
    { name: t("nav.opinion"), href: "/category/opinion" },
    { name: t("nav.businessEconomy"), href: "/category/business-economy" },
    { name: t("nav.cultureTravel"), href: "/category/culture-travel" }
  ];

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AEN</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary">
                  {t("brandName")}
                </span>
                <span className="text-xs text-muted-foreground hidden sm:block">
                  {t("tagline")}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors rounded-md hover:bg-secondary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search + Language + Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <SearchBar onSearch={handleSearch} className="w-64" />
            </div>
            <div className="hidden md:block">
              <LanguageToggle
                currentLanguage={currentLanguage}
                onLanguageChange={(lang) => {
                  setCurrentLanguage(lang);
                  i18n.changeLanguage(lang); // ✅ sync with i18n
                }}
              />
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-foreground hover:text-accent hover:bg-secondary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t py-4">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-accent hover:bg-secondary rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 space-y-3">
                <SearchBar onSearch={handleSearch} className="mx-3" />
                <div className="px-3">
                  <LanguageToggle
                    currentLanguage={currentLanguage}
                    onLanguageChange={(lang) => {
                      setCurrentLanguage(lang);
                      i18n.changeLanguage(lang); // ✅ sync with i18n
                      setMobileMenuOpen(false);
                    }}
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
