import { ConsumptionType } from '@modix/pkgs/contracts';
import { useOrderMetaStore } from '../store/order-meta.store';
import { useSalesStore } from '../../sales/store/sales.store';
import { AppCard } from '../../../shared/ui/primitives/app-card';
import { AppSelect } from '../../../shared/ui/primitives/app-select';

export function OrderContextPanel() {
  const consumptionType = useOrderMetaStore((state) => state.consumptionType);
  const setConsumptionType = useOrderMetaStore((state) => state.setConsumptionType);
  const activeOrder = useSalesStore((state) => state.activeOrder);

  return (
    <AppCard title="Order Context" subtitle="Set how this order will be fulfilled">
      <AppSelect
        id="consumptionType"
        label="Consumption type"
        value={consumptionType}
        onChange={(event) => setConsumptionType(event.target.value as ConsumptionType)}
        disabled={Boolean(activeOrder)}
      >
        <option value={ConsumptionType.PICKUP}>Pickup</option>
        <option value={ConsumptionType.TAKEAWAY}>Takeaway</option>
        <option value={ConsumptionType.DINE_IN}>Dine in</option>
        <option value={ConsumptionType.DELIVERY}>Delivery</option>
      </AppSelect>
    </AppCard>
  );
}
