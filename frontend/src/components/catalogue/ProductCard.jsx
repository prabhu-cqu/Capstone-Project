function ProductCard({ product, onViewDetails }) {
  const isInStock = Number(product.stock) > 0;

  const formattedPrice = Number(product.price).toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
  });

  const brand = product.specifications?.brand || "SmartShop";

  return (
    <article className="product-card">
      {product.imageUrl ? (
        <img
          className="product-card__image"
          src={product.imageUrl}
          alt={product.name}
        />
      ) : (
        <div
          className="product-card__image product-card__image--placeholder"
          role="img"
          aria-label={`${product.name} image placeholder`}
        >
          <span>SmartShop AI</span>
        </div>
      )}

      <div className="product-card__content">
        <p className="product-card__category">
          {product.category_name || "Uncategorised"}
        </p>

        <h2 className="product-card__name">{product.name}</h2>

        <p className="product-card__brand">{brand}</p>

        <p className="product-card__price">{formattedPrice}</p>

        <p
          className={
            isInStock
              ? "product-card__stock product-card__stock--available"
              : "product-card__stock product-card__stock--unavailable"
          }
        >
          {isInStock ? `${product.stock} in stock` : "Out of stock"}
        </p>

        <button
          type="button"
          className="product-card__button"
          onClick={() => onViewDetails(product.product_id)}
          aria-label={`View details for ${product.name}`}
        >
          View details
        </button>
      </div>
    </article>
  );
}

export default ProductCard;