import { useEffect, useState } from "react";
import {
  createAdmin,
  getAdmins,
  removeAdmin,
  promoteAdmin,
  demoteAdmin,
} from "../services/superAdminService";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  inviteAdmin,
  getAdminInvites,
  deleteInvite,
} from "../services/adminService";

const AdminManagementPage = () => {
  const navigate = useNavigate();

  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [inviteLoading, setInviteLoading] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [invites, setInvites] = useState([]);

  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  /*
      LOAD ADMINS
  */

  useEffect(() => {
    loadAdmins();
    loadInvites();
  }, []);

  const loadAdmins = async () => {
    try {
      const response = await getAdmins();

      setAdmins(response.data.data);
    } catch (error) {
      toast.error("Failed To Load Admins");
    } finally {
      setLoading(false);
    }
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

  /*
    CREATE ADMIN
*/

  const handleCreateAdmin = async () => {
    // Validation
    if (adminForm.name.trim().length < 3) {
      toast.error("Name must contain at least 3 characters");
      return;
    }

    if (!validateEmail(adminForm.email)) {
      toast.error("Enter valid email address");
      return;
    }

    if (!validatePhone(adminForm.phone)) {
      toast.error("Enter valid 10 digit phone number");
      return;
    }

    if (!validatePassword(adminForm.password)) {
      toast.error(
        "Password must contain uppercase, lowercase, number, special character and minimum 8 characters",
      );
      return;
    }

    try {
      setCreateLoading(true);

      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

      if (!passwordRegex.test(adminForm.password)) {
        toast.error("Weak Password");
        return;
      }

      const response = await createAdmin(adminForm);

      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }

      toast.success(response.data.message);
      setShowCreateModal(false);
      setAdminForm({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
      loadAdmins();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed");
    } finally {
      setCreateLoading(false);
    }
  };

  /*
    INVITE ADMIN
*/

  const handleInviteAdmin = async () => {
    if (!adminEmail) {
      toast.error("Enter admin email");

      return;
    }

    try {
      setInviteLoading(true);
      const response = await inviteAdmin({
        email: adminEmail,
      });

      toast.success(response.data.message || "Invite Sent");
      loadInvites();
      setAdminEmail("");
      setShowInviteModal(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed");
    } finally {
      setInviteLoading(false);
    }
  };

  const loadInvites = async () => {
    try {
      const response = await getAdminInvites();

      setInvites(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  /*
    DELETE INVITE
*/

  const handleDeleteInvite = async (id) => {
    try {
      await deleteInvite(id);

      toast.success("Invite Cancelled");

      loadInvites();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed");
    }
  };

  /*
      REMOVE ADMIN
  */

  const handleRemove = async () => {
    try {
      await removeAdmin(selectedAdmin.id);

      toast.success("Admin Removed");

      setSelectedAdmin(null);

      loadAdmins();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed");
    }
  };

  /*
      PROMOTE ADMIN
  */
  // const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = JSON.parse(localStorage.getItem("id"));
  const handlePromote = async (id) => {
    try {
      await promoteAdmin(id);
      toast.success("Promoted Successfully");
      console.log(`Curr: ${currentUser} id: ${id}`);

      /*
        IF CURRENT USER PROMOTED SELF
    */

      if (currentUserId === id) {
        toast.success("Role Updated. Please login again.");

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setTimeout(() => {
          navigate("/login");
          // window.location.href = "/login";
        }, 1200);

        return;
      }

      loadAdmins();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed");
    }
  };

  /*
    DEMOTE ADMIN
*/
  const handleDemote = async (id) => {
    try {
      await demoteAdmin(id);
      toast.success("Demoted Successfully");

      /*
        IF CURRENT USER DEMOTED SELF
    */

      if (currentUserId === id) {
        toast.success("Role Updated. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setTimeout(() => {
          navigate("/login");
          // window.location.href = "/login";
        }, 1200);
        return;
      }

      loadAdmins();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed");
    }
  };

  // const handleDemote = async (id) => {
  //   try {
  //     await demoteAdmin(id);
  //     toast.success("Demoted Successfully");
  //     loadAdmins();
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message || "Failed");
  //   }
  // };

  /*
      FILTER ADMINS
  */

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      className="min-vh-100"
      style={{
        background: "#f8fafc",
      }}
    >
      <Navbar />

      <div className="container py-4">
        {/* HEADER */}
        {/* BACK BUTTON */}

        <button
          type="button"
          className="btn btn-light border"
          onClick={() => navigate("/admin")}
          style={{
            borderRadius: "12px",
            fontWeight: "500",
            marginBottom: "15px",
          }}
        >
          ← Back To Dashboard
        </button>

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          
          <div>
            <h2 className="fw-bold mb-1">Admin Management</h2>

            <p className="text-muted mb-0">Manage all admin accounts</p>
          </div>

          <Link
            to="/admin"
            className="btn btn-dark"
            style={{
              borderRadius: "12px",
            }}
          >
            ← Dashboard
          </Link>
        </div>

        {/* Create Admin */}

        <div className="d-flex gap-3 mb-4">
          <button
            className="btn px-4 py-2"
            style={{
              background: "linear-gradient(135deg,#111827,#1f2937)",
              color: "white",
              border: "none",
              borderRadius: "14px",
              fontWeight: "600",
              boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
            }}
            onClick={() => setShowCreateModal(true)}
          >
            + Create Admin
          </button>
          <button
            className="btn px-4 py-2"
            style={{
              background: "linear-gradient(135deg,#dc2626,#ef4444)",
              color: "white",
              border: "none",
              borderRadius: "14px",
              fontWeight: "600",
              boxShadow: "0 10px 25px rgba(220,38,38,0.18)",
            }}
            onClick={() => setShowInviteModal(true)}
          >
            + Invite Admin
          </button>
        </div>
        {/* SEARCH */}
        <div
          className="card border-0 shadow-sm mb-4"
          style={{
            borderRadius: "20px",
          }}
        >
          <div className="card-body p-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search admins..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                height: "52px",
                borderRadius: "14px",
              }}
            />
          </div>
        </div>

        {/* TABLE */}

        <div
          className="card border-0 shadow-sm"
          style={{
            borderRadius: "22px",
          }}
        >
          <div className="card-body p-4">
            {loading ? (
              <div className="text-center py-5">Loading...</div>
            ) : filteredAdmins.length === 0 ? (
              <div className="text-center py-5">No Admins Found</div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredAdmins.map((admin) => (
                      <tr key={admin.id}>
                        <td className="fw-semibold">{admin.name}</td>

                        <td>{admin.email}</td>

                        <td>{admin.phone}</td>

                        <td>
                          <span
                            className={`badge ${
                              admin.role === "ROLE_SUPER_ADMIN"
                                ? "bg-danger"
                                : "bg-dark"
                            }`}
                          >
                            {admin.role}
                          </span>
                        </td>

                        <td>
                          {admin.verified ? (
                            <span className="badge bg-success">Verified</span>
                          ) : (
                            <span className="badge bg-warning text-dark">
                              Pending
                            </span>
                          )}
                        </td>

                        <td>
                          <div className="d-flex gap-2">
                            {admin.role === "ROLE_ADMIN" && (
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => handlePromote(admin.id)}
                              >
                                Promote
                              </button>
                            )}
                            {admin.role === "ROLE_SUPER_ADMIN" &&
                              admin.email !== "superadmin@gmail.com" && (
                                <button
                                  className="btn btn-sm btn-secondary"
                                  onClick={() => handleDemote(admin.id)}
                                >
                                  Demote
                                </button>
                              )}

                            {admin.role !== "ROLE_SUPER_ADMIN" && (
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => setSelectedAdmin(admin)}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        {/* INVITE TRACKING */}

        <div
          className="card border-0 shadow-sm mt-4"
          style={{
            borderRadius: "22px",
          }}
        >
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="fw-bold mb-1">Admin Invites</h4>

                <div className="text-muted small">
                  Track pending and completed invites
                </div>
              </div>

              <div
                className="badge bg-dark"
                style={{
                  padding: "10px 14px",
                  borderRadius: "12px",
                }}
              >
                {invites.length} Invites
              </div>
            </div>

            {invites.length === 0 ? (
              <div className="text-center py-4 text-muted">
                No Invites Found
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Expiry</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {invites.map((invite) => (
                      <tr key={invite.id}>
                        <td>{invite.email}</td>

                        <td>
                          <span
                            className={`badge ${
                              invite.status === "PENDING"
                                ? "bg-warning text-dark"
                                : invite.status === "USED"
                                  ? "bg-success"
                                  : "bg-danger"
                            }`}
                          >
                            {invite.status}
                          </span>
                        </td>

                        <td>{new Date(invite.expiryTime).toLocaleString()}</td>

                        <td>
                          {invite.status === "PENDING" && (
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteInvite(invite.id)}
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* REMOVE MODAL */}

      {selectedAdmin && (
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
            <div className="text-center mb-4">
              <div
                style={{
                  fontSize: "55px",
                }}
              >
                ⚠️
              </div>

              <h3 className="fw-bold">Remove Admin</h3>

              <p className="text-muted">
                Are you sure you want to remove
                <strong> {selectedAdmin.name}</strong>?
              </p>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-light w-50"
                onClick={() => setSelectedAdmin(null)}
                style={{
                  borderRadius: "12px",
                }}
              >
                Cancel
              </button>

              <button
                className="btn btn-danger w-50"
                onClick={handleRemove}
                style={{
                  borderRadius: "12px",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
      {showCreateModal && (
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
              width: "450px",
              borderRadius: "24px",
            }}
          >
            <div className="text-center mb-4">
              <div
                style={{
                  fontSize: "55px",
                }}
              >
                👨‍💼
              </div>

              <h3 className="fw-bold">Create Admin</h3>
            </div>

            <div className="d-flex flex-column gap-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={adminForm.name}
                onChange={(e) =>
                  setAdminForm({
                    ...adminForm,
                    name: e.target.value,
                  })
                }
              />

              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={adminForm.email}
                onChange={(e) =>
                  setAdminForm({
                    ...adminForm,
                    email: e.target.value,
                  })
                }
              />

              <input
                type="tel"
                maxLength={10}
                className="form-control"
                placeholder="Phone"
                value={adminForm.phone}
                onChange={(e) =>
                  setAdminForm({
                    ...adminForm,
                    phone: e.target.value,
                  })
                }
              />

              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  value={adminForm.password}
                  onChange={(e) =>
                    setAdminForm({
                      ...adminForm,
                      password: e.target.value,
                    })
                  }
                  style={{
                    height: "48px",
                    borderRadius: "12px",
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

            <div className="d-flex gap-2 mt-4">
              <button
                className="btn btn-light w-50"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-dark w-50"
                onClick={handleCreateAdmin}
                disabled={createLoading}
              >
                {createLoading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showInviteModal && (
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
            <div className="text-center mb-4">
              <div
                style={{
                  fontSize: "50px",
                }}
              >
                👨‍💼
              </div>

              <h3 className="fw-bold">Invite Admin</h3>

              <p className="text-muted">Send admin setup email</p>
            </div>

            <div className="mb-4">
              <input
                type="email"
                className="form-control"
                placeholder="Admin Email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                style={{
                  height: "50px",
                  borderRadius: "14px",
                }}
              />
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-light w-50"
                onClick={() => setShowInviteModal(false)}
                style={{
                  borderRadius: "12px",
                }}
              >
                Cancel
              </button>

              <button
                className="btn btn-danger w-50"
                onClick={handleInviteAdmin}
                disabled={inviteLoading}
                style={{
                  borderRadius: "12px",
                }}
              >
                {inviteLoading ? "Sending..." : "Send Invite"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagementPage;
