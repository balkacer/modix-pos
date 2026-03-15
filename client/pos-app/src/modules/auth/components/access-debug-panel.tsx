import { useAuthStore } from '../store/auth.store';
import { AppCard } from '../../../shared/ui/primitives/app-card';

export function AccessDebugPanel() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <AppCard title="Access Debug" subtitle="Current role and permissions for testing">
      <div style={{ display: 'grid', gap: 8 }}>
        <div>
          <strong>Role:</strong> {user.role}
        </div>

        <div>
          <strong>Permissions:</strong>
          <ul style={{ marginTop: 8 }}>
            {user.permissions.map((permission) => (
              <li key={permission}>{permission}</li>
            ))}
          </ul>
        </div>
      </div>
    </AppCard>
  );
}
