import { useState } from 'react';

class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

export default function AVL() {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isDefinitionOpen, setIsDefinitionOpen] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [operation, setOperation] = useState('');

  const getHeight = (node) => {
    if (!node) return 0;
    return node.height;
  };

  const getBalance = (node) => {
    if (!node) return 0;
    return getHeight(node.left) - getHeight(node.right);
  };

  const rightRotate = (y) => {
    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;

    return x;
  };

  const leftRotate = (x) => {
    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;

    return y;
  };

  const insertNode = async (node, value) => {
    if (!node) {
      setHighlightedNode(value);
      setOperation(`Inserting ${value}`);
      setAnimationStep(prev => prev + 1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return new AVLNode(value);
    }

    setHighlightedNode(node.value);
    setOperation(`Comparing ${value} with ${node.value}`);
    setAnimationStep(prev => prev + 1);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (value < node.value) {
      node.left = await insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = await insertNode(node.right, value);
    } else {
      setError('Value already exists in the tree');
      return node;
    }

    node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
    const balance = getBalance(node);

    // Left Left Case
    if (balance > 1 && value < node.left.value) {
      setOperation(`Performing right rotation at ${node.value}`);
      setAnimationStep(prev => prev + 1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && value > node.right.value) {
      setOperation(`Performing left rotation at ${node.value}`);
      setAnimationStep(prev => prev + 1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return leftRotate(node);
    }

    // Left Right Case
    if (balance > 1 && value > node.left.value) {
      setOperation(`Performing left-right rotation at ${node.value}`);
      setAnimationStep(prev => prev + 1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      node.left = leftRotate(node.left);
      return rightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && value < node.right.value) {
      setOperation(`Performing right-left rotation at ${node.value}`);
      setAnimationStep(prev => prev + 1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      node.right = rightRotate(node.right);
      return leftRotate(node);
    }

    return node;
  };

  const handleInsert = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setError('Please enter a valid number');
      return;
    }

    setError('');
    setOperation('Starting insertion...');
    setAnimationStep(0);
    const newRoot = await insertNode(root, value);
    setRoot(newRoot);
    setInputValue('');
    setOperation('Insertion complete!');
  };

  const renderNode = (node, x, y, level) => {
    if (!node) return null;

    const spacing = 100;
    const nodeSize = 50;
    const isHighlighted = highlightedNode === node.value;

    return (
      <g key={node.value} className="transition-all duration-500">
        {/* Lines to children */}
        {node.left && (
          <line
            x1={x}
            y1={y + nodeSize/2}
            x2={x - spacing/level}
            y2={y + 100}
            stroke="pink"
            strokeWidth="2"
            className="transition-all duration-500"
          />
        )}
        {node.right && (
          <line
            x1={x}
            y1={y + nodeSize/2}
            x2={x + spacing/level}
            y2={y + 100}
            stroke="pink"
            strokeWidth="2"
            className="transition-all duration-500"
          />
        )}
        
        {/* Node circle */}
        <circle
          cx={x}
          cy={y}
          r={nodeSize/2}
          fill={isHighlighted ? "#ec4899" : "#fbcfe8"}
          stroke="#be185d"
          strokeWidth="2"
          className="transition-all duration-500"
        />
        
        {/* Node value */}
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={isHighlighted ? "white" : "#be185d"}
          className="font-bold transition-all duration-500"
        >
          {node.value}
        </text>

        {/* Balance factor */}
        <text
          x={x}
          y={y + nodeSize/2 + 15}
          textAnchor="middle"
          fill="#be185d"
          className="text-xs"
        >
          {getBalance(node)}
        </text>

        {/* Recursively render children */}
        {node.left && renderNode(node.left, x - spacing/level, y + 100, level + 1)}
        {node.right && renderNode(node.right, x + spacing/level, y + 100, level + 1)}
      </g>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <button
          onClick={() => setIsDefinitionOpen(!isDefinitionOpen)}
          className="w-full text-left bg-pink-100 p-4 rounded-lg hover:bg-pink-200 transition-colors"
        >
          <h2 className="text-xl font-semibold text-pink-800 flex justify-between items-center">
            AVL Tree Definition
            <span className="text-pink-600">{isDefinitionOpen ? '▼' : '▶'}</span>
          </h2>
        </button>
        {isDefinitionOpen && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">What is an AVL Tree?</h3>
            <p className="text-gray-700 mb-4">
              An AVL tree is a self-balancing binary search tree where the heights of the left and right subtrees of any node differ by at most one.
            </p>
            
            <h3 className="text-lg font-semibold text-pink-700 mb-2">Key Features:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Self-balancing property</li>
              <li>Height-balanced tree</li>
              <li>O(log n) time complexity for operations</li>
              <li>Uses rotations to maintain balance</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Operations:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Insertion: O(log n)</li>
              <li>Deletion: O(log n)</li>
              <li>Search: O(log n)</li>
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Input section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">AVL Tree</h2>
          {error && (
            <div className="bg-pink-100 border border-pink-400 text-pink-700 px-4 py-3 rounded mb-4" role="alert">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="nodeValue" className="block text-sm font-medium text-pink-700 mb-1">
                Node Value
              </label>
              <div className="flex gap-2">
                <input
                  id="nodeValue"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a number"
                  className="flex-1 p-2 border border-pink-200 rounded focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
                <button
                  onClick={handleInsert}
                  className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
                >
                  Insert
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Visualization section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">Visualization</h2>
          <div className="relative h-[600px] bg-gradient-to-b from-pink-50 to-white rounded-lg">
            <div className="absolute top-4 left-4 text-pink-600 font-semibold">
              Step {animationStep + 1}
            </div>
            <div className="absolute top-4 right-4 text-pink-600 font-medium">
              {operation}
            </div>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 600"
              className="transition-all duration-500"
            >
              {root && renderNode(root, 400, 50, 1)}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
} 