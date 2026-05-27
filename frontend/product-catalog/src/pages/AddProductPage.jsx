import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { getCategories } from "../services/productService";

import { createProduct } from "../services/adminProductService";

import toast from "react-hot-toast";

const AddProductPage = () => {
  const navigate = useNavigate();

  /*
      CATEGORY STATE
  */

  const [categories, setCategories] = useState([]);

  /*
      PRODUCT STATE
  */

  const [product, setProduct] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    quantity: "",
    categoryId: "",
  });

  /*
      LOAD CATEGORIES
  */

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories();

      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  /*
      HANDLE CHANGE
  */

  const handleChange = (e) => {
    setProduct({
      ...product,

      [e.target.name]: e.target.value,
    });
  };

  /*
      HANDLE SUBMIT
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct({
        ...product,
        price: Number(product.price),
        quantity: Number(product.quantity),
        categoryId: Number(product.categoryId),
      });

      toast.success("Product Added Successfully");

      navigate("/admin");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed To Add Product");
    }
  };

  return (
    <div
      className="min-vh-100"
      style={{
        background: "#f8fafc",
      }}
    >
      <Navbar />

      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div
              className="card border-0 shadow-sm"
              style={{
                borderRadius: "22px",
              }}
            >
              <div className="card-body p-4">
                {/* HEADER */}

                  <button
                    type="button"
                    className="btn btn-light border"
                    onClick={() => navigate("/admin")}
                    style={{
                      borderRadius: "12px",
                      fontWeight: "500",
                      marginBottom: "15px"
                    }}
                    >
                    ← Back To Dashboard
                  </button>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h3 className="fw-bold mb-1">Add Product</h3>

                    <p className="text-muted mb-0 small">Create new product</p>
                  </div>


                  <div
                    style={{
                      fontSize: "42px",
                    }}
                  >
                    🛍️
                  </div>
                </div>

                {/* FORM */}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* LEFT */}

                    <div className="col-lg-7">
                      <div className="row">
                        {/* NAME */}

                        <div className="col-md-6 mb-3">
                          <label className="form-label small fw-semibold">
                            Product Name
                          </label>

                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Product name"
                            value={product.name}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        {/* PRICE */}

                        <div className="col-md-6 mb-3">
                          <label className="form-label small fw-semibold">
                            Price
                          </label>

                          <input
                            type="number"
                            name="price"
                            className="form-control"
                            placeholder="Price"
                            value={product.price}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="row">
                        {/* QUANTITY */}

                        <div className="col-md-6 mb-3">
                          <label className="form-label small fw-semibold">
                            Quantity
                          </label>

                          <input
                            type="number"
                            name="quantity"
                            className="form-control"
                            placeholder="Stock quantity"
                            value={product.quantity}
                            onChange={handleChange}
                            required
                            min="0"
                          />
                        </div>

                        {/* CATEGORY */}

                        <div className="col-md-6 mb-3">
                          <label className="form-label small fw-semibold">
                            Category
                          </label>

                          <select
                            name="categoryId"
                            className="form-select"
                            value={product.categoryId}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Category</option>

                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* IMAGE URL */}

                      <div className="mb-3">
                        <label className="form-label small fw-semibold">
                          Image URL
                        </label>

                        <input
                          type="text"
                          name="imageUrl"
                          className="form-control"
                          placeholder="Paste image URL"
                          value={product.imageUrl}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* DESCRIPTION */}

                      <div className="mb-3">
                        <label className="form-label small fw-semibold">
                          Description
                        </label>

                        <textarea
                          name="description"
                          rows="3"
                          className="form-control"
                          placeholder="Product description"
                          value={product.description}
                          onChange={handleChange}
                          required
                          style={{
                            resize: "none",
                          }}
                        />
                      </div>
                    </div>

                    {/* RIGHT */}

                    <div className="col-lg-5">
                      <label className="form-label small fw-semibold">
                        Image Preview
                      </label>

                      <div
                        className="bg-white border d-flex align-items-center justify-content-center overflow-hidden"
                        style={{
                          height: "320px",
                          borderRadius: "18px",
                          padding: "20px",
                        }}
                      >
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt="Preview"
                            onError={(e) => {
                              e.target.src =
                                "https://placehold.co/600x600?text=No+Image";
                            }}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          <div className="text-center text-muted">
                            <div
                              style={{
                                fontSize: "60px",
                              }}
                            >
                              🖼️
                            </div>

                            <div>Image Preview</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* BUTTONS */}

                  <div className="d-flex gap-3 mt-4">
                    <button
                      type="button"
                      className="btn btn-light border w-50"
                      onClick={() => navigate("/admin")}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary w-50 fw-semibold"
                    >
                      Add Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
