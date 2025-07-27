import React from 'react';
import { Handle, Position } from 'reactflow';
import { MessageCircle } from 'lucide-react'; // optional, use emoji or SVG
import '../../app.css';

function CustomTextNode({ data, isConnectable }) {
  return (
    <div className="custom-node">
      <div className="node-header">
        <MessageCircle size={16} style={{ marginRight: '6px' }} />
        <strong>Send Message</strong>
      </div>

      <div className="node-body">{data.label}</div>

      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="handle handle-top"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="handle handle-bottom"
      />
    </div>
  );
}

export default CustomTextNode;
