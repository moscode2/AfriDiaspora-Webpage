// src/Hooks/useHeroSettings.ts
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../data/firebase";

export function useHeroSettings() {
  const [sidebarImageUrl, setSidebarImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroSettings = async () => {
      const ref = doc(db, "settings", "hero");
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setSidebarImageUrl(data.sidebarImageUrl || null);
      }
    };

    fetchHeroSettings();
  }, []);

  return { sidebarImageUrl };
}
