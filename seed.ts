// seed.ts
import * as dotenv from "dotenv";
dotenv.config();

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// --------------------
// Firebase Setup
// --------------------
console.log("🔑 API KEY from .env:", process.env.VITE_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: "AIzaSyD8HR8F2-bGFfwlw-6MrcfGhXd4wByKobQ",
  authDomain: "afrieuropanews.firebaseapp.com",
  projectId: "afrieuropanews",
  storageBucket: "afrieuropanews.firebasestorage.app",
  messagingSenderId: "77258538474",
  appId: "1:77258538474:web:da2087969fbd059e400693",
  measurementId: "G-VEVW0MXTBN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --------------------
// Types
// --------------------
type Category = {
  id: string;
  name: string;
};

type Article = {
  title: string;
  excerpt: string;
  content: string;
  category_id: string;
  author: string;
  featured_image_url: string;
  status: "draft" | "published";
};

// --------------------
// Data
// --------------------
const categories: Category[] = [
  { id: "africa-news", name: "Africa News" },
  { id: "europe-news", name: "Europe News" },
  { id: "diaspora-voices", name: "Diaspora Voices" },
  { id: "opinion", name: "Opinion / Editorial" },
  { id: "business-economy", name: "Business & Economy" },
  { id: "culture-travel", name: "Culture & Travel" },
];

const articles: Article[] = [
  // 🌍 Africa News
  {
    title: "African Union Pushes for Stronger Regional Trade",
    excerpt: "The AU is prioritizing cross-border trade policies to boost economies...",
    content: "Full article content here...",
    category_id: "africa-news",
    author: "Staff Reporter",
    featured_image_url: "https://source.unsplash.com/600x400/?africa,trade",
    status: "published",
  },
  {
    title: "Kenya and Ethiopia Strengthen Diplomatic Ties",
    excerpt: "East African nations are building stronger regional security frameworks...",
    content: "Full article content here...",
    category_id: "africa-news",
    author: "Jane Doe",
    featured_image_url: "https://source.unsplash.com/600x400/?africa,kenya",
    status: "published",
  },
  {
    title: "Nigeria Launches New Tech Innovation Hub",
    excerpt: "Nigeria invests in technology hubs to drive youth innovation...",
    content: "Full article content here...",
    category_id: "africa-news",
    author: "Moses Onyango",
    featured_image_url: "https://source.unsplash.com/600x400/?nigeria,tech",
    status: "published",
  },
  {
    title: "South Africa Faces Energy Challenges",
    excerpt: "Power shortages continue to affect households and industries...",
    content: "Full article content here...",
    category_id: "africa-news",
    author: "John Smith",
    featured_image_url: "https://source.unsplash.com/600x400/?southafrica,energy",
    status: "published",
  },

  // 🇪🇺 Europe News
  {
    title: "African Diaspora in Germany Hosts Cultural Summit",
    excerpt: "Berlin saw a major gathering of diaspora leaders this week...",
    content: "Full article content here...",
    category_id: "europe-news",
    author: "Staff Reporter",
    featured_image_url: "https://source.unsplash.com/600x400/?germany,africa",
    status: "published",
  },
  {
    title: "UK Parliament Debates Migration Policies",
    excerpt: "Migration from Africa remains a hot topic in British politics...",
    content: "Full article content here...",
    category_id: "europe-news",
    author: "Jane Doe",
    featured_image_url: "https://source.unsplash.com/600x400/?uk,parliament",
    status: "published",
  },
  {
    title: "France Expands African Student Scholarships",
    excerpt: "French universities welcome more students from African nations...",
    content: "Full article content here...",
    category_id: "europe-news",
    author: "Moses Onyango",
    featured_image_url: "https://source.unsplash.com/600x400/?france,students",
    status: "published",
  },
  {
    title: "Italy Discusses Mediterranean Migration Crisis",
    excerpt: "Rome calls for EU-wide solutions to manage migration...",
    content: "Full article content here...",
    category_id: "europe-news",
    author: "John Smith",
    featured_image_url: "https://source.unsplash.com/600x400/?italy,mediterranean",
    status: "published",
  },

  // 🌐 Diaspora Voices
  {
    title: "Voices from the African Community in Paris",
    excerpt: "Interviews reveal the challenges and triumphs of daily life...",
    content: "Full article content here...",
    category_id: "diaspora-voices",
    author: "Staff Reporter",
    featured_image_url: "https://source.unsplash.com/600x400/?paris,africa",
    status: "published",
  },
  {
    title: "Young African Entrepreneurs in London",
    excerpt: "Diaspora youth are launching startups and reshaping business...",
    content: "Full article content here...",
    category_id: "diaspora-voices",
    author: "Jane Doe",
    featured_image_url: "https://source.unsplash.com/600x400/?london,startup",
    status: "published",
  },
  {
    title: "Voices from African Women in Italy",
    excerpt: "African women share their migration journeys and resilience...",
    content: "Full article content here...",
    category_id: "diaspora-voices",
    author: "Moses Onyango",
    featured_image_url: "https://source.unsplash.com/600x400/?italy,women",
    status: "published",
  },
  {
    title: "Second-Generation Africans Shaping Identity",
    excerpt: "Youth balance African heritage with European lifestyles...",
    content: "Full article content here...",
    category_id: "diaspora-voices",
    author: "John Smith",
    featured_image_url: "https://source.unsplash.com/600x400/?youth,identity",
    status: "published",
  },

  // 📝 Opinion
  {
    title: "Opinion: Africa’s Role in Global Politics",
    excerpt: "Experts argue Africa must push for stronger global representation...",
    content: "Full article content here...",
    category_id: "opinion",
    author: "Guest Contributor",
    featured_image_url: "https://source.unsplash.com/600x400/?politics,africa",
    status: "published",
  },
  {
    title: "Editorial: Europe Must Recognize Diaspora Contributions",
    excerpt: "The diaspora is vital to Europe’s cultural and economic fabric...",
    content: "Full article content here...",
    category_id: "opinion",
    author: "Editorial Team",
    featured_image_url: "https://source.unsplash.com/600x400/?europe,diaspora",
    status: "published",
  },
  {
    title: "Analysis: Migration Trends in 2025",
    excerpt: "New migration flows are reshaping Europe’s labor market...",
    content: "Full article content here...",
    category_id: "opinion",
    author: "Analyst",
    featured_image_url: "https://source.unsplash.com/600x400/?migration,2025",
    status: "published",
  },
  {
    title: "Guest Column: Building Bridges Across Borders",
    excerpt: "We need stronger African-European cooperation...",
    content: "Full article content here...",
    category_id: "opinion",
    author: "Columnist",
    featured_image_url: "https://source.unsplash.com/600x400/?africa,europe",
    status: "published",
  },

  // 💼 Business & Economy
  {
    title: "Remittances Drive African Economies",
    excerpt: "New data shows diaspora remittances continue to grow...",
    content: "Full article content here...",
    category_id: "business-economy",
    author: "Staff Reporter",
    featured_image_url: "https://source.unsplash.com/600x400/?money,africa",
    status: "published",
  },
  {
    title: "Trade Talks Between EU and African Union",
    excerpt: "Negotiations focus on agriculture, digital trade, and tariffs...",
    content: "Full article content here...",
    category_id: "business-economy",
    author: "Jane Doe",
    featured_image_url: "https://source.unsplash.com/600x400/?trade,eu",
    status: "published",
  },
  {
    title: "Startup Investments Rise in African Cities",
    excerpt: "Investors eye Nairobi, Lagos, and Cape Town as hubs...",
    content: "Full article content here...",
    category_id: "business-economy",
    author: "Moses Onyango",
    featured_image_url: "https://source.unsplash.com/600x400/?startup,africa",
    status: "published",
  },
  {
    title: "African Banks Go Digital",
    excerpt: "Fintech is driving access to financial services across the continent...",
    content: "Full article content here...",
    category_id: "business-economy",
    author: "John Smith",
    featured_image_url: "https://source.unsplash.com/600x400/?fintech,africa",
    status: "published",
  },

  // 🎭 Culture & Travel
  {
    title: "Afrobeats Festival Lights Up London",
    excerpt: "Thousands attended the largest Afrobeats event in Europe...",
    content: "Full article content here...",
    category_id: "culture-travel",
    author: "Staff Reporter",
    featured_image_url: "https://source.unsplash.com/600x400/?afrobeats,concert",
    status: "published",
  },
  {
    title: "African Fashion Week in Paris",
    excerpt: "Designers showcase bold styles inspired by African heritage...",
    content: "Full article content here...",
    category_id: "culture-travel",
    author: "Jane Doe",
    featured_image_url: "https://source.unsplash.com/600x400/?africanfashion,paris",
    status: "published",
  },
  {
    title: "Travel Guide: Exploring Ghana’s Heritage",
    excerpt: "Cape Coast Castle and Accra’s bustling streets attract tourists...",
    content: "Full article content here...",
    category_id: "culture-travel",
    author: "Moses Onyango",
    featured_image_url: "https://source.unsplash.com/600x400/?ghana,travel",
    status: "published",
  },
  {
    title: "Cultural Exchange Programs Expand in Europe",
    excerpt: "Universities foster deeper connections between Africa and Europe...",
    content: "Full article content here...",
    category_id: "culture-travel",
    author: "John Smith",
    featured_image_url: "https://source.unsplash.com/600x400/?culture,europe",
    status: "published",
  },
];

// --------------------
// Helpers
// --------------------
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function validate(obj: Record<string, unknown>, name: string) {
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null || value === "") {
      throw new Error(`❌ ${name} has invalid value for "${key}": ${value}`);
    }
  }
}

// --------------------
// Seeder
// --------------------
async function seed() {
  try {
    console.log("🚀 Starting Firestore seeding...");

    // ✅ Insert categories
    for (const category of categories) {
      validate(category, `Category: ${category.id}`);
      const { id, ...data } = category;
      await setDoc(doc(db, "categories", id), data);
      console.log(`✅ Category added: ${category.name}`);
    }

    // ✅ Insert articles
    for (const article of articles) {
      validate(article, `Article: ${article.title}`);
      const safeId = slugify(article.title);
      await setDoc(doc(db, "articles", safeId), article);
      console.log(`📰 Article added: ${article.title}`);
    }

    console.log("🎉 Seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding Firestore:", err);
    process.exit(1);
  }
}

// ✅ Run the seeder
seed();
