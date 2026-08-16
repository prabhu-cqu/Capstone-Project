function ProductFilterPanel({
  filters,
  categories,
  brands,
  onFilterChange,
  onClearFilters,
}) {
  function updateFilter(name, value) {
    onFilterChange({
      ...filters,
      [name]: value,
    });
  }

  return (
    <aside className="filter-panel" aria-label="Product filters">
      <div className="filter-panel__heading">
        <h2>Filter products</h2>

        <button
          type="button"
          className="filter-panel__clear"
          onClick={onClearFilters}
        >
          Clear filters
        </button>
      </div>

      <div className="filter-field">
        <label htmlFor="product-search">Search</label>
        <input
          id="product-search"
          type="search"
          value={filters.searchText}
          placeholder="Search products"
          maxLength="100"
          onChange={(event) =>
            updateFilter("searchText", event.target.value)
          }
        />
      </div>

      <div className="filter-field">
        <label htmlFor="category-filter">Category</label>
        <select
          id="category-filter"
          value={filters.category}
          onChange={(event) =>
            updateFilter("category", event.target.value)
          }
        >
          <option value="">All categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="brand-filter">Brand</label>
        <select
          id="brand-filter"
          value={filters.brand}
          onChange={(event) => updateFilter("brand", event.target.value)}
        >
          <option value="">All brands</option>

          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="minimum-price">Minimum price</label>
        <input
          id="minimum-price"
          type="number"
          min="0"
          step="0.01"
          value={filters.minimumPrice}
          placeholder="0.00"
          onChange={(event) =>
            updateFilter("minimumPrice", event.target.value)
          }
        />
      </div>

      <div className="filter-field">
        <label htmlFor="maximum-price">Maximum price</label>
        <input
          id="maximum-price"
          type="number"
          min="0"
          step="0.01"
          value={filters.maximumPrice}
          placeholder="No maximum"
          onChange={(event) =>
            updateFilter("maximumPrice", event.target.value)
          }
        />
      </div>

      <div className="filter-field">
        <label htmlFor="sort-products">Sort products</label>
        <select
          id="sort-products"
          value={filters.sortOption}
          onChange={(event) =>
            updateFilter("sortOption", event.target.value)
          }
        >
          <option value="name-ascending">Name: A to Z</option>
          <option value="name-descending">Name: Z to A</option>
          <option value="price-ascending">Price: Low to high</option>
          <option value="price-descending">Price: High to low</option>
        </select>
      </div>
    </aside>
  );
}

export default ProductFilterPanel;