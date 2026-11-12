import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('admin@lakshmipriya.com');
    setPassword('PriyaAdmin2026!');
  };

  return (
    <section className="bg-[#F0E9DC] min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-[#FAF7F0] border border-[#DED8CD] p-8 sm:p-10 space-y-6">
        <div className="space-y-2 border-b border-[#DED8CD] pb-5">
          <p className="kicker">Educator Desk</p>
          <h1 className="font-serif text-3xl text-[#2A302D]">
            Teacher &amp; Admin Portal
          </h1>
          <p className="text-xs text-[#59625B] leading-relaxed">
            Administrative desk for managing seminar inquiries, curricula, and presentation decks.
          </p>
        </div>

        {error && (
          <p className="p-3 bg-[#F9F4EB] border border-[#9D5A41] text-xs font-semibold text-[#9D5A41]">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-field-label">Teacher Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@lakshmipriya.com"
              className="form-control-input"
            />
          </div>

          <div>
            <label className="form-field-label">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="form-control-input"
            />
          </div>

          <button type="submit" disabled={loading} className="solid-btn w-full">
            {loading ? 'Authenticating...' : 'Unlock admin desk'} <span>&#8599;</span>
          </button>
        </form>

        <div className="pt-3 border-t border-[#DED8CD] text-center">
          <button
            type="button"
            onClick={handleDemoFill}
            className="text-xs font-semibold text-[#9D5A41] hover:text-[#2A302D] underline underline-offset-4 cursor-pointer"
          >
            Auto-fill Admin Credentials
          </button>
        </div>
      </div>
    </section>
  );
};
