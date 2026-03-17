import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tokens } from '../../../app/theme/tokens';
import { AppButton } from '../../../shared/ui/primitives/app-button';
import { EmptyState } from '../../../shared/ui/primitives/empty-state';
import { WorkspaceSection } from '../../../shared/ui/patterns/workspace-section';
import { useOrderStore } from '../../orders/store/order.store';
import { useSalesStore } from '../../sales/store/sales.store';
import { getCategories } from '../api/get-categories';
import { getProductsByCategoryId } from '../api/get-products-by-category-id';
import { getProducts } from '../api/get-products';
import { useCatalogStore } from '../store/catalog.store';
import { CatalogSearchBar } from './catalog-search-bar';
import { ProductCard } from './product-card';

export function CatalogPanel() {
  const addProduct = useOrderStore((state) => state.addProduct);
  const searchTerm = useCatalogStore((state) => state.searchTerm);

  const activeOrder = useSalesStore((state) => state.activeOrder);
  const editingDraftOrderId = useSalesStore((state) => state.editingDraftOrderId);
  const canEditCatalog = !activeOrder || Boolean(editingDraftOrderId);

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

  const filteredProducts = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) {
      return productsQuery.data ?? [];
    }

    return (productsQuery.data ?? []).filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(normalizedSearchTerm);
      const codeMatch = product.code.toLowerCase().includes(normalizedSearchTerm);

      return nameMatch || codeMatch;
    });
  }, [productsQuery.data, searchTerm]);

  return (
    <div style={{ height: '100%', minHeight: 0 }}>
      <WorkspaceSection
        title="Catalog"
        subtitle="Tap products to add them quickly to the active ticket"
        rightSlot={
          !canEditCatalog ? (
            <span
              style={{
                padding: '6px 10px',
                borderRadius: tokens.radius.pill,
                background: tokens.colors.warningBg,
                color: tokens.colors.warningText,
                fontSize: tokens.typography.caption,
                fontWeight: 800
              }}
            >
              Order locked
            </span>
          ) : null
        }
      >
        <div
          style={{
            display: 'flex',
            gap: tokens.spacing.lg,
            flexDirection: 'column',
            minHeight: 0,
            height: '100%'
          }}
        >
          <CatalogSearchBar />

          <div
            style={{
              display: 'flex',
              gap: tokens.spacing.sm,
              flexWrap: 'wrap',
              padding: tokens.spacing.sm,
              borderRadius: tokens.radius.md,
              background: tokens.colors.surfaceAlt,
              border: `1px solid ${tokens.colors.border}`,
              maxHeight: 'content'
            }}
          >
            <AppButton
              type="button"
              variant={selectedCategoryId === '' ? 'primary' : 'secondary'}
              onClick={() => setSelectedCategoryId('')}
              style={{ height: 45 }}
            >
              All
            </AppButton>

            {categoriesQuery.data?.map((category) => (
              <AppButton
                key={category.id}
                type="button"
                variant={selectedCategoryId === category.id ? 'primary' : 'secondary'}
                onClick={() => setSelectedCategoryId(category.id)}
                style={{ height: 45 }}
              >
                {category.name}
              </AppButton>
            ))}
          </div>

          {productsQuery.isPending ? <p>Loading products...</p> : null}

          {productsQuery.isError ? (
            <EmptyState
              title="Could not load products"
              description="Please try again or verify the API connection."
            />
          ) : null}

          {!productsQuery.isPending &&
          !productsQuery.isError &&
          filteredProducts.length === 0 ? (
            <EmptyState
              title="No matching products"
              description="Try another category or adjust the search term."
            />
          ) : null}

          <div
            style={{
              minHeight: 0,
              overflowY: 'auto',
              paddingRight: 4
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: tokens.spacing.md
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  disabled={!canEditCatalog}
                  onClick={() => {
                    if (canEditCatalog) {
                      addProduct(product);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </WorkspaceSection>
    </div>
  );
}
