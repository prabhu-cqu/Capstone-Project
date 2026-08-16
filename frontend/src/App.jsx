import { useState } from "react";
import ProductCataloguePage from "./pages/ProductCataloguePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { mockProducts } from "./data/mockProducts";
import "./catalogue.css";

function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const selectedProduct = mockProducts.find(
    (product) =>
      product.productId === selectedProductId && product.isActive,
  );

  function openProductDetails(productId) {
    setSelectedProductId(productId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function returnToCatalogue() {
    setSelectedProductId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (selectedProductId !== null) {
    return (
      <ProductDetailsPage
        product={selectedProduct}
        onBack={returnToCatalogue}
      />
    );
  }

  return (
    <ProductCataloguePage onViewDetails={openProductDetails} />
  );
}

export default App;