import { useEffect, useMemo, useState } from "react";
import ProductFilterPanel from "../components/catalogue/ProductFilterPanel";
import ProductGrid from "../components/catalogue/ProductGrid";
import { getProducts } from "../services/productApi";

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await getProducts();

        const formattedProducts = (response.data || []).map((product) => ({
          ...product,
          productId: product.product_id,
          category: product.category_name,
          brand: product.specifications?.brand || "SmartShop",
          stockQuantity: Number(product.stock),
          imageUrl: product.imageUrl || "",
        }));

        setProducts(formattedProducts);
      } catch (err) {
        console.error("Product loading error:", err);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const activeProducts = useMemo(
    () => products.filter((product) => product.isActive !== false),
    [products],
  );

  const categories = useMemo(
    () =>
      [...new Set(activeProducts.map((product) => product.category))]
        .filter(Boolean)
        .sort(),
    [activeProducts],
  );

  const brands = useMemo(
    () =>
      [...new Set(activeProducts.map((product) => product.brand))]
        .filter(Boolean)
        .sort(),
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
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        searchText === "" || searchableText.includes(searchText);

      const matchesCategory =
        filters.category === "" || product.category === filters.category;

      const matchesBrand =
        filters.brand === "" || product.brand === filters.brand;

      const matchesMinimumPrice =
        minimumPrice === null ||
        Number(product.price) >= minimumPrice;

      const matchesMaximumPrice =
        maximumPrice === null ||
        Number(product.price) <= maximumPrice;

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
          return Number(firstProduct.price) - Number(secondProduct.price);

        case "price-descending":
          return Number(secondProduct.price) - Number(firstProduct.price);

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

      {loading && (
        <p role="status">
          Loading products from the SmartShop AI database...
        </p>
      )}

      {error && (
        <p role="alert" className="catalogue-error">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="catalogue-layout">
          <ProductFilterPanel
            filters={filters}
            categories={categories}
            brands={brands}
            onFilterChange={setFilters}
            onClearFilters={clearFilters}
          />

          <section
            className="catalogue-results"
            aria-labelledby="results-heading"
          >
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
      )}
    </main>
  );
}

export default ProductCataloguePage;