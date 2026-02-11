'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    business: ''
  })
  const [error, setError] = useState('')

  const submit = async (e: any) => {
    e.preventDefault()
    setError('')

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      }
    )

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Signup failed')
      return
    }

    localStorage.setItem('token', data.token)
    router.push('/dashboard')
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={submit} className="space-y-3">
        <input placeholder="Full name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Business name" onChange={e => setForm({ ...form, business: e.target.value })} />
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="bg-black text-white px-4 py-2 w-full">Sign up</button>
      </form>
    </div>
  )
}
