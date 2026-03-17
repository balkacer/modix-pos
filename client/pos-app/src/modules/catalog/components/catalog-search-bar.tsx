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
        position: 'relative',
      }}
    >
      <AppInput
        id="catalogSearch"
        label="Search products"
        placeholder="Search by name or code"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', right: 0, top: 24.75, height: 40, paddingRight: 10 }}>
        <AppButton type="button" variant="secondary" onClick={clearSearchTerm} style={{ width: 23, height: 23, padding: 0 }}>
          <span>&#10005;</span>
        </AppButton>
      </div>
    </div>
  );
}
