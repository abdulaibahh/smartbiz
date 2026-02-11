'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e: any) => {
    e.preventDefault()
    setError('')

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }
    )

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Login failed')
      return
    }

    localStorage.setItem('token', data.token)
    router.push('/dashboard')
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={submit} className="space-y-3">
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="bg-black text-white px-4 py-2 w-full">Login</button>
      </form>
    </div>
  )
}
