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
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
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
        {loginMutation.isError && <p className="text-red-500 text-sm font-body">Invalid email or password.</p>}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="mt-2 w-full rounded-full bg-primary-500 px-4 py-3.5 font-body text-sm font-medium text-background-50 transition-colors hover:bg-primary-600 disabled:opacity-50"
        >
          {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p className="mt-8 text-center font-body text-sm text-foreground-500 lg:text-left">
        Don't have an account?{' '}
        <button type="button" onClick={onSwitchToRegister} className="text-primary-500 font-medium hover:underline">
          Register now
        </button>
      </p>
    </div>
  );
}
