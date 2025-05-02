import { create } from "zustand";
import { auth } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

interface AuthStore {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    set({ user: userCredential.user.email });
  },

  register: async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    set({ user: userCredential.user.email });
  },

  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },

  checkAuth: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ user: user.email });
      } else {
        set({ user: null });
      }
    });
  },
}));