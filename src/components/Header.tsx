import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useStaticData } from "../Hooks/useStaticData";

const languages = [
  { code: "en", label: "English", flag: "gb" },
  { code: "nl", label: "Dutch", flag: "nl" },
  { code: "fr", label: "French", flag: "fr" },
  { code: "es", label: "Spanish", flag: "es" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const selectedLang = i18n.language;

  const { categories, loading } = useStaticData();

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  // Build navigation dynamically
  const navigation = [
    { name: t("latest"), href: "/" }, // Home / Latest News
    ...categories.map(cat => ({ name: cat.name, href: `/category/${cat.slug}` })),
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo + Title + Tagline */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt={t("brand")}
                className="h-10 w-10 object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-gray-900">{t("brand")}</span>
                <span className="text-xs text-gray-500">{t("welcome")}</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {loading
              ? null
              : navigation.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-gray-700 hover:text-orange-600 px-2 py-1 text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
          </div>

          {/* Language flags (desktop) */}
          <div className="hidden lg:flex items-center space-x-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`transition rounded ${
                  selectedLang.startsWith(lang.code) ? "ring-2 ring-orange-500" : ""
                }`}
              >
                <img
                  src={`https://flagcdn.com/w20/${lang.flag}.png`}
                  alt={lang.label}
                  className="w-6 h-4 rounded-sm"
                />
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {loading
                ? null
                : navigation.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}

              {/* Language flags (mobile) */}
              <div className="flex space-x-4 mt-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`transition rounded ${
                      selectedLang.startsWith(lang.code) ? "ring-2 ring-orange-500" : ""
                    }`}
                  >
                    <img
                      src={`https://flagcdn.com/w20/${lang.flag}.png`}
                      alt={lang.label}
                      className="w-6 h-4 rounded-sm"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
