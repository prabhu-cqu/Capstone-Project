import "./CartPanel.css";

function CartPanel({ cartItems, onClose, onUpdateQuantity, onRemoveItem }) {
  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside
        className="cart-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-header">
          <h2>Your Cart</h2>

          <button
            type="button"
            className="cart-close-button"
            onClick={onClose}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <h3>Your cart is empty</h3>
            <p>Add a product from the catalogue to get started.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.product_id}>
                  <div className="cart-item-image">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} />
                    ) : (
                      <span>Product</span>
                    )}
                  </div>

                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>${Number(item.price).toFixed(2)}</p>

                    <div className="cart-quantity-controls">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateQuantity(item.product_id, item.quantity - 1)
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          onUpdateQuantity(item.product_id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="cart-remove-button"
                      onClick={() => onRemoveItem(item.product_id)}
                    >
                      Remove
                    </button>
                  </div>

                  <strong>
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              <p className="cart-summary-note">
                Checkout will be added in the next development stage.
              </p>

              <button type="button" className="cart-checkout-button" disabled>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartPanel;