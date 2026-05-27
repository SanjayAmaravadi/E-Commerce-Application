import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../services/profileService";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  /*
      LOAD PROFILE
  */
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile();
      setProfile(response.data.data);
    } catch (error) {
      toast.error("Failed To Load Profile");
    }
  };

  const validateProfile = () => {
    let newErrors = {};

    // NAME VALIDATION
    if (!profile.name.trim()) {
      newErrors.name = "Name is required";
    } else if (profile.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!profile.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(profile.email)) {
      newErrors.email = "Enter valid email";
    }

    // PHONE VALIDATION
    const phoneRegex = /^[0-9]{10}$/;

    if (!profile.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(profile.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = async () => {
    if (!validateProfile()) {
      return;
    }
    try {
      setLoading(true);

      const oldEmail = localStorage.getItem("email");
      const oldPhone = localStorage.getItem("phone");
      const response = await updateProfile({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
      });
      toast.success(response.data.message);
      setEditMode(false);

      /*
        CHECK IMPORTANT CHANGES
    */
      if (oldEmail !== profile.email || oldPhone !== profile.phone) {
        toast.success("Profile updated. Please login again.");

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("phone");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = () => {
    if (!passwordData.currentPassword.trim()) {
      toast.error("Current password required");
      return false;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const handlePasswordChange = async () => {
    if (!validatePassword()) {
      return;
    }
    try {
      const response = await changePassword(passwordData);
      toast.success(response.data.message);
      setPasswordModal(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
      });

      /*
        AUTO LOGOUT
    */
      toast.success("Password changed. Please login again.");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      localStorage.removeItem("phone");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed");
    }
  };

  if (!profile) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div
      className="min-vh-100"
      style={{
        background: "#f8fafc",
      }}
    >
      <Navbar />

      <div className="container py-5">
        {/* BACK BUTTON */}

        <button
          type="button"
          className="btn btn-light border"
          onClick={() => navigate("/")}
          style={{
            borderRadius: "12px",
            fontWeight: "500",
            marginBottom: "15px",
          }}
        >
          ← Home
        </button>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="card border-0 shadow-sm"
              style={{
                borderRadius: "24px",
              }}
            >
              <div className="card-body p-5">
                {/* HEADER */}

                <div className="text-center mb-5">
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "110px",
                      height: "110px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#111827,#374151)",
                      color: "white",
                      fontSize: "40px",
                      fontWeight: "bold",
                    }}
                  >
                    {profile.name.charAt(0)}
                  </div>
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            name: e.target.value,
                          })
                        }
                      />

                      {errors.name && (
                        <div className="text-danger small mt-1">
                          {errors.name}
                        </div>
                      )}
                    </>
                  ) : (
                    // <input
                    //   type="text"
                    //   className="form-control"
                    //   value={profile.name}
                    //   onChange={(e) =>
                    //     setProfile({
                    //       ...profile,
                    //       name: e.target.value,
                    //     })
                    //   }
                    // />
                    <div className="fw-semibold">{profile.name}</div>
                  )}
                  {/* <h2 className="fw-bold mb-1">{profile.name}</h2> */}

                  <div className="text-muted">{profile.role}</div>
                  {profile.verified && (
                    <div className="mt-2">
                      <span className="badge bg-success">Verified Account</span>
                    </div>
                  )}
                </div>

                {/* DETAILS */}

                <div className="row g-4 mb-5">
                  <div className="col-md-6">
                    <div
                      className="border p-4 h-100"
                      style={{
                        borderRadius: "18px",
                      }}
                    >
                      <div className="text-muted small mb-2">Email</div>

                      {editMode ? (
                        <>
                          <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            value={profile.email}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                email: e.target.value,
                              })
                            }
                          />

                          {errors.email && (
                            <div className="text-danger small mt-1">
                              {errors.email}
                            </div>
                          )}
                        </>
                      ) : (
                        // <input
                        //   type="email"
                        //   className="form-control"
                        //   value={profile.email}
                        //   onChange={(e) =>
                        //     setProfile({
                        //       ...profile,
                        //       email: e.target.value,
                        //     })
                        //   }
                        // />
                        <div className="fw-semibold">{profile.email}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div
                      className="border p-4 h-100"
                      style={{
                        borderRadius: "18px",
                      }}
                    >
                      <div className="text-muted small mb-2">Phone</div>

                      {editMode ? (
                        <>
                          <input
                            type="text"
                            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                            value={profile.phone}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                phone: e.target.value,
                              })
                            }
                          />

                          {errors.phone && (
                            <div className="text-danger small mt-1">
                              {errors.phone}
                            </div>
                          )}
                        </>
                      ) : (
                        // <input
                        //   type="text"
                        //   className="form-control"
                        //   value={profile.phone}
                        //   onChange={(e) =>
                        //     setProfile({
                        //       ...profile,
                        //       phone: e.target.value,
                        //     })
                        //   }
                        // />
                        <div className="fw-semibold">{profile.phone}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* STATS */}

                <div className="row g-4">
                  <div className="col-md-4">
                    <div
                      className="border p-4 text-center"
                      style={{
                        borderRadius: "20px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "40px",
                        }}
                      >
                        📦
                      </div>

                      <h3 className="fw-bold mt-3">{profile.totalOrders}</h3>

                      <div className="text-muted">Orders</div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div
                      className="border p-4 text-center"
                      style={{
                        borderRadius: "20px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "40px",
                        }}
                      >
                        ❤️
                      </div>

                      <h3 className="fw-bold mt-3">{profile.wishlistItems}</h3>

                      <div className="text-muted">Wishlist</div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div
                      className="border p-4 text-center"
                      style={{
                        borderRadius: "20px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "40px",
                        }}
                      >
                        🛒
                      </div>

                      <h3 className="fw-bold mt-3">{profile.cartItems}</h3>

                      <div className="text-muted">Cart Items</div>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-3 mt-5">
                  {editMode ? (
                    <button
                      className="btn btn-dark"
                      onClick={handleUpdateProfile}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  ) : (
                    <button
                      className="btn btn-dark"
                      onClick={() => setEditMode(true)}
                    >
                      Edit Profile
                    </button>
                  )}

                  <button
                    className="btn btn-outline-dark"
                    onClick={() => setPasswordModal(true)}
                  >
                    Change Password
                  </button>
                </div>
                {passwordModal && (
                  <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{
                      background: "rgba(0,0,0,0.5)",
                      zIndex: 9999,
                    }}
                  >
                    <div
                      className="bg-white p-4"
                      style={{
                        width: "420px",
                        borderRadius: "24px",
                      }}
                    >
                      <h4 className="fw-bold mb-4">Change Password</h4>

                      <div className="d-flex flex-column gap-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Current Password"
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                        />

                        <input
                          type="password"
                          className="form-control"
                          placeholder="New Password"
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="d-flex gap-2 mt-4">
                        <button
                          className="btn btn-light w-50"
                          onClick={() => setPasswordModal(false)}
                        >
                          Cancel
                        </button>

                        <button
                          className="btn btn-dark w-50"
                          onClick={handlePasswordChange}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
