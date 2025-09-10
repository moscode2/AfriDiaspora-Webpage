import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 🔹 Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AEN</span>
              </div>
              <div>
                <span className="text-xl font-bold">AfriEuropa News</span>
                <div className="text-xs text-gray-400 -mt-1">
                  Bridge Between Continents
                </div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted source for African diaspora articles and opportunities
              across Europe.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/category/news"
                  className="hover:text-orange-500 transition-colors"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/category/policy-migration"
                  className="hover:text-orange-500 transition-colors"
                >
                  Policy & Migration
                </Link>
              </li>
              <li>
                <Link
                  to="/category/culture-lifestyle"
                  className="hover:text-orange-500 transition-colors"
                >
                  Culture & Lifestyle
                </Link>
              </li>
              <li>
                <Link
                  to="/category/profiles-voices"
                  className="hover:text-orange-500 transition-colors"
                >
                  Profiles & Voices
                </Link>
              </li>
              <li>
                <Link
                  to="/category/travel-mobility"
                  className="hover:text-orange-500 transition-colors"
                >
                  Travel & Mobility
                </Link>
              </li>
              <li>
                <Link
                  to="/category/business-jobs"
                  className="hover:text-orange-500 transition-colors"
                >
                  Business & Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/category/events"
                  className="hover:text-orange-500 transition-colors"
                >
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/about"
                  className="hover:text-orange-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/editorial"
                  className="hover:text-orange-500 transition-colors"
                >
                  Editorial Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-orange-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-orange-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/afrieuropa-news/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61580768934040"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                title="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://x.com/afrieuropa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors flex items-center justify-center"
                title="X"
              >
                <span className="font-bold text-lg">X</span>
              </a>
              <a
                href="https://www.instagram.com/afrieuropa_news"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                title="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.youtube.com/@AfriEuropaNews"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                title="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} AfriEuropa News. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
