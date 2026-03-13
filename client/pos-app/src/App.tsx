import { useQuery } from '@tanstack/react-query';
import { LoginForm } from './modules/auth/components/login-form';
import { useAuthStore } from './modules/auth/store/auth.store';
import { getHealth } from './modules/health/api/get-health';
import { ShiftOpenForm } from './modules/business/components/shift-open-form';
import { CatalogPanel } from './modules/catalog/components/catalog-panel';
import { CurrentOrderPanel } from './modules/orders/components/current-order-panel';
import { useShiftStore } from './modules/business/store/shift.store';

export function App() {
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const activeShift = useShiftStore((state) => state.activeShift);

  const healthQuery = useQuery({
    queryKey: ['gateway-health'],
    queryFn: getHealth
  });

  console.log('App rendered');
  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '32px',
        fontFamily: 'Arial, sans-serif',
        background: '#f7f7f7',
        color: '#1f1f1f'
      }}
    >
      <section
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          background: '#ffffff',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
        }}
      >
        <h1 style={{ marginTop: 0 }}>MODIX POS · Frekao</h1>
        <p>Bootstrap inicial del POS app conectado al API Gateway.</p>

        <div style={{ marginBottom: '24px' }}>
          <h2>Gateway Health</h2>

          {healthQuery.isPending ? <p>Checking gateway...</p> : null}

          {healthQuery.isError ? (
            <p style={{ color: 'crimson' }}>Could not reach API Gateway.</p>
          ) : null}

          {healthQuery.data ? (
            <div>
              <p>
                <strong>Status:</strong> {healthQuery.data.data.status}
              </p>
              <p>
                <strong>Service:</strong> {healthQuery.data.data.service}
              </p>
              <p style={{ color: 'green' }}>Connection OK</p>
            </div>
          ) : null}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h2>Login</h2>
          <LoginForm />
        </div>

        <div>
          <h2>Session</h2>

          {user ? (
            <div
              style={{
                padding: '16px',
                border: '1px solid #ddd',
                borderRadius: '12px',
                background: '#fafafa'
              }}
            >
              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>Name:</strong> {user.firstName} {user.lastName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>

              <button onClick={clearSession} style={{ marginTop: '12px', padding: '10px' }}>
                Logout
              </button>
            </div>
          ) : (
            <p>No active session yet.</p>
          )}
        </div>

        {user ? <ShiftOpenForm /> : null}
        {user && activeShift ? <CatalogPanel /> : null}
        {user && activeShift ? <CurrentOrderPanel /> : null}
      </section>
    </main>
  );
}