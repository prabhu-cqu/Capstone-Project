import { useEffect, useState } from "react";
import ProductCataloguePage from "./pages/ProductCataloguePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { getProductById } from "./services/productApi";
import "./catalogue.css";

function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      <ProductDetailsPage
        product={selectedProduct}
        onBack={returnToCatalogue}
      />
    );
  }

  return <ProductCataloguePage onViewDetails={openProductDetails} />;
}

export default App;