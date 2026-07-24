import { useState } from 'react';
import { useRegister } from '@/api/auth';

export function Register({ onSwitchToLogin, onSuccess }: { onSwitchToLogin: () => void, onSuccess: () => void }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const registerMutation = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ fullName, email, password }, {
      onSuccess: () => {
        onSuccess();
      }
    });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1.5 block font-body text-xs uppercase tracking-wide text-foreground-500">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="w-full rounded-xl border border-primary-500/15 bg-white px-4 py-3.5 font-body text-sm text-foreground-900 outline-none transition-colors focus:border-primary-500"
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block font-body text-xs uppercase tracking-wide text-foreground-500">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-xl border border-primary-500/15 bg-white px-4 py-3.5 font-body text-sm text-foreground-900 outline-none transition-colors focus:border-primary-500"
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block font-body text-xs uppercase tracking-wide text-foreground-500">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-xl border border-primary-500/15 bg-white px-4 py-3.5 font-body text-sm text-foreground-900 outline-none transition-colors focus:border-primary-500"
            required
          />
        </div>
        {registerMutation.isError && <p className="text-red-500 text-sm font-body">Error creating account.</p>}
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="mt-2 w-full rounded-full bg-primary-500 px-4 py-3.5 font-body text-sm font-medium text-background-50 transition-colors hover:bg-primary-600 disabled:opacity-50"
        >
          {registerMutation.isPending ? 'Creating...' : 'Create Account'}
        </button>
      </form>
      <p className="mt-8 text-center font-body text-sm text-foreground-500 lg:text-left">
        Already have an account?{' '}
        <button type="button" onClick={onSwitchToLogin} className="text-primary-500 font-medium hover:underline">
          Sign In
        </button>
      </p>
    </div>
  );
}
