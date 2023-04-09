import "./App.css";
import WorkFlowListPage from "./workFlowListPage/workFlowListPage";
import DesignerPage from "./DesignerPage/designerPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Flow from "./DesignerPage/reactFlowRenderer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkFlowListPage />} />
        <Route path="/designerPage/:id" element={<DesignerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
