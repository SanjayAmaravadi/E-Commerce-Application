import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import { getAllOrders, updateOrderStatus } from "../services/orderAdminService";

import toast from "react-hot-toast";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  /*
      LOAD ORDERS
  */

  const loadOrders = async () => {
    try {
      const response = await getAllOrders();
      console.log(response);
      setOrders(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  /*
      UPDATE STATUS
  */

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);

      toast.success("Status Updated");

      loadOrders();
    } catch (error) {
      console.log(error);

      toast.error("Update Failed");
    }
  };

  /*
      TOTAL ORDERS
  */

  const totalOrders = orders.length;

  /*
      TOTAL REVENUE
  */

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0,
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

        <div className="mb-4">
          <h2 className="fw-bold mb-1">Admin Orders</h2>

          <p className="text-muted mb-0">Manage and track customer orders</p>
        </div>

        {/* STATS */}

        <div className="row mb-4">
          {/* TOTAL ORDERS */}

          <div className="col-md-6 mb-3">
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "20px",
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="small text-muted mb-2">Total Orders</div>

                    <h2 className="fw-bold mb-0 text-primary">{totalOrders}</h2>
                  </div>

                  <div
                    style={{
                      fontSize: "42px",
                    }}
                  >
                    📦
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TOTAL REVENUE */}

          <div className="col-md-6 mb-3">
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "20px",
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="small text-muted mb-2">Total Revenue</div>

                    <h2 className="fw-bold mb-0 text-success">
                      ₹ {totalRevenue}
                    </h2>
                  </div>

                  <div
                    style={{
                      fontSize: "42px",
                    }}
                  >
                    💰
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ORDERS */}

        {orders.length === 0 ? (
          <div
            className="card border-0 shadow-sm text-center"
            style={{
              borderRadius: "22px",
            }}
          >
            <div className="card-body py-5">
              <div
                className="mb-3"
                style={{
                  fontSize: "55px",
                }}
              >
                📭
              </div>

              <h4 className="fw-bold">No Orders Found</h4>

              <p className="text-muted mb-0">
                Customer orders will appear here
              </p>
            </div>
          </div>
        ) : (
          <div className="row">
            {orders.map((order) => (
              <div key={order.id} className="col-12 mb-4">
                <div
                  className="card border-0 shadow-sm"
                  style={{
                    borderRadius: "22px",
                  }}
                >
                  <div className="card-body p-4">
                    {/* TOP */}

                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
                      {/* LEFT */}

                      <div>
                        <div className="small text-muted mb-1">Order ID</div>

                        <h5 className="fw-bold mb-2">#{order.id}</h5>

                        <div className="small text-muted mb-1">
                          Customer:{" "}
                          <span className="fw-semibold text-dark">
                            {order.user.name}
                          </span>
                        </div>

                        <div className="small text-muted">
                          {order.createdAt}
                        </div>
                      </div>

                      {/* RIGHT */}

                      <div
                        style={{
                          minWidth: "220px",
                        }}
                      >
                        <div className="small text-muted mb-2">
                          Update Status
                        </div>

                        <select
                          className="form-select"
                          style={{
                            borderRadius: "12px",
                            fontWeight: "500",
                          }}
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                        >
                          <option value="PENDING">PENDING</option>

                          <option value="CONFIRMED">CONFIRMED</option>

                          <option value="SHIPPED">SHIPPED</option>

                          <option value="DELIVERED">DELIVERED</option>

                          <option value="CANCELLED">CANCELLED</option>
                        </select>

                        <div className="mt-3">
                          <span
                            className="badge px-3 py-2"
                            style={{
                              background:
                                order.status === "DELIVERED"
                                  ? "#198754"
                                  : order.status === "PENDING"
                                    ? "#ffc107"
                                    : order.status === "CANCELLED"
                                      ? "#dc3545"
                                      : "#212529",
                              color:
                                order.status === "PENDING" ? "#000" : "#fff",
                              borderRadius: "10px",
                              fontSize: "13px",
                            }}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ITEMS */}

                    <div className="d-flex flex-column gap-3">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="border bg-light p-3 d-flex justify-content-between align-items-center"
                          style={{
                            borderRadius: "16px",
                          }}
                        >
                          {/* LEFT */}

                          <div>
                            <div className="small text-muted mb-1">Product</div>

                            <h6 className="fw-bold mb-1">
                              {item.product.name}
                            </h6>

                            <div className="small text-muted">
                              Quantity: {item.quantity}
                            </div>
                          </div>

                          {/* RIGHT */}

                          <div className="text-end">
                            <div className="small text-muted mb-1">Amount</div>

                            <h5 className="fw-bold text-success mb-0">
                              ₹ {item.price * item.quantity}
                            </h5>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* FOOTER */}

                    <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                      <div className="small text-muted">
                        {order.items.length} item(s) in this order
                      </div>

                      <div className="text-end">
                        <div className="small text-muted">Total Amount</div>

                        <h4 className="fw-bold text-success mb-0">
                          ₹ {order.totalAmount}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
