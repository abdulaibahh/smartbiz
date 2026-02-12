const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function signup(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return res.json();
}

export async function login(data: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return res.json();
}
