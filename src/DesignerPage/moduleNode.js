import { Handle, Position } from "reactflow";

export default function ModuleNodeCmp({ data }) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        className={
          "module-node module-node-on-canvas " +
          (!data.isValid ? "module-node-not-valid" : "")
        }
      >
        <div className="input">{data.input_type}</div>
        <div className="name">{data.name}</div>
        <div className="output">{data.output_type}</div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
