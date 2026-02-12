"use client";

import { useState } from "react";
import { signup } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signup(form);

    if (res.token) {
      localStorage.setItem("token", res.token);
      router.push("/dashboard");
    } else {
      alert(res.message || "Signup failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        /><br /><br />

        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        /><br /><br />

        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        /><br /><br />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
