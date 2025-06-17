import { useState } from 'react';

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export default function LinkedList() {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [isDefinitionOpen, setIsDefinitionOpen] = useState(false);

  const addToFront = () => {
    setError('');
    if (!value.trim()) {
      setError('Please enter a value');
      return;
    }
    setList([{ value: value.trim(), next: null }, ...list]);
    setValue('');
  };

  const addToEnd = () => {
    setError('');
    if (!value.trim()) {
      setError('Please enter a value');
      return;
    }
    setList([...list, { value: value.trim(), next: null }]);
    setValue('');
  };

  const removeFromFront = () => {
    setError('');
    if (list.length === 0) {
      setError('List is empty');
      return;
    }
    setList(list.slice(1));
  };

  const removeFromEnd = () => {
    setError('');
    if (list.length === 0) {
      setError('List is empty');
      return;
    }
    setList(list.slice(0, -1));
  };

  const search = async () => {
    setError('');
    if (!value.trim()) {
      setError('Please enter a value to search');
      return;
    }
    if (list.length === 0) {
      setError('List is empty');
      return;
    }

    const searchValue = value.trim();
    for (let i = 0; i < list.length; i++) {
      setHighlightIndex(i);
      await new Promise((r) => setTimeout(r, 500));
      if (list[i].value === searchValue) {
        return;
      }
    }
    setError('Value not found');
    setHighlightIndex(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <button
          onClick={() => setIsDefinitionOpen(!isDefinitionOpen)}
          className="w-full text-left bg-pink-100 p-4 rounded-lg hover:bg-pink-200 transition-colors"
        >
          <h2 className="text-xl font-semibold text-pink-800 flex justify-between items-center">
            Linked List Data Structure Definition
            <span className="text-pink-600">{isDefinitionOpen ? '▼' : '▶'}</span>
          </h2>
        </button>
        {isDefinitionOpen && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">What is a Linked List?</h3>
            <p className="text-gray-700 mb-4">
              A Linked List is a linear data structure where elements are stored in nodes, and each node points to the next node in the sequence. Unlike arrays, linked lists don't require contiguous memory allocation.
            </p>
            
            <h3 className="text-lg font-semibold text-pink-700 mb-2">Key Components:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Node:</strong> Contains data and a reference to the next node</li>
              <li><strong>Head:</strong> Reference to the first node</li>
              <li><strong>Tail:</strong> Reference to the last node (in doubly linked lists)</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Types of Linked Lists:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li><strong>Singly Linked List:</strong> Each node points only to the next node</li>
              <li><strong>Doubly Linked List:</strong> Each node points to both next and previous nodes</li>
              <li><strong>Circular Linked List:</strong> Last node points back to the first node</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Key Operations:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Insertion:</strong> Add a node at beginning, end, or specific position</li>
              <li><strong>Deletion:</strong> Remove a node from beginning, end, or specific position</li>
              <li><strong>Traversal:</strong> Visit each node in the list</li>
              <li><strong>Search:</strong> Find a node with specific value</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Time Complexity:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Access: O(n) - Must traverse from head to target</li>
              <li>Search: O(n) - Must check each node</li>
              <li>Insertion at beginning: O(1)</li>
              <li>Insertion at end: O(n) - Must traverse to end</li>
              <li>Deletion at beginning: O(1)</li>
              <li>Deletion at end: O(n) - Must traverse to end</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Space Complexity:</h3>
            <p className="text-gray-700">O(n) - Where n is the number of nodes in the list</p>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Advantages:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Dynamic size - can grow or shrink as needed</li>
              <li>Efficient insertion/deletion at beginning</li>
              <li>No need to pre-allocate memory</li>
              <li>No wasted memory space</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Disadvantages:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>No direct access to elements (must traverse)</li>
              <li>Extra memory needed for pointers</li>
              <li>Not cache-friendly due to non-contiguous memory</li>
              <li>Reverse traversal is difficult in singly linked lists</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Common Applications:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Implementation of stacks and queues</li>
              <li>Undo functionality in software</li>
              <li>Browser history</li>
              <li>Polynomial arithmetic</li>
              <li>Memory management in operating systems</li>
            </ul>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-pink-600">Linked List</h2>
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
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1 p-2 border border-pink-200 rounded focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter value"
              />
              <button
                onClick={search}
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={addToFront}
              className="flex-1 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
            >
              Add to Front
            </button>
            <button
              onClick={addToEnd}
              className="flex-1 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
            >
              Add to End
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={removeFromFront}
              className="flex-1 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
            >
              Remove from Front
            </button>
            <button
              onClick={removeFromEnd}
              className="flex-1 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
            >
              Remove from End
            </button>
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-center gap-4">
              {list.length === 0 ? (
                <p className="text-gray-500">List is empty</p>
              ) : (
                list.map((node, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className={`w-16 h-16 flex items-center justify-center rounded text-white font-bold shadow-md transition-all duration-300
                        ${index === highlightIndex ? 'bg-pink-300 animate-pulse' : 'bg-pink-400'}`}
                    >
                      {node.value}
                    </div>
                    {index < list.length - 1 && (
                      <div className="w-8 h-1 bg-pink-400 relative">
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-pink-400 border-b-8 border-b-transparent"></div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 