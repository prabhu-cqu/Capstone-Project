import { useMemo, useState } from "react";
import ProductFilterPanel from "../components/catalogue/ProductFilterPanel";
import ProductGrid from "../components/catalogue/ProductGrid";
import { mockProducts } from "../data/mockProducts";

const initialFilters = {
  searchText: "",
  category: "",
  brand: "",
  minimumPrice: "",
  maximumPrice: "",
  sortOption: "name-ascending",
};

function ProductCataloguePage({ onViewDetails }) {
  const [filters, setFilters] = useState(initialFilters);

  const activeProducts = useMemo(
    () => mockProducts.filter((product) => product.isActive),
    [],
  );

  const categories = useMemo(
    () =>
      [...new Set(activeProducts.map((product) => product.category))].sort(),
    [activeProducts],
  );

  const brands = useMemo(
    () => [...new Set(activeProducts.map((product) => product.brand))].sort(),
    [activeProducts],
  );

  const filteredProducts = useMemo(() => {
    const searchText = filters.searchText.trim().toLowerCase();

    const minimumPrice =
      filters.minimumPrice === "" ? null : Number(filters.minimumPrice);

    const maximumPrice =
      filters.maximumPrice === "" ? null : Number(filters.maximumPrice);

    const matchingProducts = activeProducts.filter((product) => {
      const searchableText = [
        product.name,
        product.brand,
        product.category,
        product.description,
        product.compatibility,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        searchText === "" || searchableText.includes(searchText);

      const matchesCategory =
        filters.category === "" || product.category === filters.category;

      const matchesBrand =
        filters.brand === "" || product.brand === filters.brand;

      const matchesMinimumPrice =
        minimumPrice === null || product.price >= minimumPrice;

      const matchesMaximumPrice =
        maximumPrice === null || product.price <= maximumPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesMinimumPrice &&
        matchesMaximumPrice
      );
    });

    return [...matchingProducts].sort((firstProduct, secondProduct) => {
      switch (filters.sortOption) {
        case "name-descending":
          return secondProduct.name.localeCompare(firstProduct.name);

        case "price-ascending":
          return firstProduct.price - secondProduct.price;

        case "price-descending":
          return secondProduct.price - firstProduct.price;

        case "name-ascending":
        default:
          return firstProduct.name.localeCompare(secondProduct.name);
      }
    });
  }, [activeProducts, filters]);

  function clearFilters() {
    setFilters({ ...initialFilters });
  }

  return (
    <main className="catalogue-page">
      <header className="catalogue-header">
        <p className="catalogue-header__eyebrow">SmartShop AI</p>
        <h1>Product catalogue</h1>
        <p>
          Search and compare computer, mobile and study accessories using
          verified catalogue information.
        </p>
      </header>

      <div className="catalogue-layout">
        <ProductFilterPanel
          filters={filters}
          categories={categories}
          brands={brands}
          onFilterChange={setFilters}
          onClearFilters={clearFilters}
        />

        <section className="catalogue-results" aria-labelledby="results-heading">
          <div className="catalogue-results__heading">
            <h2 id="results-heading">Available products</h2>

            <p role="status">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          <ProductGrid
            products={filteredProducts}
            onViewDetails={onViewDetails}
          />
        </section>
      </div>
    </main>
  );
}

export default ProductCataloguePage;