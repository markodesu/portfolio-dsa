import { useState } from 'react';

export default function HeapSort() {
  const [arrayInput, setArrayInput] = useState('');
  const [array, setArray] = useState([]);
  const [highlightIndices, setHighlightIndices] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [error, setError] = useState('');
  const [sorted, setSorted] = useState(false);
  const [isDefinitionOpen, setIsDefinitionOpen] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [comparison, setComparison] = useState('');

  const validateInput = (input) => {
    const numbers = input.split(',').map(x => x.trim());
    return numbers.every(num => !isNaN(num) && num !== '');
  };

  const handleInput = () => {
    setError('');
    if (!arrayInput.trim()) {
      setError('Please enter an array of numbers');
      return;
    }
    if (!validateInput(arrayInput)) {
      setError('Please enter valid numbers separated by commas');
      return;
    }
    const arr = arrayInput.split(',').map((x) => parseInt(x.trim()));
    setArray(arr);
    setSorted(false);
    setHighlightIndices([]);
    setAnimationStep(0);
    setComparison('');
  };

  const swap = async (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setArray([...arr]);
    setHighlightIndices([i, j]);
    setComparison(`Swapping ${arr[i]} and ${arr[j]}`);
    setAnimationStep(prev => prev + 1);
    await new Promise((r) => setTimeout(r, 1000));
  };

  const heapify = async (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    setHighlightIndices([i, left, right]);
    setComparison(`Comparing root ${arr[i]} with children`);
    setAnimationStep(prev => prev + 1);
    await new Promise((r) => setTimeout(r, 1000));

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
      setComparison(`Left child ${arr[left]} is larger than root`);
      setAnimationStep(prev => prev + 1);
      await new Promise((r) => setTimeout(r, 1000));
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
      setComparison(`Right child ${arr[right]} is larger than current largest`);
      setAnimationStep(prev => prev + 1);
      await new Promise((r) => setTimeout(r, 1000));
    }

    if (largest !== i) {
      await swap(arr, i, largest);
      await heapify(arr, n, largest);
    }
  };

  const heapSort = async (arr) => {
    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      setComparison(`Building max heap from index ${i}`);
      await heapify(arr, n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      setComparison(`Moving current root ${arr[0]} to end`);
      await swap(arr, 0, i);
      await heapify(arr, i, 0);
    }
  };

  const handleSort = async () => {
    if (array.length === 0) {
      setError('Please enter an array first');
      return;
    }

    setIsSorting(true);
    setError('');
    setSorted(false);
    setHighlightIndices([]);
    setAnimationStep(0);
    setComparison('Starting Heap Sort...');

    const arr = [...array];
    await heapSort(arr);

    setHighlightIndices([]);
    setIsSorting(false);
    setSorted(true);
    setComparison('Array is now sorted!');
  };

  const renderAnimation = () => {
    if (array.length === 0) return null;

    return (
      <div className="relative h-[400px] bg-gradient-to-b from-pink-50 to-white rounded-lg p-6">
        <div className="absolute top-4 left-4 text-pink-600 font-semibold">
          Step {animationStep + 1}
        </div>
        
        {/* Array visualization */}
        <div className="flex justify-center items-center h-full">
          <div className="flex gap-4 items-center">
            {array.map((value, index) => (
              <div
                key={index}
                className={`relative transition-all duration-500 ${
                  highlightIndices.includes(index) ? 'scale-105' : ''
                }`}
              >
                <div
                  className={`w-20 h-24 rounded-lg shadow-lg flex items-center justify-center text-xl font-bold transition-all duration-500
                    ${highlightIndices.includes(index) ? 'bg-pink-300 text-white' :
                      sorted ? 'bg-pink-400 text-white' :
                      'bg-pink-200 text-pink-700'}`}
                  style={{
                    transform: `translateY(${
                      highlightIndices.includes(index) ? '-10px' : '0'
                    })`
                  }}
                >
                  {value}
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-pink-500 bg-white/80 px-2 py-0.5 rounded-full">
                  {index}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison message */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-pink-600 font-medium">
            {comparison}
          </p>
        </div>
      </div>
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
            Heap Sort Definition
            <span className="text-pink-600">{isDefinitionOpen ? '▼' : '▶'}</span>
          </h2>
        </button>
        {isDefinitionOpen && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">What is Heap Sort?</h3>
            <p className="text-gray-700 mb-4">
              Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides the input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element and moving it to the sorted region.
            </p>
            
            <h3 className="text-lg font-semibold text-pink-700 mb-2">How it Works:</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Build a max heap from the input array</li>
              <li>Swap the root element with the last element</li>
              <li>Heapify the reduced heap</li>
              <li>Repeat until the heap is empty</li>
            </ol>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Time Complexity:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Best Case: O(n log n)</li>
              <li>Worst Case: O(n log n)</li>
              <li>Average Case: O(n log n)</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Space Complexity:</h3>
            <p className="text-gray-700">O(1) - In-place sorting algorithm</p>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Input section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">Heap Sort</h2>
          {error && (
            <div className="bg-pink-100 border border-pink-400 text-pink-700 px-4 py-3 rounded mb-4" role="alert">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="arrayInput" className="block text-sm font-medium text-pink-700 mb-1">
                Array Input
              </label>
              <div className="flex gap-2">
                <input
                  id="arrayInput"
                  type="text"
                  value={arrayInput}
                  onChange={(e) => setArrayInput(e.target.value)}
                  placeholder="Enter numbers separated by commas"
                  className="flex-1 p-2 border border-pink-200 rounded focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  aria-describedby="arrayInputHelp"
                />
                <button
                  onClick={handleInput}
                  className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
                >
                  Set Array
                </button>
              </div>
              <p id="arrayInputHelp" className="text-sm text-pink-500 mt-1">
                Example: 5, 3, 8, 4, 2
              </p>
            </div>
            <button
              onClick={handleSort}
              disabled={isSorting || array.length === 0}
              className={`w-full p-2 text-white rounded shadow-md transition-all duration-300 ${
                isSorting || array.length === 0 ? 'bg-pink-300' : 'bg-pink-600 hover:bg-pink-700 hover:scale-105'
              }`}
              aria-busy={isSorting}
            >
              {isSorting ? 'Sorting...' : 'Start Heap Sort'}
            </button>
          </div>
        </div>

        {/* Animation section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">Visualization</h2>
          {renderAnimation()}
        </div>
      </div>
    </div>
  );
}
