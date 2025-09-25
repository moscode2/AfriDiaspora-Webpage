import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {t("privacy.title")}
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-8">
              {t("privacy.lastUpdated")}
            </p>

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
              <li>Email address (for newsletter subscriptions)</li>
              <li>Name and contact information (when you contact us)</li>
              <li>Comments and feedback you provide</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              {t("privacy.autoInfo")}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address and browser information</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website information</li>
              <li>Device type and operating system</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.useTitle")}
            </h2>
            <p>{t("privacy.useText")}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Deliver our newsletter and content updates</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our website and user experience</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.sharingTitle")}
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. We may share information only in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal requirements or court orders</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>
                With trusted service providers who assist in our operations
                (under strict confidentiality agreements)
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.cookiesTitle")}
            </h2>
            <p>
              We use cookies and similar technologies to enhance your browsing
              experience, analyze site traffic, and remember your preferences.
              You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.securityTitle")}
            </h2>
            <p>
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction. However, no internet transmission is
              100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.rightsTitle")}
            </h2>
            <p>
              Under the General Data Protection Regulation (GDPR), you have the
              right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Rectify inaccurate personal data</li>
              <li>Erase your personal data</li>
              <li>Restrict processing of your personal data</li>
              <li>Data portability</li>
              <li>Object to processing</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.unsubscribeTitle")}
            </h2>
            <p>
              You can unsubscribe from our newsletter at any time by clicking
              the "unsubscribe" link in any newsletter email or by contacting us
              directly at hello@diasporalens.eu.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.childrenTitle")}
            </h2>
            <p>
              Our services are not intended for children under 16 years of age.
              We do not knowingly collect personal information from children
              under 16.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.changesTitle")}
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t("privacy.contactTitle")}
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p>
                <strong>Email:</strong> {t("privacy.contactEmail")}
              </p>
              <p>
                <strong>Address:</strong> {t("privacy.contactAddress")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
