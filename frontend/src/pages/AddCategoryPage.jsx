import { useState } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AddCategoryPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  /*
      HANDLE SUBMIT
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/categories", {
        name,
      });

      toast.success("Category Added");

      navigate("/admin");
    } catch (error) {
      console.log(error);

      toast.error("Failed To Add Category");
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

      <div className="container py-5">
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
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div
              className="card border-0 shadow-sm"
              style={{
                borderRadius: "24px",
              }}
            >
              <div className="card-body p-5">
                {/* HEADER */}

                <div className="text-center mb-4">
                  <div
                    className="mb-3"
                    style={{
                      fontSize: "55px",
                    }}
                  >
                    🗂️
                  </div>

                  <h2 className="fw-bold mb-2">Add New Category</h2>

                  <p className="text-muted mb-0">
                    Create categories to organize products
                  </p>
                </div>

                {/* FORM */}

                <form onSubmit={handleSubmit}>
                  {/* CATEGORY NAME */}

                  <div className="mb-4">
                    <label className="form-label fw-semibold mb-2">
                      Category Name
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter category name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={{
                        borderRadius: "14px",
                        padding: "14px 16px",
                        border: "1px solid #dbe2ea",
                      }}
                    />
                  </div>

                  {/* BUTTONS */}

                  <div className="d-flex gap-3">
                    <button
                      type="button"
                      className="btn btn-light border w-50"
                      style={{
                        borderRadius: "14px",
                        padding: "12px",
                        fontWeight: "500",
                      }}
                      onClick={() => navigate("/admin")}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-success w-50"
                      style={{
                        borderRadius: "14px",
                        padding: "12px",
                        fontWeight: "600",
                      }}
                    >
                      Add Category
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

export default AddCategoryPage;
