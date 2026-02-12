"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { quickSale } from "@/lib/api";
import { isLoggedIn, logout } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    customer_id: "",
    total: "",
    paid: "",
    method: "cash",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await quickSale({
      customer_id: Number(form.customer_id),
      total: Number(form.total),
      paid: Number(form.paid),
      method: form.method,
    });

    setLoading(false);

    if (res.message) {
      alert(res.message);
      setForm({
        customer_id: "",
        total: "",
        paid: "",
        method: "cash",
      });
    } else {
      alert(res.error || "Sale failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>You are logged in 🎉</p>

      <button onClick={logout}>Logout</button>

      <hr style={{ margin: "30px 0" }} />

      <h2>Quick Sale</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Customer ID"
          value={form.customer_id}
          onChange={(e) =>
            setForm({ ...form, customer_id: e.target.value })
          }
        />
        <br /><br />

        <input
          placeholder="Total Amount"
          value={form.total}
          onChange={(e) =>
            setForm({ ...form, total: e.target.value })
          }
        />
        <br /><br />

        <input
          placeholder="Paid Amount"
          value={form.paid}
          onChange={(e) =>
            setForm({ ...form, paid: e.target.value })
          }
        />
        <br /><br />

        <select
          value={form.method}
          onChange={(e) =>
            setForm({ ...form, method: e.target.value })
          }
        >
          <option value="cash">Cash</option>
          <option value="transfer">Transfer</option>
          <option value="card">Card</option>
        </select>
        <br /><br />

        <button disabled={loading}>
          {loading ? "Processing..." : "Save Sale"}
        </button>
      </form>
    </div>
  );
}
