import React from 'react';

// edit panel to update the label of node
function SettingsPanel({ selectedNode, setNodes }) {
  const handleChange = (e) => {
    const newText = e.target.value;

    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, label: newText } }
          : node
      )
    );
  };

  return (
    <div className="settings-panel">
      <label>Edit Text</label>
      <input
        value={selectedNode.data.label}
        onChange={handleChange}
        placeholder="Enter text here"
      />
    </div>
  );
}

export default SettingsPanel;
