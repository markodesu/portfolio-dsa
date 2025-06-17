import { useState } from 'react';

export default function CountingSort() {
  const [arrayInput, setArrayInput] = useState('');
  const [array, setArray] = useState([]);
  const [highlightIndices, setHighlightIndices] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [error, setError] = useState('');
  const [sorted, setSorted] = useState(false);
  const [isDefinitionOpen, setIsDefinitionOpen] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [comparison, setComparison] = useState('');
  const [countArray, setCountArray] = useState([]);

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
    setCountArray([]);
  };

  const getMax = (arr) => {
    return Math.max(...arr);
  };

  const countingSort = async (arr) => {
    const n = arr.length;
    const max = getMax(arr);
    const count = new Array(max + 1).fill(0);
    const output = new Array(n);

    // Store count of each element
    for (let i = 0; i < n; i++) {
      count[arr[i]]++;
      setHighlightIndices([i]);
      setComparison(`Counting occurrence of ${arr[i]}`);
      setCountArray([...count]);
      setAnimationStep(prev => prev + 1);
      await new Promise((r) => setTimeout(r, 1000));
    }

    // Change count[i] so that count[i] contains actual position
    for (let i = 1; i <= max; i++) {
      count[i] += count[i - 1];
      setCountArray([...count]);
      setComparison(`Updating position for value ${i}`);
      setAnimationStep(prev => prev + 1);
      await new Promise((r) => setTimeout(r, 1000));
    }

    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
      output[count[arr[i]] - 1] = arr[i];
      count[arr[i]]--;
      setHighlightIndices([i]);
      setComparison(`Placing ${arr[i]} in its final position`);
      setCountArray([...count]);
      setAnimationStep(prev => prev + 1);
      await new Promise((r) => setTimeout(r, 1000));
    }

    // Copy the output array to arr
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      setArray([...arr]);
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
    setComparison('Starting Counting Sort...');
    setCountArray([]);

    const arr = [...array];
    await countingSort(arr);

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

        {/* Count array visualization */}
        {countArray.length > 0 && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-2 items-end">
              {countArray.map((count, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center text-sm">
                    {count}
                  </div>
                  <div className="text-xs text-pink-500 mt-1">{index}</div>
                </div>
              ))}
            </div>
          </div>
        )}

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
            Counting Sort Definition
            <span className="text-pink-600">{isDefinitionOpen ? '▼' : '▶'}</span>
          </h2>
        </button>
        {isDefinitionOpen && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">What is Counting Sort?</h3>
            <p className="text-gray-700 mb-4">
              Counting Sort is a non-comparative sorting algorithm that sorts elements by counting the occurrences of each unique element in the array.
            </p>
            
            <h3 className="text-lg font-semibold text-pink-700 mb-2">How it Works:</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Count the occurrences of each element</li>
              <li>Calculate the position of each element in the output array</li>
              <li>Place elements in their correct positions</li>
            </ol>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Time Complexity:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Best Case: O(n + k) - where k is the range of input</li>
              <li>Worst Case: O(n + k)</li>
              <li>Average Case: O(n + k)</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Space Complexity:</h3>
            <p className="text-gray-700">O(n + k) - where k is the range of input</p>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Input section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">Counting Sort</h2>
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
              {isSorting ? 'Sorting...' : 'Start Counting Sort'}
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
