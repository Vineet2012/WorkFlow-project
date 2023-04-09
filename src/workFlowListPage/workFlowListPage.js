import axios from "axios";
import React, { useEffect, useState } from "react";
import "./workFlowListPage.css";
import { useNavigate } from "react-router-dom";
import WorkFlowTitle from "../Title/workFlowTitle";

export default function WorkFlowListPage() {
  const [workList, setWorkList] = useState([]);

  const navigate = useNavigate();

  function navigateToDesignerPage(id) {
    navigate("/designerPage/" + id);
  }

  useEffect(() => {
    axios
      .get("https://64307b10d4518cfb0e50e555.mockapi.io/workflow")
      .then((response) => {
        setWorkList(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div className="workflow-wrapper">
      <div>
        <WorkFlowTitle label={"Workflows"} />
        <div>
          <table className="table table-bordered table table-striped table-hover">
            <thead>
              <tr className="table-heading">
                <th scope="col">Name</th>
                <th scope="col">Input Type</th>
                <th scope="col">Created at</th>
              </tr>
            </thead>
            <tbody>
              {workList.map((value, index) => {
                return (
                  <tr
                    key={index}
                    style={{
                      textAlignLast: "left",
                      backgroundColor: "#F5F5F5",
                      fontWeight: "600",
                    }}
                  >
                    <td>
                      <a
                        href=""
                        style={{ color: "black" }}
                        onClick={() => navigateToDesignerPage(value.id)}
                      >
                        {value.name}
                      </a>
                    </td>
                    <td style={{ textTransform: "capitalize" }}>
                      {value.input_type}
                    </td>
                    <td>{value.createdAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
