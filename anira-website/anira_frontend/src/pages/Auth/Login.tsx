import { useState } from 'react';
import { useLogin } from '@/api/auth';

export function Login({ onSwitchToRegister, onSuccess }: { onSwitchToRegister: () => void, onSuccess: () => void }) {
  const [email, setEmail] = useState('priya@example.com');
  const [password, setPassword] = useState('password123');
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password }, {
      onSuccess: () => {
        onSuccess();
      }
    });
  };

  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-primary-500/10 bg-background-100 p-8 shadow-sm mt-12">
      <h2 className="font-heading text-2xl font-semibold text-foreground-900 mb-6 text-center">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block font-body text-xs uppercase tracking-wide text-foreground-500">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-xl border border-primary-500/15 bg-background-50 px-4 py-3 font-body text-sm text-foreground-900 outline-none focus:border-primary-500"
            required
          />
        </div>
        <div>
          <label className="mb-1 block font-body text-xs uppercase tracking-wide text-foreground-500">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-xl border border-primary-500/15 bg-background-50 px-4 py-3 font-body text-sm text-foreground-900 outline-none focus:border-primary-500"
            required
          />
        </div>
        {loginMutation.isError && <p className="text-red-500 text-sm font-body">Invalid email or password.</p>}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full rounded-full bg-primary-500 px-4 py-3 font-body text-sm font-medium text-background-50 disabled:opacity-50"
        >
          {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p className="mt-6 text-center font-body text-sm text-foreground-500">
        Don't have an account?{' '}
        <button type="button" onClick={onSwitchToRegister} className="text-primary-500 font-medium">
          Register
        </button>
      </p>
    </div>
  );
}
