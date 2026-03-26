"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isVendeur: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "client" | "vendeur";
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  "client@agora.fr": {
    password: "password123",
    user: {
      id: "u1",
      email: "client@agora.fr",
      firstName: "Marie",
      lastName: "Dupont",
      role: "client",
    },
  },
  "vendeur@agora.fr": {
    password: "password123",
    user: {
      id: "u2",
      email: "vendeur@agora.fr",
      firstName: "Jean",
      lastName: "Martin",
      role: "vendeur",
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("agora_token");
        const savedUser = localStorage.getItem("agora_user");
        
        if (token && savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch {
        // Invalid stored data
        localStorage.removeItem("agora_token");
        localStorage.removeItem("agora_user");
        localStorage.removeItem("agora_refresh");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Mock authentication
      const mockUser = MOCK_USERS[email.toLowerCase()];
      
      if (!mockUser || mockUser.password !== password) {
        setIsLoading(false);
        throw new Error("Email ou mot de passe incorrect");
      }
      
      // Store tokens and user
      localStorage.setItem("agora_token", "mock_access_token_" + Date.now());
      localStorage.setItem("agora_refresh", "mock_refresh_token_" + Date.now());
      localStorage.setItem("agora_user", JSON.stringify(mockUser.user));
      
      setUser(mockUser.user);
      setIsLoading(false);
      
      // Redirect based on role
      if (mockUser.user.role === "vendeur") {
        router.push("/vendeur/dashboard");
      } else {
        router.push("/catalogue");
      }
    },
    [router]
  );

  const register = useCallback(
    async (data: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      role: "client" | "vendeur";
    }) => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Check if user already exists
      if (MOCK_USERS[data.email.toLowerCase()]) {
        setIsLoading(false);
        throw new Error("Un compte existe déjà avec cet email");
      }
      
      // Create new user (in real app, this would be saved to backend)
      const newUser: User = {
        id: "u" + Date.now(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
      };
      
      // Store in mock database
      MOCK_USERS[data.email.toLowerCase()] = {
        password: data.password,
        user: newUser,
      };
      
      setIsLoading(false);
      
      // Redirect to login
      router.push("/login?registered=true");
    },
    [router]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("agora_token");
    localStorage.removeItem("agora_refresh");
    localStorage.removeItem("agora_user");
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isVendeur: user?.role === "vendeur",
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
