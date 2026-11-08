import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchFullProfile = async (currentUser: User) => {
    const email = currentUser.email;
    const id = currentUser.id;

    if (!email) return;

    try {
      const [adminRes, teacherRes, userRes] = await Promise.all([
        supabase.from("admin").select("*").or(`id.eq.${id},email.eq.${email}`).maybeSingle(),
        supabase.from("teachers").select("*").or(`id.eq.${id},email.eq.${email}`).maybeSingle(),
        supabase.from("users").select("*").or(`email.eq.${email},id.eq.${id}`).maybeSingle(),
      ]);

      const currentProfile = adminRes.data || teacherRes.data || userRes.data || null;
      setProfile(currentProfile);
    } catch (err) {
      console.error("Error fetching full profile:", err);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchFullProfile(session.user);
      }
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchFullProfile(session.user);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}