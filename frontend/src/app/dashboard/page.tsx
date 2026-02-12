"use client";

import { useEffect, useState } from "react";
import {
  quickSale,
  getSales,
  addCustomer,
  getCustomers,
  getDashboardSummary,
} from "@/lib/api";

export default function Dashboard() {
  const [summary, setSummary] = useState<any>({});
  const [customers, setCustomers] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [customerName, setCustomerName] = useState("");

  const [saleForm, setSaleForm] = useState({
    customer_id: "",
    total: "",
    paid: "",
    method: "cash",
  });

  async function loadData() {
    setSummary(await getDashboardSummary());
    setCustomers(await getCustomers());
    setSales(await getSales());
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleAddCustomer(e: any) {
    e.preventDefault();
    await addCustomer(customerName);
    setCustomerName("");
    loadData();
  }

  async function handleQuickSale(e: any) {
    e.preventDefault();
    await quickSale({
      ...saleForm,
      customer_id: Number(saleForm.customer_id),
      total: Number(saleForm.total),
      paid: Number(saleForm.paid),
    });
    loadData();
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      <h3>Summary</h3>
      <p>Total Sales: {summary.total_sales}</p>
      <p>Total Paid: {summary.total_paid}</p>
      <p>Total Debt: {summary.total_debt}</p>

      <hr />

      <h3>Add Customer</h3>
      <form onSubmit={handleAddCustomer}>
        <input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Customer Name"
        />
        <button>Add</button>
      </form>

      <hr />

      <h3>Quick Sale</h3>
      <form onSubmit={handleQuickSale}>
        <select
          value={saleForm.customer_id}
          onChange={(e) =>
            setSaleForm({ ...saleForm, customer_id: e.target.value })
          }
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Total"
          value={saleForm.total}
          onChange={(e) =>
            setSaleForm({ ...saleForm, total: e.target.value })
          }
        />

        <input
          placeholder="Paid"
          value={saleForm.paid}
          onChange={(e) =>
            setSaleForm({ ...saleForm, paid: e.target.value })
          }
        />

        <button>Save</button>
      </form>

      <hr />

      <h3>Sales History</h3>
      <ul>
        {sales.map((s) => (
          <li key={s.id}>
            {s.customer_name} - {s.total} ({s.paid} paid)
          </li>
        ))}
      </ul>
    </div>
  );
}
