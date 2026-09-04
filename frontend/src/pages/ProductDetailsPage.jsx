function ProductDetailsPage({ product, onBack }) {
  if (!product) {
    return (
      <main className="product-details-page">
        <div className="catalogue-message">
          <h1>Product not found</h1>
          <p>The selected product is unavailable.</p>

          <button type="button" onClick={onBack}>
            Return to catalogue
          </button>
        </div>
      </main>
    );
  }

  const isInStock = Number(product.stock) > 0;

  const formattedPrice = Number(product.price).toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
  });

  const brand = product.specifications?.brand || "SmartShop";

  const specifications = Object.entries(product.specifications || {}).filter(
    ([name]) => name !== "brand",
  );

  const approvedReviews = (product.reviews || []).filter(
    (review) => review.status === "approved",
  );

  return (
    <main className="product-details-page">
      <button
        type="button"
        className="back-button"
        onClick={onBack}
      >
        ← Back to catalogue
      </button>

      <article className="product-details">
        <div className="product-details__image-container">
          {product.imageUrl ? (
            <img
              className="product-details__image"
              src={product.imageUrl}
              alt={product.name}
            />
          ) : (
            <div
              className="product-details__image product-details__image--placeholder"
              role="img"
              aria-label={`${product.name} image placeholder`}
            >
              <span>SmartShop AI</span>
            </div>
          )}
        </div>

        <div className="product-details__information">
          <p className="product-details__category">
            {product.category_name || "Uncategorised"}
          </p>

          <h1>{product.name}</h1>

          <p className="product-details__brand">
            Brand: {brand}
          </p>

          <p className="product-details__price">{formattedPrice}</p>

          <p
            className={
              isInStock
                ? "product-details__stock product-details__stock--available"
                : "product-details__stock product-details__stock--unavailable"
            }
          >
            {isInStock
              ? `${product.stock} available`
              : "Currently out of stock"}
          </p>

          <p className="product-details__description">
            {product.description}
          </p>

          <p>
            <strong>Compatibility:</strong>{" "}
            {product.compatibility || "Suitable for everyday study and office use."}
          </p>
        </div>
      </article>

      <section
        className="product-information-section"
        aria-labelledby="specifications-heading"
      >
        <h2 id="specifications-heading">Specifications</h2>

        {specifications.length === 0 ? (
          <p>No specifications are available for this product.</p>
        ) : (
          <dl className="specification-list">
            {specifications.map(([name, value]) => (
              <div
                className="specification-list__item"
                key={name}
              >
                <dt>{name}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>

      <section
        className="product-information-section"
        aria-labelledby="reviews-heading"
      >
        <h2 id="reviews-heading">Approved customer reviews</h2>

        {approvedReviews.length === 0 ? (
          <p>No approved reviews are available for this product.</p>
        ) : (
          <div className="review-list">
            {approvedReviews.map((review) => (
              <article className="review" key={review.reviewId}>
                <p className="review__rating">
                  Rating: {review.rating}/5
                </p>

                <p>{review.comment}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default ProductDetailsPage;