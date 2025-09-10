// src/lib/firestoreHelpers.ts
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

export const addSubscriber = async (email: string) => {
  // check duplicate
  const q = query(collection(db, "newsletter_subscribers"), where("email", "==", email));
  const snap = await getDocs(q);
  if (!snap.empty) throw new Error("already-subscribed");

  return addDoc(collection(db, "newsletter_subscribers"), {
    email,
    is_active: true,
    created_at: serverTimestamp(),
  });
};

export const addContactMessage = async (payload: { name: string; email: string; subject: string; message: string }) =>
  addDoc(collection(db, "contact_messages"), { ...payload, is_read: false, created_at: serverTimestamp() });

export const getArticles = async () => {
    const q = query(collection(db, "articles"), orderBy("created_at", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as Record<string, unknown>) }));
};

export const deleteArticle = async (id: string) => deleteDoc(doc(db, "articles", id));
export const updateArticle = async (id: string, update: Record<string, unknown>) => updateDoc(doc(db, "articles", id), update);

// Real-time listener (example)
export const listenArticles = (cb: (data: unknown[]) => void) => {
    const q = query(collection(db, "articles"), orderBy("created_at", "desc"));
    return onSnapshot(q, snapshot => cb(snapshot.docs.map(d => ({ id: d.id, ...(d.data() as Record<string, unknown>) }))));
};
