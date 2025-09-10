// src/Hooks/useAuth.ts
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../data/firebase"; // ✅ import from your firebase.ts

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Check if user exists in "admins" collection
  const checkAdmin = async (uid: string): Promise<boolean> => {
    try {
      const docRef = doc(db, "admins", uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const adminStatus = await checkAdmin(currentUser.uid);
        setIsAdminUser(adminStatus);
      } else {
        setIsAdminUser(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    isAdminUser,
    loading,
  };
}
