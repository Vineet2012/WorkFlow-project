import React, { useCallback, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from "reactflow";

import "reactflow/dist/style.css";
import ModuleNodeCmp from "./moduleNode";
import InitialNodeCmp from "./initialNode";

const nodeTypes = { moduleNode: ModuleNodeCmp, initialNode: InitialNodeCmp };

export default function FlowCmp({ workflow }) {
  const initialNodes = useMemo(() => [
    {
      id: "0",
      type: "initialNode",
      data: { output_type: workflow.input_type },
      position: { x: -150, y: 0 },
    },
  ]);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      let data = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof data === "undefined" || !data) {
        return;
      }
      data = JSON.parse(data);

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: data.id,
        type: "moduleNode",
        position,
        data: {
          name: data.name,
          input_type: data.input_type,
          output_type: data.output_type,
          isValid: false,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onConnect = useCallback(
    (params) => {
      // const srcNode = nodes.find((el) => el.id === params.source);
      // const tgtNode = nodes.find((el) => el.id === params.target);
      // const srcOutput = srcNode.data.output_type;
      // const tgtInput = tgtNode.data.input_type;
      // if (srcOutput === tgtInput) return

      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === params.target) {
            node.data = { ...node.data, isValid: true };
          }
          return node;
        })
      );
      setEdges(addEdge(params, edges));
    },
    [edges]
    // [edges, nodes]
  );

  const onEdgesDelete = useCallback((params) => {
    const param = params[0];
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === param.target) {
          node.data = { ...node.data, isValid: false };
        }
        return node;
      })
    );
  }, []);

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );

  return (
    <div style={{ width: "100%", height: "90vh" }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onNodesDelete={onNodesDelete}
        onEdgesChange={onEdgesChange}
        onEdgesDelete={onEdgesDelete}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="top-right"
      >
        <Background color="blue" variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
