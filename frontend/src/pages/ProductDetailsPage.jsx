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

  const isInStock = product.stockQuantity > 0;

  const formattedPrice = product.price.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
  });

  const approvedReviews = product.reviews.filter(
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
          <img
            className="product-details__image"
            src={product.imageUrl}
            alt={product.name}
          />
        </div>

        <div className="product-details__information">
          <p className="product-details__category">{product.category}</p>

          <h1>{product.name}</h1>

          <p className="product-details__brand">
            Brand: {product.brand}
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
              ? `${product.stockQuantity} available`
              : "Currently out of stock"}
          </p>

          <p className="product-details__description">
            {product.description}
          </p>

          <p>
            <strong>Compatibility:</strong> {product.compatibility}
          </p>
        </div>
      </article>

      <section
        className="product-information-section"
        aria-labelledby="specifications-heading"
      >
        <h2 id="specifications-heading">Specifications</h2>

        <dl className="specification-list">
          {product.specifications.map((specification) => (
            <div
              className="specification-list__item"
              key={specification.name}
            >
              <dt>{specification.name}</dt>
              <dd>{specification.value}</dd>
            </div>
          ))}
        </dl>
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