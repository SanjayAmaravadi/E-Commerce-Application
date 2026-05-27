import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getSettings, updateSettings } from "../services/settingsService";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const AdminSettingsPage = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    gstPercentage: 0,
    deliveryFee: 0,
    freeDeliveryThreshold: 0,
    platformFee: 0,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  /*
      LOAD SETTINGS
  */

  const loadSettings = async () => {
    try {
      const response = await getSettings();
      setSettings(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  /*
      HANDLE CHANGE
  */

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: Number(e.target.value),
      // [e.target.name]: e.target.value,
    });
  };

  /*
      SAVE
  */

  const handleSave = async () => {
    try {
      await updateSettings(settings);
      toast.success("Settings Updated");
      navigate("/admin");
    } catch (error) {
      console.log(error);

      toast.error("Update Failed");
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

      <div className="container py-4">
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
        <div
          className="card border-0 shadow-sm"
          style={{
            borderRadius: "20px",
          }}
        >
          <div className="card-body p-4">
            <h3 className="fw-bold mb-4">Adjust Fees</h3>

            {/* GST */}

            <div className="mb-3">
              <label className="form-label">GST Percentage</label>

              <input
                type="number"
                className="form-control"
                name="gstPercentage"
                value={settings.gstPercentage}
                onChange={handleChange}
              />
            </div>

            {/* DELIVERY */}

            <div className="mb-3">
              <label className="form-label">Delivery Fee</label>

              <input
                type="number"
                className="form-control"
                name="deliveryFee"
                value={settings.deliveryFee}
                onChange={handleChange}
              />
            </div>

            {/* FREE DELIVERY */}

            <div className="mb-3">
              <label className="form-label">Free Delivery Threshold</label>

              <input
                type="number"
                className="form-control"
                name="freeDeliveryThreshold"
                value={settings.freeDeliveryThreshold}
                onChange={handleChange}
              />
            </div>

            {/* PLATFORM */}

            <div className="mb-4">
              <label className="form-label">Platform Fee</label>

              <input
                type="number"
                className="form-control"
                name="platformFee"
                value={settings.platformFee}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-dark" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
