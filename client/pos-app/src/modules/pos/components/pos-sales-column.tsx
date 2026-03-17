import { CurrentOrderPanel } from '../../orders/components/current-order-panel';

export function PosSalesColumn() {
  return (
    <div
      style={{
        height: '100%',
        minHeight: 0
      }}
    >
      <CurrentOrderPanel />
    </div>
  );
}