import React from "react";
import "./spinner.css";

interface LoadingSpinnerProps {
  size?: number | string;
  color?: string;
  centered?: boolean;
  message?: string;
}

const Spinner: React.FC<LoadingSpinnerProps> = ({
  size = 48,
  color = "#555",
  centered = true,
  message = "Loading, please wait...",
}) => {
  const style: React.CSSProperties = {
    width: typeof size === "number" ? `${size}px` : size,
    height: typeof size === "number" ? `${size}px` : size,
    borderColor: `${color} transparent ${color} transparent`,
  };

  return (
    <div className={`spinner-wrapper ${centered ? "centered" : ""}`}>
      <div className="spinner" style={style} />
      <p className="spinner-text">{message}</p>
    </div>
  );
};

export default Spinner;
