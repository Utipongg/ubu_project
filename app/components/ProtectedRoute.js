// components/ProtectedRoute.js
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner if still checking
  }

  return user ? children : null;
};

export default ProtectedRoute;
