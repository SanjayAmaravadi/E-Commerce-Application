import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProducts } from "../services/productService";
import { deleteProduct } from "../services/adminProductService";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [confirmText, setConfirmText] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  /*
      LOAD PRODUCTS
  */

  const loadProducts = async () => {
    try {
      const response = await getProducts();

      setProducts(response.data.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  /*
      OPEN DELETE MODAL
  */

  const openDeleteModal = (product) => {
    setSelectedProduct(product);

    setConfirmText("");

    setShowDeleteModal(true);
  };

  /*
      CLOSE DELETE MODAL
  */

  const closeDeleteModal = () => {
    setShowDeleteModal(false);

    setSelectedProduct(null);

    setConfirmText("");
  };

  /*
      DELETE PRODUCT
  */

  const handleDelete = async () => {
    if (confirmText !== selectedProduct.name) {
      toast.error("Product name does not match");

      return;
    }

    try {
      await deleteProduct(selectedProduct.id);

      toast.success("Product Deleted");

      closeDeleteModal();

      loadProducts();
    } catch (error) {
      console.log(error);

      toast.error("Delete Failed");
    }
  };

  // TOTAL PRODUCTS
  const totalProducts = products.length;
  
  // Available Products
  const availableProducts = products.filter(
      (product) => product.quantity > 0,
    ).length;
  
  // TOTAL VALUE 
  const totalValue = products.reduce((sum, product) => sum + product.price, 0);
 

  return (
    <div
      className="min-vh-100"
      style={{
        background: "#f8fafc",
      }}
    >
      <Navbar />

      <div className="container py-4">
        {/* PAGE HEADER */}

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 mb-4">
          {/* LEFT SIDE */}

          <div className="d-flex align-items-center gap-3">
            {/* BACK BUTTON */}

            <Link
              to="/"
              className="btn"
              style={{
                borderRadius: "14px",
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                height: "46px",
                padding: "0 18px",
                display: "flex",
                alignItems: "center",
                fontWeight: "600",
                color: "#111827",
                boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
              }}
            >
              ← Home
            </Link>

            {/* TITLE */}

            <div>
              <h2
                className="fw-bold mb-1"
                style={{
                  color: "#111827",
                }}
              >
                Admin Dashboard
              </h2>

              <p
                className="mb-0"
                style={{
                  color: "#6b7280",
                  fontSize: "15px",
                }}
              >
                Manage products, categories and orders
              </p>
            </div>
          </div>

          {/* RIGHT SIDE BUTTONS */}

          <div className="d-flex flex-wrap justify-content-end gap-2">
            {/* ADD PRODUCT */}

            <Link
              to="/admin/add-product"
              className="btn"
              style={{
                borderRadius: "12px",
                background: "#2563eb",
                color: "white",
                fontWeight: "600",
                padding: "10px 18px",
                border: "none",
              }}
            >
              + Add Product
            </Link>

            {/* ADD CATEGORY */}

            <Link
              to="/admin/add-category"
              className="btn"
              style={{
                borderRadius: "12px",
                background: "#059669",
                color: "white",
                fontWeight: "600",
                padding: "10px 18px",
                border: "none",
              }}
            >
              + Add Category
            </Link>

            {/* MANAGE ORDERS */}

            <Link
              to="/admin/orders"
              className="btn"
              style={{
                borderRadius: "12px",
                background: "#111827",
                color: "white",
                fontWeight: "600",
                padding: "10px 18px",
                border: "none",
              }}
            >
              Manage Orders
            </Link>

            {/* SETTINGS */}

            <Link
              to="/admin/settings"
              className="btn"
              style={{
                borderRadius: "12px",
                background: "#f59e0b",
                color: "#111827",
                fontWeight: "700",
                padding: "10px 18px",
                border: "none",
              }}
            >
              Adjust Fees
            </Link>

            {/* ADMINS */}

            <Link
              to="/super-admin/admins"
              className="btn"
              style={{
                borderRadius: "12px",
                background: "#dc2626",
                color: "white",
                fontWeight: "600",
                padding: "10px 18px",
                border: "none",
              }}
            >
              Manage Admins
            </Link>
          </div>
        </div>

        {/* STATS */}

        <div className="row mb-4">
          {/* TOTAL PRODUCTS */}

          <div className="col-md-4 mb-3">
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "20px",
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted small mb-2">Total Products</div>

                    <h2 className="fw-bold mb-0 text-primary">
                      {totalProducts}
                    </h2>
                  </div>

                  <div
                    style={{
                      fontSize: "40px",
                    }}
                  >
                    📦
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INVENTORY VALUE */}

          <div className="col-md-4 mb-3">
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "20px",
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted small mb-2">Inventory Value</div>

                    <h2 className="fw-bold mb-0 text-success">
                      ₹ {totalValue}
                    </h2>
                  </div>

                  <div
                    style={{
                      fontSize: "40px",
                    }}
                  >
                    💰
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AVAILABLE PRODUCTS */}

          <div className="col-md-4 mb-3">
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "20px",
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted small mb-2">
                      Available Products
                    </div>

                    <h2 className="fw-bold mb-0 text-dark">
                      {availableProducts}
                    </h2>
                  </div>

                  <div
                    style={{
                      fontSize: "40px",
                    }}
                  >
                    🛒
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT MANAGEMENT */}

        <div
          className="card border-0 shadow-sm"
          style={{
            borderRadius: "22px",
          }}
        >
          <div className="card-body p-4">
            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
              <div>
                <h4 className="fw-bold mb-1">Product Management</h4>

                <div className="text-muted small">
                  Manage all products from here
                </div>
              </div>

              <div
                className="badge bg-dark px-3 py-2"
                style={{
                  borderRadius: "10px",
                  fontSize: "14px",
                }}
              >
                {products.length} Products
              </div>
            </div>

            {/* PRODUCTS */}

            {products.length === 0 ? (
              <div className="text-center py-5">
                <div
                  className="mb-3"
                  style={{
                    fontSize: "55px",
                  }}
                >
                  📭
                </div>

                <h5 className="fw-bold">No Products Found</h5>

                <p className="text-muted">Add products to manage inventory</p>
              </div>
            ) : (
              <div className="row">
                {products.map((product) => (
                  <div key={product.id} className="col-lg-6 mb-4">
                    <div
                      className="border bg-white h-100 p-3 shadow-sm"
                      style={{
                        borderRadius: "18px",
                      }}
                    >
                      {/* TOP */}

                      <div className="d-flex gap-3">
                        {/* IMAGE */}

                        <div
                          style={{
                            width: "140px",
                            height: "140px",
                            background: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            borderRadius: "16px",
                            border: "1px solid #eee",
                            padding: "12px",
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            onError={(e) => {
                              e.target.src =
                                "https://placehold.co/600x600?text=No+Image";
                            }}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              display: "block",
                            }}
                          />
                        </div>

                        {/* DETAILS */}

                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start gap-2">
                            <div>
                              <div className="text-muted small mb-1">
                                Product ID: #{product.id}
                              </div>

                              <h5 className="fw-bold mb-2">{product.name}</h5>
                            </div>

                            <span
                              className="badge bg-secondary"
                              style={{
                                borderRadius: "8px",
                              }}
                            >
                              {product.categoryName}
                            </span>
                          </div>

                          {/* STOCK */}

                          <div className="small text-muted mb-3">
                            Stock: {product.quantity}
                          </div>

                          {/* PRICE */}

                          <div>
                            <div className="small text-muted mb-1">Price</div>

                            <h4 className="fw-bold text-success mb-0">
                              ₹ {product.price}
                            </h4>
                          </div>
                        </div>
                      </div>

                      {/* ACTIONS */}

                      <div className="d-flex gap-2 mt-4">
                        <Link
                          to={`/admin/update-product/${product.id}`}
                          className="btn btn-warning flex-grow-1"
                          style={{
                            borderRadius: "12px",
                            fontWeight: "500",
                          }}
                        >
                          Edit
                        </Link>

                        <button
                          className="btn btn-outline-danger flex-grow-1"
                          style={{
                            borderRadius: "12px",
                            fontWeight: "500",
                          }}
                          onClick={() => openDeleteModal(product)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}

      {showDeleteModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background: "rgba(0,0,0,0.55)",
            zIndex: 9999,
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            className="bg-white shadow-lg"
            style={{
              width: "450px",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            {/* HEADER */}

            <div
              className="p-4 border-bottom"
              style={{
                background: "#fff5f5",
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    background: "#fee2e2",
                    fontSize: "24px",
                  }}
                >
                  🗑️
                </div>

                <div>
                  <h4 className="fw-bold mb-1 text-danger">Delete Product</h4>

                  <div className="text-muted small">
                    This action cannot be undone
                  </div>
                </div>
              </div>
            </div>

            {/* BODY */}

            <div className="p-4">
              <p className="mb-3">You are about to permanently delete:</p>

              <div className="border rounded p-3 mb-4 bg-light">
                <div className="fw-bold">{selectedProduct?.name}</div>

                <div className="text-muted small">
                  Product ID: #{selectedProduct?.id}
                </div>
              </div>

              <div className="mb-2 small fw-semibold">
                Type product name to confirm
              </div>

              <input
                type="text"
                className="form-control"
                placeholder={`Type "${selectedProduct?.name}"`}
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                style={{
                  borderRadius: "12px",
                  padding: "12px",
                }}
              />
            </div>

            {/* FOOTER */}

            <div className="p-4 border-top d-flex gap-3">
              <button
                className="btn btn-light border flex-grow-1"
                onClick={closeDeleteModal}
                style={{
                  borderRadius: "12px",
                  fontWeight: "500",
                }}
              >
                Cancel
              </button>

              <button
                className="btn btn-danger flex-grow-1"
                disabled={confirmText !== selectedProduct?.name}
                onClick={handleDelete}
                style={{
                  borderRadius: "12px",
                  fontWeight: "600",
                }}
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
