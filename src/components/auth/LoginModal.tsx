import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Mail, Lock, ArrowRight } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string) => void;
  onSwitchToSignUp: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onSwitchToSignUp
}) => {
  const [email, setEmail] = useState('noura@wellness.app');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess('Noura');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Welcome Back" maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-xs font-semibold text-slate-500">Log in to your private wellness journal</p>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-extrabold text-sm rounded-2xl shadow-soft hover:brightness-105 transition flex items-center justify-center gap-2 mt-2"
        >
          <span>Log In</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-xs text-center text-slate-500 pt-2 font-medium">
          Don't have an account?{' '}
          <button type="button" onClick={onSwitchToSignUp} className="text-pink-600 font-bold hover:underline">
            Sign up
          </button>
        </p>
      </form>
    </Modal>
  );
};
