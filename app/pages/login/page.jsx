"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
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

  return (
    <div className="min-h-screen flex justify-center items-center text-black bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white text-black p-6 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
        {message && <p className="text-center text-sm mt-3">{message}</p>}
      </form>
    </div>
  );
}
