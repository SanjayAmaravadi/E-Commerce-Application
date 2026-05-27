import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { verifyOtp, resendOtp } from "../services/authService";
import LoadingOverlay from "../components/LoadingOverlay";

const VerifyOtpPage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(30);
  const [resending, setResending] = useState(false);

  /*
        TIMER
    */

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /*
        VERIFY OTP
    */

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await verifyOtp({
        email,
        otp,
      });

      toast.success("Email Verified");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /*
        RESEND OTP
    */

  const handleResend = async () => {
    try {
      setResending(true);
      await resendOtp(email);

      toast.success("OTP Resent");

      setTimer(30);
    } catch (error) {
      toast.error("Failed To Resend OTP");
    }
    finally {
      setResending(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "#f8fafc",
      }}
    >
      <div
        className="card border-0 shadow p-4"
        style={{
          width: "420px",
          borderRadius: "22px",
        }}
      >
        {/* HEADER */}

        <div className="text-center mb-4">
          <div
            style={{
              fontSize: "55px",
            }}
          >
            📧
          </div>

          <h3 className="fw-bold mt-2">Verify OTP</h3>

          <p className="text-muted">
            Enter OTP sent to
            <br />
            <span className="fw-semibold">{email}</span>
          </p>
        </div>

        {/* FORM */}

        <form onSubmit={handleVerify}>
          <input
            type="text"
            className="form-control text-center mb-3"
            placeholder="Enter OTP"
            value={otp}
            maxLength={6}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={{
              height: "55px",
              fontSize: "22px",
              letterSpacing: "8px",
              borderRadius: "14px",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-dark w-100"
            style={{
              height: "50px",
              borderRadius: "14px",
              fontWeight: "600",
            }}
          >
            {loading ? "Verifying..." : "Verify OTP"}
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

        {/* <div className="text-center mt-4">
          {timer > 0 ? (
            <div className="text-muted small">
              Resend OTP in <span className="fw-bold">{timer}s</span>
            </div>
          ) : (
            <button
              className="btn btn-link text-decoration-none"
              onClick={handleResend}
            >
              Resend OTP
            </button>
          )}
        </div> */}
      </div>
      {loading && <LoadingOverlay message="Verifying OTP..." />}
    </div>
  );
};

export default VerifyOtpPage;
