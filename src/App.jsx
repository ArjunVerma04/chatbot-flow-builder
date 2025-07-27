import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import FlowBuilder from './components/FlowBuilder';
import './App.css';

// This is the main App component
function App() {
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  );
}

export default App;
