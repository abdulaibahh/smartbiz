const API_URL = process.env.NEXT_PUBLIC_API_URL;

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

/* SALES */

export async function quickSale(data: any) {
  const res = await fetch(`${API_URL}/api/sales/quick-sale`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getSales() {
  const res = await fetch(`${API_URL}/api/sales`, {
    headers: authHeaders(),
  });
  return res.json();
}

/* CUSTOMERS */

export async function addCustomer(name: string) {
  const res = await fetch(`${API_URL}/api/customers`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ name }),
  });
  return res.json();
}

export async function getCustomers() {
  const res = await fetch(`${API_URL}/api/customers`, {
    headers: authHeaders(),
  });
  return res.json();
}

/* DASHBOARD */

export async function getDashboardSummary() {
  const res = await fetch(`${API_URL}/api/dashboard/summary`, {
    headers: authHeaders(),
  });
  return res.json();
}
