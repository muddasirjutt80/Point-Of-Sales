import React from "react";

const Spinner = () => {
  return (
    <div
      className="spinner"
      style={{
        background: "black",
        marginTop: "50%",
      }}
    >
      <h2 className="loading">Loading Data...</h2>
    </div>
  );
};

export default Spinner;
