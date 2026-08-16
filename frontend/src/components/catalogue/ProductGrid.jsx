import ProductCard from "./ProductCard";

function ProductGrid({ products, onViewDetails }) {
  if (products.length === 0) {
    return (
      <div className="catalogue-message" role="status">
        <h2>No products found</h2>
        <p>Try changing or clearing the search and filter options.</p>
      </div>
    );
  }

  return (
    <section
      className="product-grid"
      aria-label={`${products.length} products found`}
    >
      {products.map((product) => (
        <ProductCard
          key={product.productId}
          product={product}
          onViewDetails={onViewDetails}
        />
      ))}
    </section>
  );
}

export default ProductGrid;