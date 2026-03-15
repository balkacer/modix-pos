import { useCatalogStore } from '../store/catalog.store';
import { AppButton } from '../../../shared/ui/primitives/app-button';
import { AppInput } from '../../../shared/ui/primitives/app-input';

export function CatalogSearchBar() {
  const searchTerm = useCatalogStore((state) => state.searchTerm);
  const setSearchTerm = useCatalogStore((state) => state.setSearchTerm);
  const clearSearchTerm = useCatalogStore((state) => state.clearSearchTerm);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 12,
        marginBottom: 16
      }}
    >
      <AppInput
        id="catalogSearch"
        label="Search products"
        placeholder="Search by name or code"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <div style={{ display: 'flex', alignItems: 'end' }}>
        <AppButton type="button" variant="secondary" onClick={clearSearchTerm}>
          Clear
        </AppButton>
      </div>
    </div>
  );
}
