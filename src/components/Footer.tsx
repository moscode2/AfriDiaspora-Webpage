// src/components/Footer.tsx
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English", flag: "gb" },
    { code: "nl", name: "Dutch", flag: "nl" },
    { code: "fr", name: "French", flag: "fr" },
    { code: "es", name: "Spanish", flag: "es" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Section + Donation Button */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AEN</span>
              </div>
              <div>
                <span className="text-xl font-bold">{t("brandName")}</span>
                <div className="text-xs text-gray-400 -mt-1">{t("footerText")}</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">{t("footerDescription")}</p>

            {/* Donation Button */}
            <div className="mt-4">
              <a
                href="/buy-us-coffee"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-lg transition-colors"
              >
                {t("buyUsCoffee")}
              </a>
            </div>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("categories")}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/category/africa-news">{t("africaNews")}</Link></li>
              <li><Link to="/category/europe-news">{t("europeNews")}</Link></li>
              <li><Link to="/category/diaspora-voices">{t("diasporaVoices")}</Link></li>
              <li><Link to="/category/opinion">{t("opinion")}</Link></li>
              <li><Link to="/category/business-economy">{t("businessEconomy")}</Link></li>
              <li><Link to="/category/culture-travel">{t("cultureTravel")}</Link></li>
              <li><Link to="/impressum">{t("impressum")}</Link></li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("company")}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about">{t("about")}</Link></li>
              <li><Link to="/editorial">{t("editorial")}</Link></li>
              <li><Link to="/contact">{t("contact")}</Link></li>
              <li><Link to="/privacy">{t("privacy")}</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("followUs")}</h3>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/afrieuropa-news/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61580768934040" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://x.com/afrieuropa" target="_blank" rel="noopener noreferrer">
                <span className="font-bold text-lg">X</span>
              </a>
              <a href="https://www.instagram.com/afrieuropa_news" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://www.youtube.com/@AfriEuropaNews" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="mt-12 flex justify-center space-x-8">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className="flex flex-col items-center hover:opacity-80 transition"
            >
              <img
                src={`https://flagcdn.com/w20/${lang.flag}.png`}
                alt={lang.name}
                className="w-6 h-4 mb-1 rounded-sm"
              />
              <span className="text-sm text-gray-300">{lang.name}</span>
            </button>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {t("brandName")}. {t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
