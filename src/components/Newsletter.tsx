import { useState } from "react";
import { X, Mail, Check } from "lucide-react";
import { db } from "../data/firebase"; // Firestore config
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export default function NewsletterBanner() {
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
      // ✅ Check if email already exists
      const q = query(
        collection(db, "newsletter_subscribers"),
        where("email", "==", email)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setError("You're already subscribed!");
      } else {
        // ✅ Save new subscriber
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
      setError("Failed to subscribe. Please try again.");
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
            <p className="font-semibold">Join AfriEuropa Weekly</p>
            <p className="text-sm opacity-90">
              Your diaspora news & opportunities digest
            </p>
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
                placeholder="Enter your email"
                className="px-3 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !email}
                className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {isLoading ? "..." : "Subscribe"}
              </button>
            </div>
            {error && <p className="text-sm text-red-200">{error}</p>}
          </form>
        ) : (
          <div className="flex items-center space-x-2 text-green-200">
            <Check className="h-5 w-5" />
            <span className="font-medium">Thanks for subscribing!</span>
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
