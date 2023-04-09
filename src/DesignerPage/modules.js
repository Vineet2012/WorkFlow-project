import React from "react";
import "./designerPage.css";
import "./modules.css";

export default function Modules({ loading, modules }) {
  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const onDragStart = (event, nodeData) => {
    console.log("hello");
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(nodeData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div>
      <div>
        <ul className="list-group">
          {modules.map((value, index) => {
            return (
              <li key={index} className="module-list">
                <div
                  className="dndnode input module-node"
                  onDragStart={(event) => onDragStart(event, value)}
                  draggable
                >
                  <div className="input">{value.input_type}</div>
                  <div className="name">{value.name}</div>
                  <div className="output">{value.output_type}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
