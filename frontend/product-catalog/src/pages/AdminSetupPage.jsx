import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { completeAdminSetup } from "../services/adminService";

const AdminSetupPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });

  /*
      HANDLE CHANGE
  */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /*
      PASSWORD STRENGTH
  */

  const getStrength = () => {
    const password = formData.password;
    if (password.length < 6) return "Weak";
    if (password.length < 10) return "Medium";
    return "Strong";
  };

  /*
    VALIDATION
      Minimum:
      - 8 characters
      - 1 uppercase
      - 1 lowercase
      - 1 number
      - 1 special character
*/

  const validatePhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    );
  };

  /*
      HANDLE SUBMIT
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.trim().length < 3) {
      toast.error("Name must contain at least 3 characters");
      return;
    }

    if (!validatePhone(formData.phone)) {
      toast.error("Enter valid 10 digit phone number");
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must contain uppercase, lowercase, number, special character and minimum 8 characters",
      );
      return;
    }

    try {
      setLoading(true);

      const response = await completeAdminSetup({
        token,
        name: formData.name,
        phone: formData.phone,
        password: formData.password,
      });

      toast.success(response.data.message || "Admin Created");

      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
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
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div
              className="card border-0 shadow-sm"
              style={{
                borderRadius: "24px",
              }}
            >
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div
                    style={{
                      fontSize: "60px",
                    }}
                  >
                    👑
                  </div>

                  <h2 className="fw-bold">Admin Setup</h2>

                  <p className="text-muted">Complete admin account</p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* NAME */}

                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        height: "50px",
                        borderRadius: "14px",
                      }}
                    />
                  </div>

                  {/* PHONE */}

                  <div className="mb-3">
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      style={{
                        height: "50px",
                        borderRadius: "14px",
                      }}
                    />
                  </div>

                  {/* PASSWORD */}

                  <div className="mb-2 position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{
                        height: "50px",
                        borderRadius: "14px",
                      }}
                    />

                    <button
                      type="button"
                      className="btn position-absolute top-50 end-0 translate-middle-y"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>

                  {/* STRENGTH */}

                  <div className="small mb-4">
                    Password Strength:
                    <span className="fw-bold ms-1">{getStrength()}</span>
                  </div>

                  {/* BUTTON */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-danger w-100 py-2 fw-semibold"
                    style={{
                      borderRadius: "14px",
                    }}
                  >
                    {loading ? "Creating..." : "Create Admin Account"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSetupPage;
