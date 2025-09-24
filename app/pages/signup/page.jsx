"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setMessage(error.message);
    else setMessage("Signup successful! Check your email to confirm.");
  }

  return (
    <div className="min-h-screen flex justify-center text-black items-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white text-black p-6 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Signup</h1>
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
          Signup
        </button>
        {message && <p className="text-center text-sm mt-3">{message}</p>}
      </form>
    </div>
  );
}
