"use client";

import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Not tested");

  const testBackend = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}`
      );
      const data = await res.text();
      setStatus("Backend Connected ✅");
    } catch (err) {
      setStatus("Backend Not Reachable ❌");
    }
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>SmartBiz-SL</h1>
      <p>Business Tracking System</p>

      <button onClick={testBackend}>
        Test Backend Connection
      </button>

      <p>Status: {status}</p>
    </main>
  );
}
