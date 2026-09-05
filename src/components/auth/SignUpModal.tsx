import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpSuccess: (name: string) => void;
  onSwitchToLogin: () => void;
}

export const SignUpModal: React.FC<SignUpModalProps> = ({
  isOpen,
  onClose,
  onSignUpSuccess,
  onSwitchToLogin
}) => {
  const [name, setName] = useState('Noura');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUpSuccess(name || 'Noura');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Account" maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-xs font-semibold text-slate-500">Start your personal wellness journey</p>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Your Name</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              placeholder="Noura"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              placeholder="noura@wellness.app"
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white font-extrabold text-sm rounded-2xl shadow-soft hover:brightness-105 transition flex items-center justify-center gap-2 mt-2"
        >
          <span>Continue to Onboarding</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-xs text-center text-slate-500 pt-2 font-medium">
          Already have an account?{' '}
          <button type="button" onClick={onSwitchToLogin} className="text-pink-600 font-bold hover:underline">
            Log in
          </button>
        </p>
      </form>
    </Modal>
  );
};
