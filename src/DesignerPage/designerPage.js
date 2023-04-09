import React, { useCallback, useEffect, useState } from "react";
import WorkFlowTitle from "../Title/workFlowTitle";
import axios from "axios";
import Modules from "./modules";
import { useParams } from "react-router-dom";
import Pagination from "./pagination";
import FlowCmp from "./reactFlowRenderer";

export default function DesignerPage() {
  const [workflow, setWorkflow] = useState({});
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingWorkflow, setLoadingWorkflow] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  const params = useParams();

  const modulePerPage = 5;

  const fetchWorkflow = useCallback(async (id) => {
    try {
      const { data } = await axios.get(
        ` https://64307b10d4518cfb0e50e555.mockapi.io/workflow/${id}`
      );
      setWorkflow(data);
      setLoadingWorkflow(false);
      fetchModules(currentPage);
    } catch (error) {
      alert("Failed to load");
    }
  }, []);

  const fetchModules = useCallback(async (page) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=${page}&limit=5`
      );
      if (data.length > 0) {
        setModules((prevValue) => [...prevValue, ...data]);
      } else {
        setHasReachedEnd(true);
      }
      setLoading(false);
    } catch (error) {
      alert("Failed to load");
    }
  }, []);

  useEffect(() => {
    const { id } = params;
    fetchWorkflow(id);
  }, []);

  const handlePageChange = (page) => {
    if (!hasReachedEnd) {
      setCurrentPage(page);

      if (
        currentPage * modulePerPage <= modules.length &&
        page * modulePerPage > modules.length
      ) {
        fetchModules(page);
      }
    }
  };

  // Get current post

  const indexOfFirstModule = (currentPage - 1) * modulePerPage;
  const indexOfLastModule = currentPage * modulePerPage;
  const currentModule = modules.slice(indexOfFirstModule, indexOfLastModule);

  return (
    <div className="designerPage-wrapper">
      <WorkFlowTitle label={"Workflow name: " + "" + workflow.name} />
      <div className="vertical"></div>
      <div style={{ display: "flex" }}>
        <div className="module-wrapper">
          <h3 className="heading">Modules</h3>
          <Modules loading={loading} modules={currentModule} />
          <Pagination
            currentPage={currentPage}
            totalPages={modules.length}
            onChangePage={handlePageChange}
            modulePerPage={modulePerPage}
          />
        </div>
        {!loadingWorkflow && <FlowCmp workflow={workflow} />}
      </div>
    </div>
  );
}
