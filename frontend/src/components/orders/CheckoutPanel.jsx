import "./CheckoutPanel.css";

function CheckoutPanel({
  cartItems,
  submitting,
  error,
  onClose,
  onConfirm,
}) {
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <section
        className="checkout-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="checkout-header">
          <div>
            <p className="checkout-eyebrow">SmartShop AI</p>
            <h2 id="checkout-title">Confirm your order</h2>
          </div>

          <button
            type="button"
            className="checkout-close-button"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close checkout"
          >
            ×
          </button>
        </div>

        <div className="checkout-items">
          {cartItems.map((item) => (
            <div className="checkout-item" key={item.product_id}>
              <div>
                <strong>{item.name}</strong>
                <span>
                  {item.quantity} × ${Number(item.price).toFixed(2)}
                </span>
              </div>

              <strong>
                $
                {(
                  Number(item.price) * Number(item.quantity)
                ).toFixed(2)}
              </strong>
            </div>
          ))}
        </div>

        <div className="checkout-total">
          <span>Total</span>
          <strong>${totalAmount.toFixed(2)}</strong>
        </div>

        <p className="checkout-note">
          This is a simulated checkout. No real payment will be processed.
        </p>

        {error && (
          <p className="checkout-error" role="alert">
            {error}
          </p>
        )}

        <div className="checkout-actions">
          <button
            type="button"
            className="checkout-cancel-button"
            onClick={onClose}
            disabled={submitting}
          >
            Return to cart
          </button>

          <button
            type="button"
            className="checkout-confirm-button"
            onClick={onConfirm}
            disabled={submitting || cartItems.length === 0}
          >
            {submitting ? "Placing order..." : "Place order"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default CheckoutPanel;