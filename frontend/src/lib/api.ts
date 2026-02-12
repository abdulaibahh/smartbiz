const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* ---------------- AUTH ---------------- */

export async function signup(data: {
  name: string;
  email: string;
  password: string;
  business: string;
}) {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function login(data: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

/* ---------------- SALES ---------------- */

export async function quickSale(data: {
  customer_id: number;
  total: number;
  paid: number;
  method: string;
}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/sales/quick-sale`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
