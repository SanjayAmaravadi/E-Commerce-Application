import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { registerUser } from "../services/authService";
import LoadingOverlay from "../components/LoadingOverlay";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    VALIDATION
      Minimum:
      - 8 characters
      - 1 uppercase
      - 1 lowercase
      - 1 number
      - 1 special character
*/

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    );
  };

  // HANDLE REGISTER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.trim().length < 3) {
      toast.error("Name must contain at least 3 characters");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Enter valid email address");
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
      const response = await registerUser(formData);

      //CHECK SUCCESS
      if (!response.data.success) {
        toast.error(response.data.message || "Registration Failed");
        return;
      }

      toast.success(response.data.message || "OTP Sent");
      navigate("/verify-otp", {
        state: {
          email: formData.email,
        },
      });
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Registration Failed",
      );
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
                  <h2 className="fw-bold">Create Account</h2>

                  <p className="text-muted">Register your account</p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* NAME */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Name</label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* EMAIL */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* PHONE */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Phone</label>

                    <input
                      type="tel"
                      maxLength="10"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* PASSWORD */}

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Password</label>

                    <div className="mb-3 position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="form-control"
                        placeholder="Create Password"
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
                        className="btn position-absolute top-50 end-0 translate-middle-y border-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-dark w-100 py-2 fw-semibold"
                  >
                    {loading ? "Sending OTP..." : "Register"}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <span className="text-muted">Already have an account?</span>

                  <Link
                    to="/login"
                    className="ms-2 text-decoration-none fw-semibold"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <LoadingOverlay message="Sending verification email..." />}
    </div>
  );
};

export default RegisterPage;
