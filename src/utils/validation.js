// This is a basic validation function
// It checks if more than one node is disconnected
export const validateFlow = (nodes, edges) => {
  const sourceIds = edges.map((e) => e.source);

  const disconnected = nodes.filter((n) => !sourceIds.includes(n.id));

  if (nodes.length > 1 && disconnected.length > 1) {
    alert('Oops! More than one node is not connected.');
    return false;
  }

  return true;
};
