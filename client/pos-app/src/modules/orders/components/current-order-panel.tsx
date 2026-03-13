import { useMemo } from 'react';
import { useOrderStore } from '../store/order.store';

export function CurrentOrderPanel() {
  const items = useOrderStore((state) => state.items);
  const removeProduct = useOrderStore((state) => state.removeProduct);
  const clearOrder = useOrderStore((state) => state.clearOrder);

  const total = useMemo(
    () => items.reduce((accumulator, item) => accumulator + item.subtotal, 0),
    [items]
  );

  return (
    <section style={{ marginTop: 24 }}>
      <h2>Current Order</h2>

      {items.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div
          style={{
            padding: 16,
            border: '1px solid #ddd',
            borderRadius: 14,
            background: '#fff'
          }}
        >
          <div style={{ display: 'grid', gap: 12 }}>
            {items.map((item) => (
              <div
                key={item.productId}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 12,
                  borderBottom: '1px solid #eee',
                  paddingBottom: 10
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>{item.productName}</div>
                  <div style={{ color: '#666' }}>
                    {item.quantity} x RD$ {item.unitPrice.toFixed(2)}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <strong>RD$ {item.subtotal.toFixed(2)}</strong>

                  <button
                    type="button"
                    onClick={() => removeProduct(item.productId)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 10,
                      border: '1px solid #ddd',
                      background: '#fff'
                    }}
                  >
                    -1
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
            <strong>Total</strong>
            <strong>RD$ {total.toFixed(2)}</strong>
          </div>

          <button
            type="button"
            onClick={clearOrder}
            style={{
              marginTop: 16,
              padding: '10px 14px',
              borderRadius: 10,
              border: '1px solid #ddd',
              background: '#fff'
            }}
          >
            Clear order
          </button>
        </div>
      )}
    </section>
  );
}