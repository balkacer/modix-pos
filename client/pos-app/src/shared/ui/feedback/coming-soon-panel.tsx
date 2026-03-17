import { AppCard } from '../primitives/app-card';
import { EmptyState } from '../primitives/empty-state';

interface ComingSoonPanelProps {
  title: string;
  description: string;
}

export function ComingSoonPanel({ title, description }: ComingSoonPanelProps) {
  return (
    <AppCard title={title} subtitle="This section is planned for a next iteration">
      <EmptyState title="Coming soon" description={description} />
    </AppCard>
  );
}