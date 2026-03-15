import { AppCard } from '../primitives/app-card';
import { EmptyState } from '../primitives/empty-state';

interface AccessDeniedProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export function AccessDenied({
  title,
  subtitle = 'Access restricted',
  description = 'Your current role does not allow this action.'
}: AccessDeniedProps) {
  return (
    <AppCard title={title} subtitle={subtitle}>
      <EmptyState title="No permission" description={description} />
    </AppCard>
  );
}
