import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../data/firebase"; // ✅ Firebase auth
import { onAuthStateChanged, User } from "firebase/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check admin (for now, just match email)
  const isAdminUser = user.email === "admin@afrieuropa.com";

  if (requireAdmin && !isAdminUser) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
