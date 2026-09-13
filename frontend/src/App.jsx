import { useEffect, useState } from "react";
import ProductCataloguePage from "./pages/ProductCataloguePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPanel from "./components/cart/CartPanel";
import { getProductById } from "./services/productApi";
import "./catalogue.css";

function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("smartshop-cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("smartshop-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (selectedProductId === null) {
      setSelectedProduct(null);
      setError("");
      return;
    }

    async function loadProductDetails() {
      try {
        setLoading(true);
        setError("");

        const response = await getProductById(selectedProductId);

        if (response.success && response.data) {
          setSelectedProduct(response.data);
        } else {
          setSelectedProduct(null);
          setError("Product not found.");
        }
      } catch (err) {
        console.error("Product details loading error:", err);
        setSelectedProduct(null);
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    }

    loadProductDetails();
  }, [selectedProductId]);

  function openProductDetails(productId) {
    setSelectedProductId(productId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function returnToCatalogue() {
    setSelectedProductId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addToCart(product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product_id === product.product_id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });

    setIsCartOpen(true);
  }

  function updateCartQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      )
    );
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.product_id !== productId)
    );
  }

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (selectedProductId !== null) {
    if (loading) {
      return (
        <main className="product-details-page">
          <p>Loading product details...</p>
        </main>
      );
    }

    if (error || !selectedProduct) {
      return (
        <main className="product-details-page">
          <div className="catalogue-message">
            <h1>Product not found</h1>
            <p>{error || "The selected product is unavailable."}</p>

            <button type="button" onClick={returnToCatalogue}>
              Return to catalogue
            </button>
          </div>
        </main>
      );
    }

    return (
      <>
        <ProductDetailsPage
          product={selectedProduct}
          onBack={returnToCatalogue}
          onAddToCart={addToCart}
        />

        {isCartOpen && (
          <CartPanel
            cartItems={cartItems}
            onClose={() => setIsCartOpen(false)}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
          />
        )}
      </>
    );
  }

  return (
    <>
      <ProductCataloguePage
        onViewDetails={openProductDetails}
        onAddToCart={addToCart}
        cartItemCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {isCartOpen && (
        <CartPanel
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
        />
      )}
    </>
  );
}

export default App;