import { OrderStatus } from '@modix/pkgs/contracts';
import { tokens } from '../../../app/theme/tokens';
import { AppButton } from '../../../shared/ui/primitives/app-button';
import { AppInput } from '../../../shared/ui/primitives/app-input';
import { useOrdersWorkspaceStore } from '../store/orders-workspace.store';

const statusOptions: Array<{ label: string; value: OrderStatus | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'Draft', value: OrderStatus.DRAFT },
  { label: 'Pending Payment', value: OrderStatus.PENDING_PAYMENT },
  { label: 'Paid', value: OrderStatus.PAID },
  { label: 'Packing', value: OrderStatus.PACKING },
  { label: 'Ready', value: OrderStatus.READY },
  { label: 'Delivered', value: OrderStatus.DELIVERED },
  { label: 'Cancelled', value: OrderStatus.CANCELLED },
  { label: 'Rejected', value: OrderStatus.REJECTED }
];

export function OrdersFiltersBar() {
  const searchTerm = useOrdersWorkspaceStore((state) => state.searchTerm);
  const selectedStatus = useOrdersWorkspaceStore((state) => state.selectedStatus);
  const onlyCurrentShift = useOrdersWorkspaceStore((state) => state.onlyCurrentShift);
  const setSearchTerm = useOrdersWorkspaceStore((state) => state.setSearchTerm);
  const setSelectedStatus = useOrdersWorkspaceStore((state) => state.setSelectedStatus);
  const setOnlyCurrentShift = useOrdersWorkspaceStore(
    (state) => state.setOnlyCurrentShift
  );
  const clearFilters = useOrdersWorkspaceStore((state) => state.clearFilters);

  return (
    <div
      style={{
        display: 'grid',
        gap: tokens.spacing.md
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(240px, 360px) auto auto',
          gap: tokens.spacing.md,
          alignItems: 'end'
        }}
      >
        <AppInput
          id="ordersSearch"
          label="Search orders"
          placeholder="Search by order number"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingBottom: 10,
            color: tokens.colors.text
          }}
        >
          <input
            type="checkbox"
            checked={onlyCurrentShift}
            onChange={(event) => setOnlyCurrentShift(event.target.checked)}
          />
          Current shift only
        </label>

        <div>
          <AppButton type="button" variant="secondary" onClick={clearFilters}>
            Clear filters
          </AppButton>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: tokens.spacing.sm,
          flexWrap: 'wrap'
        }}
      >
        {statusOptions.map((option) => (
          <AppButton
            key={option.value}
            type="button"
            variant={selectedStatus === option.value ? 'primary' : 'secondary'}
            onClick={() => setSelectedStatus(option.value)}
          >
            {option.label}
          </AppButton>
        ))}
      </div>
    </div>
  );
}
