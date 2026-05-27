import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { resetPassword, forgotPassword } from "../services/authService";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailOrPhone = location.state?.emailOrPhone || "";
  const [resending, setResending] = useState(false);
  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  // TIMER
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // PASSWORD STRENGTH
  const getStrength = () => {
    const password = formData.newPassword;
    if (password.length < 6) return "Weak";
    if (password.length < 10) return "Medium";
    return "Strong";
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    );
  };

  // RESET PASSWORD
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.newPassword)) {
      toast.error(
        "Password must contain uppercase, lowercase, number, special character and minimum 8 characters",
      );
      return;
    }

    try {
      setLoading(true);

      const response = await resetPassword({
        emailOrPhone,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });

      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }

      toast.success("Password Reset Successful");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Reset Failed");
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP
  const handleResend = async () => {
    try {
      setResending(true);
      await forgotPassword({
        emailOrPhone,
      });
      toast.success("OTP Resent");
      setTimer(30);
    } catch (error) {
      toast.error("Failed To Resend OTP");
    } finally {
      setResending(false);
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
                {/* HEADER */}

                <div className="text-center mb-4">
                  <div style={{fontSize: "55px"}} >
                    🔑
                  </div>
                  <h2 className="fw-bold">Reset Password</h2>
                  <p className="text-muted">Enter OTP and new password</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit}>

                  {/* OTP */}
                  <div className="mb-3">
                    <input
                      type="text"
                      name="otp"
                      className="form-control"
                      placeholder="Enter OTP"
                      value={formData.otp}
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
                      name="newPassword"
                      className="form-control"
                      placeholder="New Password"
                      value={formData.newPassword}
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
                    className="btn btn-dark w-100 py-2 fw-semibold"
                    style={{
                      borderRadius: "14px",
                    }}
                  >
                    {loading ? "Updating..." : "Reset Password"}
                  </button>
                </form>

                {/* RESEND */}
                <div className="text-center mt-4">
                  <button
                    type="button"
                    disabled={timer > 0 || resending}
                    onClick={handleResend}
                    className={`btn ${
                      timer > 0 || resending ? "btn-secondary" : "btn-dark"
                    } px-4`}
                    style={{
                      borderRadius: "12px",
                      transition: "0.3s",
                      minWidth: "220px",
                    }}
                  >
                    {resending
                      ? "Resending OTP..."
                      : timer > 0
                        ? `Resend OTP in ${timer}s`
                        : "Resend OTP"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;