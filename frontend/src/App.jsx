import { useEffect, useState } from "react";
import ProductCataloguePage from "./pages/ProductCataloguePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPanel from "./components/cart/CartPanel";
import AuthPanel from "./components/auth/AuthPanel";
import { getProductById } from "./services/productApi";
import {
  addCartItem,
  getCart,
  removeCartItem,
  updateCartItem,
} from "./services/cartApi";
import "./catalogue.css";

function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("smartshop-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      return undefined;
    }

    let requestCancelled = false;

    async function loadCustomerCart() {
      try {
        setCartLoading(true);
        setCartError("");

        const response = await getCart();

        if (!requestCancelled) {
          setCartItems(response.data?.items || []);
        }
      } catch (err) {
        if (!requestCancelled) {
          console.error("Cart loading error:", err);
          setCartError(err.message);
        }
      } finally {
        if (!requestCancelled) {
          setCartLoading(false);
        }
      }
    }

    loadCustomerCart();

    return () => {
      requestCancelled = true;
    };
  }, [currentUser]);

  useEffect(() => {
    if (selectedProductId === null) {
      return undefined;
    }

    let requestCancelled = false;

    async function loadProductDetails() {
      try {
        setLoading(true);
        setError("");

        const response = await getProductById(selectedProductId);

        if (requestCancelled) {
          return;
        }

        if (response.success && response.data) {
          setSelectedProduct(response.data);
        } else {
          setSelectedProduct(null);
          setError("Product not found.");
        }
      } catch (err) {
        if (!requestCancelled) {
          console.error("Product details loading error:", err);
          setSelectedProduct(null);
          setError("Unable to load product details.");
        }
      } finally {
        if (!requestCancelled) {
          setLoading(false);
        }
      }
    }

    loadProductDetails();

    return () => {
      requestCancelled = true;
    };
  }, [selectedProductId]);

  async function refreshCart() {
    const response = await getCart();
    setCartItems(response.data?.items || []);
  }

  function openProductDetails(productId) {
    setSelectedProductId(productId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function returnToCatalogue() {
    setSelectedProductId(null);
    setSelectedProduct(null);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openCart() {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }

    setCartError("");
    setIsCartOpen(true);
  }

  async function addToCart(product) {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }

    try {
      setCartLoading(true);
      setCartError("");

      await addCartItem(product.product_id, 1);
      await refreshCart();
      setIsCartOpen(true);
    } catch (err) {
      console.error("Add to cart error:", err);
      setCartError(err.message);
      setIsCartOpen(true);
    } finally {
      setCartLoading(false);
    }
  }

  async function updateCartQuantity(productId, quantity) {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      setCartLoading(true);
      setCartError("");

      await updateCartItem(productId, quantity);
      await refreshCart();
    } catch (err) {
      console.error("Cart quantity update error:", err);
      setCartError(err.message);
    } finally {
      setCartLoading(false);
    }
  }

  async function removeFromCart(productId) {
    try {
      setCartLoading(true);
      setCartError("");

      await removeCartItem(productId);
      await refreshCart();
    } catch (err) {
      console.error("Remove cart item error:", err);
      setCartError(err.message);
    } finally {
      setCartLoading(false);
    }
  }

  function handleAuthenticated(user, token) {
    localStorage.setItem("smartshop-token", token);
    localStorage.setItem("smartshop-user", JSON.stringify(user));
    localStorage.removeItem("smartshop-cart");
    setCurrentUser(user);
    setCartError("");
  }

  function logout() {
    localStorage.removeItem("smartshop-token");
    localStorage.removeItem("smartshop-user");
    localStorage.removeItem("smartshop-cart");
    setCurrentUser(null);
    setCartItems([]);
    setCartError("");
    setIsCartOpen(false);
  }

  const cartItemCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );

  const cartPanel = isCartOpen ? (
    <CartPanel
      cartItems={cartItems}
      loading={cartLoading}
      error={cartError}
      onClose={() => setIsCartOpen(false)}
      onUpdateQuantity={updateCartQuantity}
      onRemoveItem={removeFromCart}
    />
  ) : null;

  const authPanel = isAuthOpen ? (
    <AuthPanel
      onClose={() => setIsAuthOpen(false)}
      onAuthenticated={handleAuthenticated}
    />
  ) : null;

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

        {cartPanel}
        {authPanel}
      </>
    );
  }

  return (
    <>
      <ProductCataloguePage
        onViewDetails={openProductDetails}
        onAddToCart={addToCart}
        cartItemCount={cartItemCount}
        onOpenCart={openCart}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={logout}
      />

      {cartPanel}
      {authPanel}
    </>
  );
}

export default App;