import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/get-categories';
import { getProducts } from '../api/get-products';
import { getProductsByCategoryId } from '../api/get-products-by-category-id';
import { useCatalogStore } from '../store/catalog.store';
import { useOrderStore } from '../../orders/store/order.store';
import { AppButton } from '../../../shared/ui/primitives/app-button';
import { AppCard } from '../../../shared/ui/primitives/app-card';
import { EmptyState } from '../../../shared/ui/primitives/empty-state';
import { CatalogSearchBar } from './catalog-search-bar';
import { useSalesStore } from '../../sales/store/sales.store';

export function CatalogPanel() {
    const addProduct = useOrderStore((state) => state.addProduct);
    const searchTerm = useCatalogStore((state) => state.searchTerm);
    const activeOrder = useSalesStore((state) => state.activeOrder);
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
        <AppCard title="Catalog" subtitle="Tap a product to add it to the current order">
            <CatalogSearchBar />

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                <AppButton
                    type="button"
                    variant={selectedCategoryId === '' ? 'primary' : 'secondary'}
                    onClick={() => setSelectedCategoryId('')}
                >
                    All
                </AppButton>

                {categoriesQuery.data?.map((category) => (
                    <AppButton
                        key={category.id}
                        type="button"
                        variant={selectedCategoryId === category.id ? 'primary' : 'secondary'}
                        onClick={() => setSelectedCategoryId(category.id)}
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
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
                    gap: 12
                }}
            >
                {filteredProducts.map((product) => (
                    <button
                        key={product.id}
                        type="button"
                        disabled={Boolean(activeOrder)}
                        onClick={() => {
                            if (!activeOrder) {
                                addProduct(product);
                            }
                        }}
                        style={{
                            textAlign: 'left',
                            padding: 16,
                            borderRadius: 16,
                            border: '1px solid #e5e7eb',
                            background: '#fff',
                            cursor: activeOrder ? 'not-allowed' : 'pointer',
                            minHeight: 120,
                            opacity: activeOrder ? 0.6 : 1,
                        }}
                    >
                        <div style={{ fontWeight: 700, fontSize: 16 }}>{product.name}</div>
                        <div style={{ marginTop: 6, color: '#6b7280', fontSize: 13 }}>{product.code}</div>
                        <div style={{ marginTop: 12, color: '#166534', fontWeight: 700 }}>
                            RD$ {product.price.toFixed(2)}
                        </div>
                    </button>
                ))}
            </div>
        </AppCard>
    );
}