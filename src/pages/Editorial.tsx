import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function EditorialPage() {
  const { t } = useTranslation();

  // Typed helpers for rendering lists
  const renderList = (items: string[]) =>
    items.map((item: string, index: number) => <li key={index}>{item}</li>);

  const renderOrderedList = (items: string[]) =>
    items.map((item: string, index: number) => <li key={index}>{item}</li>);

  // Helper to safely cast i18next return value
  const getStringArray = (key: string): string[] => {
    return t(key, { returnObjects: true }) as string[];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("title")}</h1>

          <div className="prose prose-lg max-w-none text-gray-700">
            {/* Commitment */}
            <p className="text-xl text-orange-600 font-medium mb-6">{t("commitment")}</p>

            {/* Mission */}
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t("missionTitle")}</h2>
            <p>{t("missionText")}</p>

            {/* Editorial Standards */}
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t("standardsTitle")}</h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t("accuracyTitle")}</h3>
            <ul className="list-disc pl-6 space-y-2">{renderList(getStringArray("accuracyList"))}</ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t("fairnessTitle")}</h3>
            <ul className="list-disc pl-6 space-y-2">{renderList(getStringArray("fairnessList"))}</ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t("independenceTitle")}</h3>
            <ul className="list-disc pl-6 space-y-2">{renderList(getStringArray("independenceList"))}</ul>

            {/* Content Guidelines */}
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t("guidelinesTitle")}</h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t("culturalTitle")}</h3>
            <p>{t("culturalText")}</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t("languageTitle")}</h3>
            <ul className="list-disc pl-6 space-y-2">{renderList(getStringArray("languageList"))}</ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t("protectionTitle")}</h3>
            <p>{t("protectionText")}</p>

            {/* Editorial Process */}
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t("processTitle")}</h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t("developmentTitle")}</h3>
            <ol className="list-decimal pl-6 space-y-2">{renderOrderedList(getStringArray("developmentList"))}</ol>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t("oversightTitle")}</h3>
            <p>{t("oversightText")}</p>

            {/* Corrections and Complaints */}
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t("correctionsTitle")}</h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t("correctionsPolicyTitle")}</h3>
            <p>{t("correctionsPolicyText")}</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t("feedbackTitle")}</h3>
            <p>{t("feedbackText")}</p>

            {/* Community Guidelines */}
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t("communityTitle")}</h2>
            <p>{t("communityText")}</p>
            <ul className="list-disc pl-6 space-y-2">{renderList(getStringArray("communityList"))}</ul>

            {/* Contact Editorial Team */}
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t("contactTitle")}</h2>
            <p>{t("contactText")}</p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p><strong>Editorial Email:</strong> {t("contactEmail")}</p>
              <p><strong>News Tips:</strong> {t("contactTips")}</p>
              <p><strong>Corrections:</strong> {t("contactCorrections")}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
