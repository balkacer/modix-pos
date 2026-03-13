import { SubmitEvent, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/login';
import { useAuthStore } from '../store/auth.store';
import axios from 'axios';

export function LoginForm() {
  const setSession = useAuthStore((state) => state.setSession);

  const [email, setEmail] = useState('admin@frekao.com');
  const [password, setPassword] = useState('Password123');

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setSession(data);
    }
  });

  const errorMessage = useMemo(() => {
    const message =
      axios.isAxiosError(loginMutation.error) &&
        typeof loginMutation.error.response?.data?.message === 'string'
        ? loginMutation.error.response.data.message
        : 'Login failed';

    return message;
  }, [loginMutation.error]);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();

    loginMutation.mutate({
      email,
      password
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        maxWidth: '360px'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          style={{ padding: '10px' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          style={{ padding: '10px' }}
        />
      </div>

      <button type="submit" disabled={loginMutation.isPending} style={{ padding: '10px' }}>
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>

      {loginMutation.isError ? (
        <div style={{ color: 'crimson' }}>
          {errorMessage}
        </div>
      ) : null}

      {loginMutation.isSuccess ? (
        <div style={{ color: 'green' }}>Login successful</div>
      ) : null}
    </form>
  );
}