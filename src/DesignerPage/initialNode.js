import { Handle, Position } from "reactflow";
import { ReactComponent as Icon } from "./input.svg";

export default function InitialNodeCmp({ data }) {
  return (
    <div>
      <div className="module-node module-node-on-canvas">
        <div className="input">
          <Icon />
        </div>
        <div className="name">Input</div>
        <div className="output">{data.output_type}</div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}
