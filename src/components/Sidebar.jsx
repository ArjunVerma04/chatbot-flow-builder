import React from 'react';
import { MessageCircle } from 'lucide-react'; 

function Sidebar({ onDragStart }) {
  return (
    <aside className="nodes-panel">
      <div
        className="dndnode"
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData('application/reactflow', 'textNode');
          e.dataTransfer.effectAllowed = 'move';
          onDragStart?.(e, 'textNode');
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <MessageCircle size={16} />
          <span>Message</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
