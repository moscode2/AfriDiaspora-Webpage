
// Ensure the firebase module exists and is correctly exported
import { auth } from "./firebase"; 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  User} from "firebase/auth";

export const register = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const signOut = () => firebaseSignOut(auth);
export const getUserClaims = async (): Promise<User | null> => {
  // Implementation goes here
  return null; // Placeholder return
};
