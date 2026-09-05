import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Api } from '../api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const res = await Api.forgotPassword({ email: email.trim() });
      setMessage(res.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div className="logo-mark">V</div>
          <div>
            <div className="font-display" style={{ fontSize: 16, fontWeight: 700 }}>
              VisionInspect AI
            </div>
          </div>
        </div>
        <h1 className="font-display" style={{ fontSize: 22, margin: '0 0 4px' }}>
          Forgot your password?
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 13.5, margin: '0 0 24px' }}>
          Enter your email and we'll send you a reset link.
        </p>
        {error && <div className="alert-error">{error}</div>}
        {message && <div className="alert-success">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 22 }}>
            <label className="field-label">Email Address</label>
            <input
              className="field-input"
              type="email"
              placeholder="you@plant.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span> Sending…
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', marginTop: 20 }}>
          <Link className="link-teal" to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
