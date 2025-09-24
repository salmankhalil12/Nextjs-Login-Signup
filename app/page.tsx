"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.log("Error fetching:", error);
    else setProducts(data);
  }

  async function addProduct() {
    const { error } = await supabase
      .from("products")
      .insert([{ name: "New Product", price: 99 }]);
    if (!error) getProducts();
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Products</h1>
      <button
        onClick={addProduct}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
      >
        Add Product
      </button>

      <ul className="mt-4">
        {products.map((p) => (
          <li key={p.id} className="border-b py-2">
            {p.name} — ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
