import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import LoadingOverlay from "../components/LoadingOverlay";

const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    emailOrPhone: "",
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

  // HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    /*
      VALIDATION
  */

    if (!formData.emailOrPhone.trim()) {
      toast.error("Enter email or phone number");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Enter password");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must contain at least 8 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser(formData);

      if (!response.data.success) {
        toast.error(response.data.message);

        return;
      }

      const token = response.data.data.token;
      const role = response.data.data.role;
      const email = response.data.data.email;
      const name = response.data.data.name;
      const id = response.data.data.id;

      login({ token, role, email, name, id });
      // const userData = response.data.data;

      // login({
      //   token: userData.token,
      //   role: userData.role,
      //   email: userData.email,
      //   name: userData.name,
      //   id: userData.id,
      // });

      toast.success("Login Successful");

      /*
        REDIRECT
    */

      if (role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login Failed");
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
                  <h2 className="fw-bold">Welcome Back</h2>

                  <p className="text-muted">Login to continue</p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* EMAIL */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email Or Phone
                    </label>

                    <input
                      type="text"
                      name="emailOrPhone"
                      className="form-control"
                      placeholder="Enter email or phone"
                      value={formData.emailOrPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="mb-4 position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control"
                      placeholder="Enter Password"
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

                  {/* FORGOT */}

                  <div className="text-end mb-4">
                    <Link
                      to="/forgot-password"
                      className="text-decoration-none"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* BUTTON */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-dark w-100 py-2 fw-semibold"
                  >
                    {loading ? "Signing In..." : "Login"}
                    {/* Login */}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <span className="text-muted">Don't have an account?</span>

                  <Link
                    to="/register"
                    className="ms-2 text-decoration-none fw-semibold"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
