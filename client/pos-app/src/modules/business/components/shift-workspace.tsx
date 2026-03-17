import { tokens } from '../../../app/theme/tokens';
import { WorkspaceSection } from '../../../shared/ui/patterns/workspace-section';
import { useOperationalContext } from '../hooks/use-operational-context';
import { ShiftClosePanel } from './shift-close-panel';

export function ShiftWorkspace() {
  const { activeShift, activeCashRegister, activeBranch, activeBusiness } =
    useOperationalContext();

  return (
    <div
      style={{
        display: 'grid',
        gap: tokens.spacing.xl,
        maxWidth: 760
      }}
    >
      <WorkspaceSection
        title="Shift Management"
        subtitle="Monitor and close the active shift when operations are complete"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: tokens.spacing.md
          }}
        >
          <ShiftInfoCard
            label="Business"
            value={activeBusiness?.name ?? activeShift?.businessId ?? '-'}
          />
          <ShiftInfoCard
            label="Branch"
            value={activeBranch?.name ?? activeShift?.branchId ?? '-'}
          />
          <ShiftInfoCard
            label="Register"
            value={activeCashRegister?.name ?? activeShift?.cashRegisterId ?? '-'}
          />
          <ShiftInfoCard label="Shift" value={activeShift?.id ?? '-'} />
        </div>
      </WorkspaceSection>

      <ShiftClosePanel />
    </div>
  );
}

function ShiftInfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: tokens.spacing.md,
        background: tokens.colors.surface,
        border: `1px solid ${tokens.colors.border}`,
        borderRadius: tokens.radius.md
      }}
    >
      <div
        style={{
          fontSize: tokens.typography.caption,
          color: tokens.colors.textMuted
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: 4,
          fontWeight: 700,
          color: tokens.colors.text
        }}
      >
        {value}
      </div>
    </div>
  );
}