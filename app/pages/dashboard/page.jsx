"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) router.push("/login");
      else setUser(data.user);
    }
    checkUser();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/pages/login");
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-black bg-gray-100">
      {user ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Welcome, {user.email} 👋
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
