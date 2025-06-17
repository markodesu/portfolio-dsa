// components/DataStructures/Queue.jsx
import { useState } from 'react';

export default function Queue() {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isDefinitionOpen, setIsDefinitionOpen] = useState(false);
  const MAX_QUEUE_SIZE = 10;

  const enqueue = () => {
    setError('');
    if (!inputValue.trim()) {
      setError('Please enter a value to enqueue');
      return;
    }
    if (queue.length >= MAX_QUEUE_SIZE) {
      setError('Queue is full! Maximum size is ' + MAX_QUEUE_SIZE);
      return;
    }
    setQueue([...queue, inputValue]);
    setInputValue('');
  };

  const dequeue = () => {
    setError('');
    if (queue.length === 0) {
      setError('Queue is empty!');
      return;
    }
    setQueue(queue.slice(1));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <button
          onClick={() => setIsDefinitionOpen(!isDefinitionOpen)}
          className="w-full text-left bg-pink-100 p-4 rounded-lg hover:bg-pink-200 transition-colors"
        >
          <h2 className="text-xl font-semibold text-pink-800 flex justify-between items-center">
            Queue Data Structure Definition
            <span className="text-pink-600">{isDefinitionOpen ? '▼' : '▶'}</span>
          </h2>
        </button>
        {isDefinitionOpen && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">What is a Queue?</h3>
            <p className="text-gray-700 mb-4">
              A Queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. It's like a line of people waiting for a service, where the first person to join the line is the first to be served.
            </p>
            
            <h3 className="text-lg font-semibold text-pink-700 mb-2">Key Operations:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Enqueue:</strong> Adds an element to the rear of the queue</li>
              <li><strong>Dequeue:</strong> Removes and returns the front element</li>
              <li><strong>Front/Peek:</strong> Returns the front element without removing it</li>
              <li><strong>isEmpty:</strong> Checks if the queue is empty</li>
              <li><strong>Size:</strong> Returns the number of elements in the queue</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Time Complexity:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Enqueue: O(1) - Constant time</li>
              <li>Dequeue: O(1) - Constant time</li>
              <li>Front: O(1) - Constant time</li>
              <li>isEmpty: O(1) - Constant time</li>
              <li>Size: O(1) - Constant time</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Space Complexity:</h3>
            <p className="text-gray-700">O(n) - Where n is the number of elements in the queue</p>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Common Applications:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Task scheduling in operating systems</li>
              <li>Print job management</li>
              <li>Message queues in distributed systems</li>
              <li>Breadth-first search in graphs</li>
              <li>Buffer management in networking</li>
              <li>Event handling in GUI applications</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Types of Queues:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li><strong>Simple Queue:</strong> Basic FIFO queue</li>
              <li><strong>Circular Queue:</strong> Reuses empty spaces</li>
              <li><strong>Priority Queue:</strong> Elements have priority levels</li>
              <li><strong>Double-ended Queue (Deque):</strong> Can add/remove from both ends</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Implementation Methods:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Array-based implementation</li>
              <li>Linked List-based implementation</li>
              <li>Circular array implementation</li>
            </ul>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            {error}
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label htmlFor="queueInput" className="block text-sm font-medium text-gray-700 mb-1">
              Value to Enqueue
            </label>
            <div className="flex gap-2">
              <input
                id="queueInput"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="Enter value"
                aria-describedby="queueInputHelp"
              />
              <button 
                onClick={enqueue} 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                aria-label="Enqueue value"
              >
                Enqueue
              </button>
              <button 
                onClick={dequeue} 
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                aria-label="Dequeue value"
              >
                Dequeue
              </button>
            </div>
            <p id="queueInputHelp" className="text-sm text-gray-500 mt-1">
              Queue size: {queue.length}/{MAX_QUEUE_SIZE}
            </p>
          </div>
          <div 
            className="flex gap-2 min-h-[100px] border-2 border-dashed border-gray-300 rounded p-4 items-center"
            role="list"
            aria-label="Queue elements"
          >
            {queue.length === 0 ? (
              <p className="text-gray-500">Queue is empty</p>
            ) : (
              queue.map((item, index) => (
                <div 
                  key={index} 
                  className="w-20 h-10 bg-teal-500 text-white flex items-center justify-center rounded"
                  role="listitem"
                  aria-label={`Queue element ${index + 1}: ${item}`}
                >
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}