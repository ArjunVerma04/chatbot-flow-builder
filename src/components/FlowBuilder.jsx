import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomTextNode from './nodes/CustomTextNode';
import Sidebar from './Sidebar';
import SettingsPanel from './SettingsPanel';
import { validateFlow } from '../utils/validation';

// Define custom node types
const nodeTypes = {
  textNode: CustomTextNode,
};

function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const { project } = useReactFlow(); // ✅ Fix: allows correct positioning

  // Handle node connections
  const onConnect = useCallback(
    (params) => {
      const alreadyConnected = edges.find(
        (e) => e.source === params.source && e.sourceHandle === params.sourceHandle
      );
      if (alreadyConnected) return;

      setEdges((prev) => addEdge(params, prev));
    },
    [edges]
  );

  // Handle drag + drop node onto canvas
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData('application/reactflow');
      if (!nodeType) return;

      const bounds = event.currentTarget.getBoundingClientRect();

      const position = project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode = {
        id: `${Date.now()}`,
        type: nodeType,
        position,
        data: { label: 'Text Message' },
      };

      setNodes((prev) => [...prev, newNode]);
    },
    [project, setNodes]
  );

  // Save the current flow (for now, just console log it)
  const onSave = () => {
    const isValid = validateFlow(nodes, edges);
    if (isValid) {
      console.log('Saving flow...', { nodes, edges });
      alert('Flow saved! Check the console 🙂');
    }
  };

  return (
    <div className="app">
      {/* Left: Sidebar or Settings Panel */}
      {selectedNode ? (
        <SettingsPanel selectedNode={selectedNode} setNodes={setNodes} />
      ) : (
        <Sidebar
          onDragStart={(e, type) => {
            e.dataTransfer.setData('application/reactflow', type);
            e.dataTransfer.effectAllowed = 'move';
          }}
        />
      )}

      {/* Main Canvas */}
      <div
        className="flow-canvas"
        onDrop={onDrop}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(event, node) => setSelectedNode(node)}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>

        <button className="save-btn" onClick={onSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default FlowBuilder;
