import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          brandName: "AfriEuropa News",
          footerDescription: "Your trusted source for African diaspora articles and opportunities across Europe.",
          footerText: "Bridge Between Continents",
          rights: "All rights reserved.",
          buyUsCoffee: "Buy Us Coffee",
          impressum: "Impressum",

          // Footer Sections
          categories: "Categories",
          company: "Company",
          followUs: "Follow Us",

          // Links
          about: "About Us",
          editorial: "Editorial Policy",
          contact: "Contact",
          privacy: "Privacy Policy",

          // Category items
          africaNews: "Africa News ",
          europeNews: "Europe News",
          diasporaVoices: "Diaspora Voices",
          opinion: "Opinion",
          businessEconomy: "Business & Economy",
          cultureTravel: "Culture & Travel",

          // Other UI
          welcome: "Uniting Africans Across Europe",
          readMore: "Read more",
          breakingNews: "Breaking",
          latest: "Latest headlines",
          home: "Home",
          newsletterTitle: "Stay connected with the African diaspora in Europe",
          newsletterCta: "Subscribe now",
          trending: "Trending Articles",
          support: "Featured News"
        },
      },
      nl: {
        translation: {
          brandName: "AfriEuropa Nieuws",
          footerDescription: "Uw vertrouwde bron voor artikelen en kansen van de Afrikaanse diaspora in Europa.",
          footerText: "Brug tussen continenten",
          rights: "Alle rechten voorbehouden.",
          buyUsCoffee: "Koop ons een Koffie",
          impressum: "Impressum",

          categories: "Categorieën",
          company: "Bedrijf",
          followUs: "Volg ons",

          about: "Over ons",
          editorial: "Redactiebeleid",
          contact: "Contact",
          privacy: "Privacybeleid",

          africaNews: "Afrika Nieuws",
          europeNews: "Europa Nieuws",
          diasporaVoices: "Diaspora Stemmen",
          opinion: "Opinies",
          businessEconomy: "Bedrijven & Economie",
          cultureTravel: "Cultuur & Reizen",

          welcome: "Welkom bij AfriEuropa Nieuws",
          readMore: "Lees meer",
          breakingNews: "Breaking",
          latest: "Laatste nieuws",
          home: "Home",
          newsletterTitle: "Blijf verbonden met de Afrikaanse diaspora in Europa",
          newsletterCta: "Abonneer nu",
          trending: "Populaire Artikelen",
          support: "Steun AfriEuropa Nieuws"
        },
      },
      fr: {
        translation: {
          brandName: "AfriEuropa News",
          footerDescription: "Votre source fiable pour les articles et opportunités de la diaspora africaine en Europe.",
          footerText: "Pont entre les continents",
          rights: "Tous droits réservés.",
          buyUsCoffee: "Achetez-nous un café",
          impressum: "Impressum",

          categories: "Catégories",
          company: "Entreprise",
          followUs: "Suivez-nous",

          about: "À propos",
          editorial: "Politique éditoriale",
          contact: "Contact",
          privacy: "Politique de confidentialité",

          africaNews: "Actualités Afrique",
          europeNews: "Actualités Europe",
          diasporaVoices: "Voix de la Diaspora",
          opinion: "Opinion",
          businessEconomy: "Affaires & Économie",
          cultureTravel: "Culture & Voyages",

          welcome: "Bienvenue sur AfriEuropa News",
          readMore: "Lire plus",
          breakingNews: "Dernière minute",
          latest: "Derniers titres",
          home: "Accueil",
          newsletterTitle: "Restez connectés avec la diaspora africaine en Europe",
          newsletterCta: "S'abonner maintenant",
          trending: "Articles Tendance",
          support: "Soutenir AfriEuropa News"
        },
      },
      es: {
        translation: {
          brandName: "AfriEuropa Noticias",
          footerDescription: "Su fuente confiable de artículos y oportunidades de la diáspora africana en Europa.",
          footerText: "Puente entre continentes",
          rights: "Todos los derechos reservados.",
          buyUsCoffee: "Cómpranos un café",
          impressum: "Impressum",

          categories: "Categorías",
          company: "Compañía",
          followUs: "Síguenos",

          about: "Sobre nosotros",
          editorial: "Política Editorial",
          contact: "Contacto",
          privacy: "Política de Privacidad",

          africaNews: "Noticias África",
          europeNews: "Noticias Europa",
          diasporaVoices: "Voces de la Diáspora",
          opinion: "Opinión",
          businessEconomy: "Negocios & Economía",
          cultureTravel: "Cultura & Viajes",

          welcome: "Bienvenido a AfriEuropa Noticias",
          readMore: "Leer más",
          breakingNews: "Última hora",
          latest: "Últimos titulares",
          home: "Inicio",
          newsletterTitle: "Mantente conectado con la diáspora africana en Europa",
          newsletterCta: "Suscríbete ahora",
          trending: "Artículos Destacados",
          support: "Apoyar AfriEuropa Noticias"
        },
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
