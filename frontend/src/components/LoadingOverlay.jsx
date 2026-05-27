const LoadingOverlay = ({ message = "Loading..." }) => {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        background: "rgba(255,255,255,0.75)",

        backdropFilter: "blur(5px)",

        zIndex: 9999,
      }}
    >
      <div
        className="bg-white shadow-lg p-5 text-center"
        style={{
          borderRadius: "24px",

          width: "320px",
        }}
      >
        {/* SPINNER */}

        <div
          className="spinner-border text-dark mb-4"
          role="status"
          style={{
            width: "4rem",
            height: "4rem",
          }}
        />

        {/* MESSAGE */}

        <h5 className="fw-bold mb-2">Please Wait</h5>

        <div className="text-muted">{message}</div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
