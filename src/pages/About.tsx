import Header from "../components/Header";
import Footer from "../components/Footer";
import { Users, Globe, Target, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: "Henry Odhiambo",
      role: t("about.team.ceoRole"),
      image: "/images/Henry.jpeg",
      bio: t("about.team.ceoBio"),
    },
    {
      name: "Elizabeth Orayo",
      role: t("about.team.cooRole"),
      image: "/images/Lizzy.jpeg",
      bio: t("about.team.cooBio"),
    },
    {
      name: "Hae-Won Jeon",
      role: t("about.team.ctoRole"),
      image: "https://t3.ftcdn.net/jpg/01/96/42/96/240_F_196429667_WXnNvlMkcrzjabpwoukvqJtEbyJIM7Gj.jpg",
      bio: t("about.team.ctoBio"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-red-600 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt={t("about.heroAlt")}
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {t("about.title")}
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            {t("about.subtitle")}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("about.mission.title")}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("about.mission.text")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("about.mission.community.title")}</h3>
            <p className="text-gray-600">{t("about.mission.community.text")}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("about.mission.global.title")}</h3>
            <p className="text-gray-600">{t("about.mission.global.text")}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("about.mission.opportunities.title")}</h3>
            <p className="text-gray-600">{t("about.mission.opportunities.text")}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("about.mission.stories.title")}</h3>
            <p className="text-gray-600">{t("about.mission.stories.text")}</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("about.story.title")}</h2>
              <div className="prose prose-lg text-gray-700">
                <p className="mb-4">{t("about.story.p1")}</p>
                <p className="mb-4">{t("about.story.p2")}</p>
                <p>{t("about.story.p3")}</p>
              </div>
            </div>
            <div>
              <img
                src="https://media.istockphoto.com/id/2204971934/photo/woman-reading-news-at-smart-phone.webp?a=1&b=1&s=612x612&w=0&k=20&c=5qEmsmXk8FysRRL1VQ_0cfyugK6lZ3i-6oV0aS96yyQ="
                alt={t("about.storyAlt")}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("about.team.title")}</h2>
          <p className="text-lg text-gray-600">{t("about.team.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-40 h-52 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-orange-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t("about.values.title")}</h2>
          
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t("about.values.authenticity.title")}</h3>
              <p className="text-gray-700">{t("about.values.authenticity.text")}</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t("about.values.excellence.title")}</h3>
              <p className="text-gray-700">{t("about.values.excellence.text")}</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t("about.values.empowerment.title")}</h3>
              <p className="text-gray-700">{t("about.values.empowerment.text")}</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t("about.values.unity.title")}</h3>
              <p className="text-gray-700">{t("about.values.unity.text")}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
