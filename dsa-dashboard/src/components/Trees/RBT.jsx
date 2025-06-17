import { useState } from 'react';

class RBNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.color = 'red'; // New nodes are always red
  }
}

export default function RBT() {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isDefinitionOpen, setIsDefinitionOpen] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [operation, setOperation] = useState('');

  const rotateLeft = (node) => {
    const rightChild = node.right;
    node.right = rightChild.left;
    
    if (rightChild.left) {
      rightChild.left.parent = node;
    }
    
    rightChild.parent = node.parent;
    
    if (!node.parent) {
      setRoot(rightChild);
    } else if (node === node.parent.left) {
      node.parent.left = rightChild;
    } else {
      node.parent.right = rightChild;
    }
    
    rightChild.left = node;
    node.parent = rightChild;
  };

  const rotateRight = (node) => {
    const leftChild = node.left;
    node.left = leftChild.right;
    
    if (leftChild.right) {
      leftChild.right.parent = node;
    }
    
    leftChild.parent = node.parent;
    
    if (!node.parent) {
      setRoot(leftChild);
    } else if (node === node.parent.right) {
      node.parent.right = leftChild;
    } else {
      node.parent.left = leftChild;
    }
    
    leftChild.right = node;
    node.parent = leftChild;
  };

  const fixViolation = async (node) => {
    let parent = null;
    let grandparent = null;

    while (node !== root && node.color === 'red' && node.parent.color === 'red') {
      parent = node.parent;
      grandparent = parent.parent;

      if (parent === grandparent.left) {
        const uncle = grandparent.right;

        if (uncle && uncle.color === 'red') {
          setOperation('Case 1: Uncle is red - Recoloring');
          setAnimationStep(prev => prev + 1);
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          grandparent.color = 'red';
          parent.color = 'black';
          uncle.color = 'black';
          node = grandparent;
        } else {
          if (node === parent.right) {
            setOperation('Case 2: Uncle is black and node is right child - Left rotation');
            setAnimationStep(prev => prev + 1);
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            rotateLeft(parent);
            node = parent;
            parent = node.parent;
          }

          setOperation('Case 3: Uncle is black and node is left child - Right rotation and recoloring');
          setAnimationStep(prev => prev + 1);
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          rotateRight(grandparent);
          const temp = parent.color;
          parent.color = grandparent.color;
          grandparent.color = temp;
          node = parent;
        }
      } else {
        const uncle = grandparent.left;

        if (uncle && uncle.color === 'red') {
          setOperation('Case 1: Uncle is red - Recoloring');
          setAnimationStep(prev => prev + 1);
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          grandparent.color = 'red';
          parent.color = 'black';
          uncle.color = 'black';
          node = grandparent;
        } else {
          if (node === parent.left) {
            setOperation('Case 2: Uncle is black and node is left child - Right rotation');
            setAnimationStep(prev => prev + 1);
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            rotateRight(parent);
            node = parent;
            parent = node.parent;
          }

          setOperation('Case 3: Uncle is black and node is right child - Left rotation and recoloring');
          setAnimationStep(prev => prev + 1);
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          rotateLeft(grandparent);
          const temp = parent.color;
          parent.color = grandparent.color;
          grandparent.color = temp;
          node = parent;
        }
      }
    }

    root.color = 'black';
  };

  const insertNode = async (value) => {
    const newNode = new RBNode(value);
    
    if (!root) {
      setOperation('Inserting root node');
      setAnimationStep(prev => prev + 1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      newNode.color = 'black';
      setRoot(newNode);
      return;
    }

    let current = root;
    let parent = null;

    while (current) {
      setHighlightedNode(current.value);
      setOperation(`Comparing ${value} with ${current.value}`);
      setAnimationStep(prev => prev + 1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      parent = current;
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        setError('Value already exists in the tree');
        return;
      }
    }

    newNode.parent = parent;
    if (value < parent.value) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    await fixViolation(newNode);
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
    await insertNode(value);
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
            stroke={node.color === 'red' ? '#ef4444' : '#1f2937'}
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
            stroke={node.color === 'red' ? '#ef4444' : '#1f2937'}
            strokeWidth="2"
            className="transition-all duration-500"
          />
        )}
        
        {/* Node circle */}
        <circle
          cx={x}
          cy={y}
          r={nodeSize/2}
          fill={isHighlighted ? "#ec4899" : node.color === 'red' ? "#fecaca" : "#e5e7eb"}
          stroke={node.color === 'red' ? "#ef4444" : "#1f2937"}
          strokeWidth="2"
          className="transition-all duration-500"
        />
        
        {/* Node value */}
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={isHighlighted ? "white" : node.color === 'red' ? "#ef4444" : "#1f2937"}
          className="font-bold transition-all duration-500"
        >
          {node.value}
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
            Red-Black Tree Definition
            <span className="text-pink-600">{isDefinitionOpen ? '▼' : '▶'}</span>
          </h2>
        </button>
        {isDefinitionOpen && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">What is a Red-Black Tree?</h3>
            <p className="text-gray-700 mb-4">
              A Red-Black Tree is a self-balancing binary search tree where each node has an extra bit for denoting the color of the node, either red or black.
            </p>
            
            <h3 className="text-lg font-semibold text-pink-700 mb-2">Key Properties:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Every node is either red or black</li>
              <li>The root is always black</li>
              <li>If a node is red, both its children are black</li>
              <li>Every path from root to leaves contains the same number of black nodes</li>
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
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">Red-Black Tree</h2>
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