import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
uploadProductImage
} from "../../../services/productApi";
import "./AdminProductManagement.css";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category_name: "",
  specifications: "{}",
  status: "active",
};

export default function AdminProductManagement({ onClose }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
const [imageFile, setImageFile] = useState(null);
const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const result = await getProducts({ sort: "newest" });
      setProducts(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetForm() {
  setForm(emptyForm);
  setEditingId(null);
  setImageFile(null);
  setImagePreview("");
}

  function startEdit(product) {
    let specifications = product.specifications || {};

    if (typeof specifications === "string") {
      try {
        specifications = JSON.parse(specifications);
      } catch {
        specifications = {};
      }
    }

    setEditingId(product.product_id);

   setForm({
  name: product.name || "",
  description: product.description || "",
  price: product.price ?? "",
  stock: product.stock ?? "",
  category_name: product.category_name || "",
  specifications: JSON.stringify(specifications, null, 2),
  status: product.status || "active",
});

    setMessage("");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      let parsedSpecifications = {};

      try {
        parsedSpecifications = JSON.parse(
          form.specifications.trim() || "{}"
        );
      } catch {
        throw new Error("Specifications must be valid JSON.");
      }

 let imageUrl = null;

    if (imageFile) {
      const uploadResult = await uploadProductImage(imageFile);
      imageUrl = uploadResult.image_url;
    }

   const productData = {
  name: form.name.trim(),
  description: form.description.trim(),
  price: Number(form.price),
  stock: Number(form.stock),
  category_name: form.category_name.trim(),
  specifications: parsedSpecifications,
  status: form.status,
  image_url: imageUrl,
};

       if (editingId) {
      await updateProduct(editingId, productData);
      setMessage("Product updated successfully.");
    } else {
      await createProduct(productData);
      setMessage("Product created successfully.");
    }

    resetForm();
    await loadProducts();
  } catch (err) {
    setError(err.message);
  } finally {
    setSaving(false);
  }
}

  async function handleDelete(product) {
    const confirmed = window.confirm(
      `Delete "${product.name}" from the catalogue?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setMessage("");
      setError("");

      await deleteProduct(product.product_id);

      if (editingId === product.product_id) {
        resetForm();
      }

      setMessage("Product deleted successfully.");
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-products-overlay">
      <section className="admin-products-panel">
        <header className="admin-products-header">
          <div>
            <p className="admin-products-label">Administration</p>
            <h2>Catalogue Management</h2>
            <p>Add, edit and remove SmartShop AI products.</p>
          </div>

          <button
            type="button"
            className="admin-close-button"
            onClick={onClose}
          >
            Logout
          </button>
        </header>

        {message && (
          <div className="admin-success-message">{message}</div>
        )}

        {error && (
          <div className="admin-error-message">{error}</div>
        )}

        <div className="admin-products-layout">
          <form
            className="admin-product-form"
            onSubmit={handleSubmit}
          >

<div className="admin-field">
  <label htmlFor="product-image">Product Image</label>

  <input
    id="product-image"
    type="file"
    accept="image/png,image/jpeg,image/webp"
    onChange={(event) => {
      const file = event.target.files?.[0];

      if (file) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      }
    }}
  />

  <small>JPG, PNG or WEBP. Maximum size: 5 MB.</small>

  {imagePreview && (
    <div className="admin-image-preview">
      <img src={imagePreview} alt="Product preview" />
    </div>
  )}
</div>
            <h3>{editingId ? "Edit Product" : "Add Product"}</h3>

            <label>
              Product name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
              />
            </label>

            <div className="admin-form-row">
              <label>
                Price ($)
                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Stock
                <input
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="admin-form-row">
              <label>
  Category Name
  <input
    name="category_name"
    type="text"
    value={form.category_name}
    onChange={handleChange}
    placeholder="e.g. Laptops, Audio, Gaming"
    maxLength="100"
    required
  />
</label>

              {editingId && (
                <label>
                  Status
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </label>
              )}
            </div>

            <label>
              Specifications (JSON)
              <textarea
                name="specifications"
                value={form.specifications}
                onChange={handleChange}
                rows="5"
              />
            </label>

            <div className="admin-form-actions">
              <button
                type="submit"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Product"
                    : "Add Product"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <div className="admin-product-list">
            <div className="admin-product-list-heading">
              <h3>Current Products</h3>
              <span>{products.length} active products</span>
            </div>

            {loading ? (
              <p>Loading products...</p>
            ) : products.length === 0 ? (
              <p>No active products found.</p>
            ) : (
              products.map((product) => (
                <article
                  className="admin-product-card"
                  key={product.product_id}
                >
                  <div>
                    <h4>{product.name}</h4>
                    <p>
                      ${Number(product.price).toFixed(2)}
                      {" • "}
                      Stock: {product.stock}
                    </p>
                    <small>
                      Category: {product.category_name}
                    </small>
                  </div>

                  <div className="admin-product-actions">
                    <button
                      type="button"
                      onClick={() => startEdit(product)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="admin-delete-button"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}