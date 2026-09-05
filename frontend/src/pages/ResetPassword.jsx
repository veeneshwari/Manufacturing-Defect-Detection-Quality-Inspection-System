import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Api } from '../api';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await Api.resetPassword({ token, new_password: newPassword });
      setMessage(res.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="auth-shell">
        <div className="auth-card">
          <div className="alert-error">Invalid or missing reset link.</div>
          <p style={{ textAlign: 'center', marginTop: 20 }}>
            <Link className="link-teal" to="/forgot-password">Request a new link</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1 className="font-display" style={{ fontSize: 22, margin: '0 0 4px' }}>
          Set a new password
        </h1>
        {error && <div className="alert-error">{error}</div>}
        {message && <div className="alert-success">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 22 }}>
            <label className="field-label">New Password</label>
            <input
              className="field-input"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Resetting…' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
