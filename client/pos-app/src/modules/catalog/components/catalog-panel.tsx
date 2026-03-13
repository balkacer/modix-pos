import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/get-categories';
import { getProducts } from '../api/get-products';
import { getProductsByCategoryId } from '../api/get-products-by-category-id';
import { useOrderStore } from '../../orders/store/order.store';

export function CatalogPanel() {
  const addProduct = useOrderStore((state) => state.addProduct);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const categoriesQuery = useQuery({
    queryKey: ['catalog-categories'],
    queryFn: getCategories
  });

  const productsQuery = useQuery({
    queryKey: ['catalog-products', selectedCategoryId],
    queryFn: () =>
      selectedCategoryId ? getProductsByCategoryId(selectedCategoryId) : getProducts(true)
  });

  return (
    <section style={{ marginTop: 24 }}>
      <h2>Catalog</h2>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => setSelectedCategoryId('')}
          style={{
            padding: '10px 14px',
            borderRadius: 10,
            border: '1px solid #ddd',
            background: selectedCategoryId === '' ? '#111' : '#fff',
            color: selectedCategoryId === '' ? '#fff' : '#111'
          }}
        >
          All
        </button>

        {categoriesQuery.data?.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setSelectedCategoryId(category.id)}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              border: '1px solid #ddd',
              background: selectedCategoryId === category.id ? '#111' : '#fff',
              color: selectedCategoryId === category.id ? '#fff' : '#111'
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {productsQuery.isPending ? <p>Loading products...</p> : null}
      {productsQuery.isError ? <p style={{ color: 'crimson' }}>Could not load products.</p> : null}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 12
        }}
      >
        {productsQuery.data?.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => addProduct(product)}
            style={{
              textAlign: 'left',
              padding: 16,
              borderRadius: 14,
              border: '1px solid #ddd',
              background: '#fff',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontWeight: 700 }}>{product.name}</div>
            <div style={{ marginTop: 6, color: '#555' }}>{product.code}</div>
            <div style={{ marginTop: 10, color: '#0a7a2f', fontWeight: 700 }}>
              RD$ {product.price.toFixed(2)}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}