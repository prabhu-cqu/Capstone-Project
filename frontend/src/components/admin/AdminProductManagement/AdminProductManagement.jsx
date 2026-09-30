import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  updateProduct,
  uploadProductImage
} from "../../../services/productApi";
import "./AdminProductManagement.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPenToSquare,
  faToggleOn,
  faToggleOff,
  faTrashCan,
  faCircleCheck,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";


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
 const [statusFilter, setStatusFilter] = useState("all");
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

      const result = await getAdminProducts(); setProducts(result.data || []);
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
      `Permanently delete "${product.name}"?\n\nThis action cannot be undone.`
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

      setMessage("Product permanently deleted successfully."); await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleStatusChange(product) {
    try {
      setMessage("");
      setError("");

      let specifications = product.specifications || {};

      if (typeof specifications === "string") {
        try {
          specifications = JSON.parse(specifications);
        } catch {
          specifications = {};
        }
      }

      const newStatus =
        product.status === "active" ? "inactive" : "active";

      const productData = {
        name: product.name,
        description: product.description || "",
        price: Number(product.price),
        stock: Number(product.stock),
        category_name: product.category_name,
        specifications,
        status: newStatus,
        image_url: product.imageUrl || product.image_url || null,
      };

      await updateProduct(product.product_id, productData);

      setMessage(
        newStatus === "active"
          ? `"${product.name}" is now active.`
          : `"${product.name}" is now inactive (archived).`
      );

      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  }

const filteredProducts = products.filter((product) => {
  if (statusFilter === "all") {
    return true;
  }

  return product.status === statusFilter;
});


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
    <div>
      <h3>Current Products</h3>
      <p className="admin-product-list-description">
        Manage product details, availability and catalogue status.
      </p>
    </div>

    <div className="admin-list-controls">
      <span>{filteredProducts.length} products</span>

      <div className="admin-status-filters">
        <button
          type="button"
          className={statusFilter === "all" ? "active" : ""}
          onClick={() => setStatusFilter("all")}
        >
          All
        </button>

        <button
          type="button"
          className={statusFilter === "active" ? "active" : ""}
          onClick={() => setStatusFilter("active")}
        >
          Active
        </button>

        <button
          type="button"
          className={statusFilter === "inactive" ? "active" : ""}
          onClick={() => setStatusFilter("inactive")}
        >
          Inactive
        </button>
      </div>
    </div>
  </div>

  {loading ? (
    <p>Loading products...</p>
  ) : filteredProducts.length === 0 ? (
    <p className="admin-empty-products">
      No products found for this status.
    </p>
  ) : (
    <div className="admin-table-wrapper">
      <table className="admin-products-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Status</th>
            <th className="actions-heading">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.product_id}>
              <td className="product-name-cell">
                {product.name}
              </td>

              <td>
                ${Number(product.price).toFixed(2)}
              </td>

              <td>{product.stock}</td>

              <td>{product.category_name}</td>

              <td>
                {product.status === "active" ? (
                  <span className="status-active">
                    <FontAwesomeIcon icon={faCircleCheck} />
                    {" "}Active
                  </span>
                ) : (
                  <span className="status-inactive">
                    <FontAwesomeIcon icon={faCircleMinus} />
                    {" "}Inactive
                  </span>
                )}
              </td>

              <td>
                <div className="admin-product-actions">
                  <button
                    type="button"
                    className="admin-edit-button"
                    onClick={() => startEdit(product)}
                    title="Edit product"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    className="admin-status-button"
                    onClick={() => handleStatusChange(product)}
                    title={
                      product.status === "active"
                        ? "Deactivate product"
                        : "Activate product"
                    }
                  >
                    <FontAwesomeIcon
                      icon={
                        product.status === "active"
                          ? faToggleOff
                          : faToggleOn
                      }
                    />
                    <span>
                      {product.status === "active"
                        ? "Deactivate"
                        : "Activate"}
                    </span>
                  </button>

                  <button
                    type="button"
                    className="admin-delete-button"
                    onClick={() => handleDelete(product)}
                    title="Permanently delete product"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                    <span>Delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
        </div>
</section>
</div>
);
}