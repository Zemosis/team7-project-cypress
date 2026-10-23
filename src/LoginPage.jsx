import { useState } from 'react'
import { login } from './auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState('idle') // idle | loading | error | success
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    const result = await login(email, password)

    setStatus(result.ok ? 'success' : 'error')
    setMessage(result.message)
  }

  return (
    <main className="page">
      <form className="card" onSubmit={handleSubmit} data-cy="login-form" noValidate>
        <header className="card-header">
          <h1 data-cy="login-heading">Sign in</h1>
          <p className="subtitle">SWE 437 &middot; Team 7 Cypress demo</p>
        </header>

        <label className="field" htmlFor="email">
          <span>Email</span>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="student@gmu.edu"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            data-cy="email-input"
          />
        </label>

        <label className="field" htmlFor="password">
          <span>Password</span>
          <div className="password-row">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              data-cy="password-input"
            />
            <button
              type="button"
              className="toggle"
              onClick={() => setShowPassword((visible) => !visible)}
              data-cy="toggle-password"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>

        <button
          type="submit"
          className="submit"
          disabled={status === 'loading'}
          data-cy="login-button"
        >
          {status === 'loading' ? 'Signing in...' : 'Log in'}
        </button>

        {status === 'loading' && (
          <p className="message loading" data-cy="loading-message" role="status">
            Checking your credentials...
          </p>
        )}

        {status === 'error' && (
          <p className="message error" data-cy="error-message" role="alert">
            {message}
          </p>
        )}

        {status === 'success' && (
          <p className="message success" data-cy="success-message" role="status">
            {message}
          </p>
        )}

        <footer className="hint" data-cy="demo-hint">
          Demo account: <code>student@gmu.edu</code> / <code>cypress123</code>
        </footer>
      </form>
    </main>
  )
}
