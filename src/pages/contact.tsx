import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { db } from "../data/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const { t } = useTranslation(); // ✅ no "contact" namespace
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await addDoc(collection(db, "contact_messages"), {
        ...formData,
        is_read: false,
        created_at: serverTimestamp(),
      });
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setError(t("contact.form.error"));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-lg text-gray-600">{t("contact.intro")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t("contact.form.title")}
            </h2>

            {isSubmitted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-medium">
                  {t("contact.form.success")}
                </p>
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.labels.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder={t("contact.form.placeholders.name")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.labels.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder={t("contact.form.placeholders.email")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.labels.subject")}
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">{t("contact.form.subjects.default")}</option>
                  <option value="general">{t("contact.form.subjects.general")}</option>
                  <option value="editorial">{t("contact.form.subjects.editorial")}</option>
                  <option value="advertising">{t("contact.form.subjects.advertising")}</option>
                  <option value="partnership">{t("contact.form.subjects.partnership")}</option>
                  <option value="technical">{t("contact.form.subjects.technical")}</option>
                  <option value="feedback">{t("contact.form.subjects.feedback")}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.labels.message")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder={t("contact.form.placeholders.message")}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>{t("contact.form.submit")}</span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {t("contact.info.title")}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {t("contact.info.email")}
                    </h3>
                    <p className="text-gray-600">{t("contact.info.emailValue")}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {t("contact.info.editorialHotline")}
                    </h3>
                    <p className="text-gray-600">{t("contact.info.phoneValue")}</p>
                    <p className="text-sm text-gray-500">{t("contact.info.hours")}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {t("contact.info.office")}
                    </h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {t("contact.info.address")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">
                {t("contact.tips.title")}
              </h3>
              <p className="mb-4">{t("contact.tips.text")}</p>
              <a
                href="mailto:tips@diasporalens.eu"
                className="inline-flex items-center space-x-2 bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>{t("contact.tips.send")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
