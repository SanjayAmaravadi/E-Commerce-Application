import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { forgotPassword } from "../services/authService";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [loading, setLoading] = useState(false);

  /*
      SEND OTP
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await forgotPassword({
        emailOrPhone,
      });

      // CHECK SUCCESS
      if (!response.data.success) {
        toast.error(response.data.message || "Failed");
        return;
      }

      toast.success(response.data.message || "Reset OTP Sent");

      navigate("/reset-password", {
        state: {
          emailOrPhone,
        },
      });
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Failed",
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
              <div className="text-center mb-4">
                <div
                  style={{
                    fontSize: "55px",
                  }}
                >
                  🔒
                </div>

                <h3 className="fw-bold">Forgot Password</h3>
                <p className="text-muted">Enter email or phone</p>

                <div className="card-body p-5">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email or phone"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-dark w-100 py-2 fw-semibold"
                    >
                      {loading ? "Sending..." : "Send OTP"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;