import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

export default function PrivacyPage() {
  const { t } = useTranslation();

  // Get lists from JSON
  const personalInfoList = t("privacy.personalInfoList", { returnObjects: true }) as string[];
  const autoInfoList = t("privacy.autoInfoList", { returnObjects: true }) as string[];
  const useList = t("privacy.useList", { returnObjects: true }) as string[];
  const sharingList = t("privacy.sharingList", { returnObjects: true }) as string[];
  const rightsList = t("privacy.rightsList", { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("privacy.title")}</h1>
          <p className="text-sm text-gray-500 mb-8">{t("privacy.lastUpdated")}</p>

          <div className="prose prose-lg max-w-none text-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.introTitle")}
            </h2>
            <p>{t("privacy.introText")}</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.infoTitle")}
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              {t("privacy.personalInfo")}
            </h3>
            <p>{t("privacy.personalInfoText")}</p>
            <ul className="list-disc pl-6 space-y-2">
              {personalInfoList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              {t("privacy.autoInfo")}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              {autoInfoList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.useTitle")}
            </h2>
            <p>{t("privacy.useText")}</p>
            <ul className="list-disc pl-6 space-y-2">
              {useList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.sharingTitle")}
            </h2>
            <p>{t("privacy.sharingText")}</p>
            <ul className="list-disc pl-6 space-y-2">
              {sharingList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.cookiesTitle")}
            </h2>
            <p>{t("privacy.cookiesText")}</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.securityTitle")}
            </h2>
            <p>{t("privacy.securityText")}</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.rightsTitle")}
            </h2>
            <p>{t("privacy.rightsText")}</p>
            <ul className="list-disc pl-6 space-y-2">
              {rightsList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.unsubscribeTitle")}
            </h2>
            <p>{t("privacy.unsubscribeText")}</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.childrenTitle")}
            </h2>
            <p>{t("privacy.childrenText")}</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.changesTitle")}
            </h2>
            <p>{t("privacy.changesText")}</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.contactTitle")}
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p><strong>Email:</strong> {t("privacy.contactEmail")}</p>
              <p><strong>Address:</strong> {t("privacy.contactAddress")}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
