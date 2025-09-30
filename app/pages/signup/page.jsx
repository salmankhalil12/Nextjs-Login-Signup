"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(true); // toggle state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleAuth(e) {
    e.preventDefault();

    if (isSignup) {
      // Signup
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message);
      else setMessage("Signup successful! Check your email to confirm.");
    } else {
      // Login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setMessage(error.message);
      else {
        setMessage("Login successful!");
        router.push("/pages/dashboard");
      }
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 text-black">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.form
            key={isSignup ? "signup" : "login"}
            onSubmit={handleAuth}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col"
          >
            <h1 className="text-2xl font-bold mb-4 text-center">
              {isSignup ? "Signup" : "Login"}
            </h1>

            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isSignup ? "Signup" : "Login"}
            </button>

            {message && (
              <p className="text-center text-sm mt-3">{message}</p>
            )}

            {/* Toggle link */}
            <p
              onClick={() => {
                setIsSignup(!isSignup);
                setMessage("");
              }}
              className="text-center mt-4 text-blue-500 cursor-pointer hover:underline"
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don’t have an account? Signup"}
            </p>
          </motion.form>
        </AnimatePresence>
      </div>
    </div>
  );
}
