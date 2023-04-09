import React from "react";
import "./workFlowTitle.css";

export default function WorkFlowTitle({ label }) {
  return (
    <div>
      <div className="workFlow-title">
        <span>{label}</span>
      </div>
    </div>
  );
}
