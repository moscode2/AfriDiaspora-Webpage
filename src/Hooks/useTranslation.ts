// src/Hooks/useTranslations.ts
import { useEffect, useState } from "react";
import { doc, onSnapshot, DocumentData } from "firebase/firestore";
import { db } from "../data/firebase";
import i18n from "../src/i18n"; // Ensure this path is correct and the module exists

/**
 * Loads translation bundles from Firestore document `translations/{namespace}`
 * and registers them with i18next. Returns the set of strings for the current language.
 *
 * Usage:
 * const { strings, loading } = useTranslations("common")
 * strings.home, strings.siteTitle, etc.
 */
export function useTranslations(namespace = "common") {
  const [strings, setStrings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const ref = doc(db, "translations", namespace);

    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (!snap.exists()) {
          setLoading(false);
          return;
        }

        const data = snap.data() as DocumentData; // shape: { en: {...}, fr: {...}, ... }

        // Register each language bundle with i18n
        Object.keys(data).forEach((lang) => {
          const bundle = data[lang];
          // add or overwrite resource bundle
          try {
            // replace existing bundle to reflect remote updates
            i18n.addResourceBundle(lang, "translation", bundle, true, true);
          } catch (err) {
            // fallback: try to remove then add
            try {
              (i18n as any).removeResourceBundle?.(lang, "translation");
              i18n.addResourceBundle(lang, "translation", bundle, true, true);
            } catch (e) {
              console.error("i18n bundle error", e);
            }
          }
        });

        // set current language strings
        const current = i18n.language || "en";
        setStrings((data as any)[current] || (data as any)["en"] || {});
        setLoading(false);
      },
      (err) => {
        console.error("translations snapshot error:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [namespace]);

  // update strings when language changes (reads from i18n resource)
  useEffect(() => {
    const onLangChange = (lng: string) => {
      const bundle = i18n.getResourceBundle(lng, "translation") || {};
      setStrings(bundle);
    };
    i18n.on("languageChanged", onLangChange);
    return () => i18n.off("languageChanged", onLangChange);
  }, [namespace]);

  return { strings, loading };
}
