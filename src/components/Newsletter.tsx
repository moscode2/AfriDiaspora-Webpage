import { useState } from "react";
import { X, Mail, Check } from "lucide-react";
import { db } from "../data/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useTranslation } from "react-i18next";

export default function NewsletterBanner() {
  const { t } = useTranslation(); // ✅ hook for translations
  const [isVisible, setIsVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const q = query(
        collection(db, "newsletter_subscribers"),
        where("email", "==", email)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setError(t("newsletter.alreadySubscribed"));
      } else {
        await addDoc(collection(db, "newsletter_subscribers"), {
          email,
          is_active: true,
          created_at: new Date(),
        });

        setIsSubscribed(true);
        setEmail("");
        setTimeout(() => setIsVisible(false), 3000);
      }
    } catch (err) {
      console.error("Error subscribing:", err);
      setError(t("newsletter.error"));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 shadow-lg z-50">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center space-x-3">
          <Mail className="h-6 w-6 flex-shrink-0" />
          <div>
            <p className="font-semibold">{t("newsletter.title")}</p>
            <p className="text-sm opacity-90">{t("newsletter.subtitle")}</p>
          </div>
        </div>

        {/* Right side */}
        {!isSubscribed ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletter.placeholder")}
                className="px-3 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !email}
                className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {isLoading ? "..." : t("newsletter.subscribe")}
              </button>
            </div>
            {error && <p className="text-sm text-red-200">{error}</p>}
          </form>
        ) : (
          <div className="flex items-center space-x-2 text-green-200">
            <Check className="h-5 w-5" />
            <span className="font-medium">{t("newsletter.thanks")}</span>
          </div>
        )}

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
