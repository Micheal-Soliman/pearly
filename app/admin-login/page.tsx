'use client';

import { FormEvent, useState } from 'react';
import { LockKeyhole } from 'lucide-react';
import './login.css';

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    const data = new FormData(event.currentTarget);
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: data.get('password') }),
    });
    if (response.ok) window.location.assign('/admin');
    else {
      const result = await response.json();
      setError(result.error || 'Could not sign in.');
      setLoading(false);
    }
  }

  return <main className="admin-login"><form onSubmit={submit}>
    <div className="login-icon"><LockKeyhole size={24}/></div>
    <div className="login-wordmark">Pearly</div>
    <h1>Admin dashboard</h1>
    <p>Enter your dashboard password to continue.</p>
    <label><span>Password</span><input autoFocus required name="password" type="password" autoComplete="current-password" /></label>
    {error ? <div className="login-error" role="alert">{error}</div> : null}
    <button disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
  </form></main>;
}
