import { useState } from 'react';

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export default function BinaryTree() {
  const [value, setValue] = useState('');
  const [tree, setTree] = useState(null);
  const [error, setError] = useState('');
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [isDefinitionOpen, setIsDefinitionOpen] = useState(false);

  const insert = (root, value) => {
    if (!root) {
      return new TreeNode(value);
    }

    if (value < root.value) {
      root.left = insert(root.left, value);
    } else if (value > root.value) {
      root.right = insert(root.right, value);
    }

    return root;
  };

  const handleInsert = () => {
    setError('');
    if (!value.trim()) {
      setError('Please enter a value');
      return;
    }
    const numValue = parseInt(value.trim());
    if (isNaN(numValue)) {
      setError('Please enter a valid number');
      return;
    }
    setTree(insert(tree, numValue));
    setValue('');
  };

  const search = async (root, value) => {
    if (!root) {
      setError('Value not found');
      setHighlightedNode(null);
      return;
    }

    setHighlightedNode(root.value);
    await new Promise((r) => setTimeout(r, 500));

    if (root.value === value) {
      return;
    }

    if (value < root.value) {
      await search(root.left, value);
    } else {
      await search(root.right, value);
    }
  };

  const handleSearch = async () => {
    setError('');
    if (!value.trim()) {
      setError('Please enter a value to search');
      return;
    }
    const numValue = parseInt(value.trim());
    if (isNaN(numValue)) {
      setError('Please enter a valid number');
      return;
    }
    if (!tree) {
      setError('Tree is empty');
      return;
    }
    await search(tree, numValue);
  };

  const renderNode = (node, level = 0) => {
    if (!node) return null;

    return (
      <div className="flex flex-col items-center">
        <div
          className={`w-16 h-16 flex items-center justify-center rounded text-white font-bold shadow-md transition-all duration-300 mb-4
            ${node.value === highlightedNode ? 'bg-pink-300 animate-pulse' : 'bg-pink-400'}`}
        >
          {node.value}
        </div>
        <div className="flex gap-8">
          {renderNode(node.left, level + 1)}
          {renderNode(node.right, level + 1)}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <button
          onClick={() => setIsDefinitionOpen(!isDefinitionOpen)}
          className="w-full text-left bg-pink-100 p-4 rounded-lg hover:bg-pink-200 transition-colors"
        >
          <h2 className="text-xl font-semibold text-pink-800 flex justify-between items-center">
            Binary Tree Data Structure Definition
            <span className="text-pink-600">{isDefinitionOpen ? '▼' : '▶'}</span>
          </h2>
        </button>
        {isDefinitionOpen && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">What is a Binary Tree?</h3>
            <p className="text-gray-700 mb-4">
              A Binary Tree is a hierarchical data structure where each node has at most two children, referred to as the left child and right child. It's a fundamental data structure used in many algorithms and applications.
            </p>
            
            <h3 className="text-lg font-semibold text-pink-700 mb-2">Key Components:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Node:</strong> Contains data and references to left and right children</li>
              <li><strong>Root:</strong> The topmost node of the tree</li>
              <li><strong>Leaf:</strong> A node with no children</li>
              <li><strong>Parent:</strong> A node that has one or more children</li>
              <li><strong>Child:</strong> A node directly connected to another node when moving away from the root</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Types of Binary Trees:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li><strong>Full Binary Tree:</strong> Every node has 0 or 2 children</li>
              <li><strong>Complete Binary Tree:</strong> All levels are filled except possibly the last</li>
              <li><strong>Perfect Binary Tree:</strong> All internal nodes have 2 children and all leaves are at the same level</li>
              <li><strong>Balanced Binary Tree:</strong> Height difference between left and right subtrees is at most 1</li>
              <li><strong>Binary Search Tree (BST):</strong> Left subtree contains smaller values, right subtree contains larger values</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Key Operations:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Insertion:</strong> Add a new node to the tree</li>
              <li><strong>Deletion:</strong> Remove a node from the tree</li>
              <li><strong>Search:</strong> Find a node with specific value</li>
              <li><strong>Traversal:</strong> Visit all nodes in a specific order</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Tree Traversal Methods:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li><strong>In-order:</strong> Left subtree → Root → Right subtree</li>
              <li><strong>Pre-order:</strong> Root → Left subtree → Right subtree</li>
              <li><strong>Post-order:</strong> Left subtree → Right subtree → Root</li>
              <li><strong>Level-order:</strong> Visit nodes level by level from top to bottom</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Time Complexity:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Search: O(h) - Where h is the height of the tree</li>
              <li>Insertion: O(h)</li>
              <li>Deletion: O(h)</li>
              <li>Traversal: O(n) - Where n is the number of nodes</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Space Complexity:</h3>
            <p className="text-gray-700">O(n) - Where n is the number of nodes in the tree</p>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Common Applications:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Expression trees for mathematical expressions</li>
              <li>Huffman coding for data compression</li>
              <li>Binary search trees for efficient searching</li>
              <li>Decision trees in machine learning</li>
              <li>File system organization</li>
              <li>Game trees in AI</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Advantages:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Efficient searching in BSTs (O(log n) in balanced trees)</li>
              <li>Natural representation of hierarchical data</li>
              <li>Flexible structure for various applications</li>
              <li>Efficient insertion and deletion operations</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Disadvantages:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Can become unbalanced, leading to poor performance</li>
              <li>Extra memory needed for child pointers</li>
              <li>Complex implementation compared to linear structures</li>
              <li>May require balancing operations to maintain efficiency</li>
            </ul>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-pink-600">Binary Search Tree</h2>
        {error && (
          <div className="bg-pink-100 border border-pink-400 text-pink-700 px-4 py-3 rounded mb-4" role="alert">
            {error}
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label htmlFor="valueInput" className="block text-sm font-medium text-pink-700 mb-1">
              Value
            </label>
            <div className="flex gap-2">
              <input
                id="valueInput"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1 p-2 border border-pink-200 rounded focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter value"
              />
              <button
                onClick={handleInsert}
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
              >
                Insert
              </button>
              <button
                onClick={handleSearch}
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
          <div className="mt-8 overflow-x-auto">
            <div className="flex justify-center min-w-max">
              {tree ? (
                renderNode(tree)
              ) : (
                <p className="text-gray-500">Tree is empty</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 