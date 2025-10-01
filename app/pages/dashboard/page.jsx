"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Auth check
  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) router.push("/login");
      else setUser(data.user);
    }
    checkUser();
  }, [router]);

  // ✅ Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  // ✅ Apply theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/pages/login");
  }

  // ✅ Dummy chart data
  const barData = [
    { name: "Mon", activity: 40, goal: 70 },
    { name: "Tue", activity: 80, goal: 60 },
    { name: "Wed", activity: 100, goal: 90 },
    { name: "Thu", activity: 60, goal: 80 },
    { name: "Fri", activity: 90, goal: 100 },
  ];

  const lineData = [
    { day: "M", sales: 30 },
    { day: "T", sales: 60 },
    { day: "W", sales: 90 },
    { day: "T", sales: 40 },
    { day: "F", sales: 70 },
  ];

  const pieData = [
    { name: "Completed", value: 71 },
    { name: "Remaining", value: 29 },
  ];

  // ✅ Dynamic colors based on theme
  const chartColors = darkMode
    ? {
        bar1: "#60a5fa", // light blue
        bar2: "#818cf8", // indigo
        line: "#38bdf8", // cyan
        text: "#e5e7eb", // light gray text
        pie: ["#60a5fa", "#9ca3af"],
      }
    : {
        bar1: "#3b82f6", // normal blue
        bar2: "#6366f1", // indigo
        line: "#2563eb", // darker blue
        text: "#374151", // gray-700 text
        pie: ["#3b82f6", "#9ca3af"],
      };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-900 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-6">Acme</h2>
        <nav className="flex-1">
          <ul>
            <li className="px-6 py-3 hover:bg-indigo-800 cursor-pointer flex items-center space-x-2">
              <span>🏠</span> <span>Home</span>
            </li>
            <li className="px-6 py-3 hover:bg-indigo-800 cursor-pointer flex items-center space-x-2">
              <span>📅</span> <span>Calendar</span>
            </li>
            <li className="px-6 py-3 hover:bg-indigo-800 cursor-pointer flex items-center space-x-2">
              <span>📊</span> <span>Reports</span>
            </li>
            <li className="px-6 py-3 bg-indigo-800 cursor-pointer flex items-center space-x-2">
              <span>📈</span> <span>Dashboard</span>
            </li>
            <li className="px-6 py-3 hover:bg-indigo-800 cursor-pointer flex items-center space-x-2">
              <span>👥</span> <span>Contacts</span>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="m-6 bg-red-500 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* ✅ Topbar */}
        <div className="bg-white dark:bg-gray-800 shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold dark:text-white">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              whileTap={{ scale: 0.9 }}
              className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white"
            >
              {darkMode ? "🌙 Dark" : "☀️ Light"}
            </motion.button>

            {user && (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-semibold dark:text-white">
                    {user.user_metadata?.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {user.email}
                  </p>
                </div>
                <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-full">
                  {user.user_metadata?.name
                    ? user.user_metadata?.name[0].toUpperCase()
                    : "U"}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {user ? (
            <>
              {/* User Details */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6"
              >
                <h2 className="text-xl font-bold mb-2 dark:text-white">
                  User Details
                </h2>
                <p className="dark:text-gray-200">
                  <span className="font-semibold">Name:</span>{" "}
                  {user.user_metadata?.name || "Not Provided"}
                </p>
                <p className="dark:text-gray-200">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="dark:text-gray-200">
                  <span className="font-semibold">Signup Date:</span>{" "}
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </motion.div>

              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-6 mb-6">
                {[
                  { label: "Number of Sales", value: "3450", change: "+25%" },
                  { label: "Sales Revenue", value: "$35,256", change: "+15%" },
                  { label: "Average Price", value: "$35.25", change: "-15%" },
                  { label: "Operations", value: "15,893", change: "" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
                  >
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {item.label}
                    </p>
                    <h3 className="text-2xl font-bold dark:text-white">
                      {item.value}
                    </h3>
                    <span
                      className={`text-sm ${
                        item.change.includes("-")
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {item.change}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-3 gap-6">
                {/* Bar Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
                >
                  <h3 className="font-bold mb-4 dark:text-white">
                    Market Overview
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={barData}>
                      <XAxis dataKey="name" stroke={chartColors.text} />
                      <YAxis stroke={chartColors.text} />
                      <Tooltip />
                      <Bar dataKey="activity" fill={chartColors.bar1} />
                      <Bar dataKey="goal" fill={chartColors.bar2} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Line Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
                >
                  <h3 className="font-bold mb-4 dark:text-white">
                    Sales Analytics
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={lineData}>
                      <XAxis dataKey="day" stroke={chartColors.text} />
                      <YAxis stroke={chartColors.text} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke={chartColors.line}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Pie Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
                >
                  <h3 className="font-bold mb-4 dark:text-white">
                    Sales Overview
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={chartColors.pie[index % chartColors.pie.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <p className="text-center text-lg font-bold mt-2 dark:text-white">
                    71%
                  </p>
                </motion.div>
              </div>
            </>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
