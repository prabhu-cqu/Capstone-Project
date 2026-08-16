function ProductCard({ product, onViewDetails }) {
  const isInStock = product.stockQuantity > 0;

  const formattedPrice = product.price.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
  });

  return (
    <article className="product-card">
      <img
        className="product-card__image"
        src={product.imageUrl}
        alt={product.name}
      />

      <div className="product-card__content">
        <p className="product-card__category">{product.category}</p>

        <h2 className="product-card__name">{product.name}</h2>

        <p className="product-card__brand">{product.brand}</p>

        <p className="product-card__price">{formattedPrice}</p>

        <p
          className={
            isInStock
              ? "product-card__stock product-card__stock--available"
              : "product-card__stock product-card__stock--unavailable"
          }
        >
          {isInStock ? `${product.stockQuantity} in stock` : "Out of stock"}
        </p>

        <button
          type="button"
          className="product-card__button"
          onClick={() => onViewDetails(product.productId)}
          aria-label={`View details for ${product.name}`}
        >
          View details
        </button>
      </div>
    </article>
  );
}

export default ProductCard;