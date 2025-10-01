"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import Link from "next/link"; // ✅ Import Link

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }, // ✅ Save name in user metadata
      },
    });

    if (error) setMessage(error.message);
    else setMessage("Signup successful! Please check your email to confirm.");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 text-black">
      <motion.form
        onSubmit={handleSignup}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Signup</h1>

        {/* Name Field */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Email Field */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Field */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Signup
        </button>

        {/* ✅ Login Redirect */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/pages/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

        {message && (
          <p className="text-center text-sm mt-3 text-gray-700">{message}</p>
        )}
      </motion.form>
    </div>
  );
}
