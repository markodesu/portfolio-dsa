import { useState } from 'react';

export default function BinarySearch() {
  const [arrayInput, setArrayInput] = useState('');
  const [target, setTarget] = useState('');
  const [highlightIndices, setHighlightIndices] = useState([]);
  const [foundIndex, setFoundIndex] = useState(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isDefinitionOpen, setIsDefinitionOpen] = useState(false);
  const [animationArray, setAnimationArray] = useState([]);
  const [animationStep, setAnimationStep] = useState(0);
  const [searchRange, setSearchRange] = useState({ left: 0, right: 0 });
  const [comparison, setComparison] = useState('');

  const validateInput = (input) => {
    const numbers = input.split(',').map(x => x.trim());
    return numbers.every(num => !isNaN(num) && num !== '');
  };

  const isSorted = (arr) => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  };

  const handleSearch = async () => {
    setError('');
    if (!arrayInput.trim()) {
      setError('Please enter an array of numbers');
      return;
    }
    if (!target.trim()) {
      setError('Please enter a target number');
      return;
    }
    if (!validateInput(arrayInput)) {
      setError('Please enter valid numbers separated by commas');
      return;
    }

    const arr = arrayInput.split(',').map((x) => parseInt(x.trim()));
    if (!isSorted(arr)) {
      setError('Array must be sorted for binary search');
      return;
    }

    setIsSearching(true);
    setFoundIndex(null);
    setHighlightIndices([]);
    setAnimationArray(arr);
    setAnimationStep(0);
    setSearchRange({ left: 0, right: arr.length - 1 });
    setComparison('');

    try {
      let left = 0;
      let right = arr.length - 1;
      const targetNum = parseInt(target);
      let step = 0;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        setHighlightIndices([left, mid, right]);
        setSearchRange({ left, right });
        setAnimationStep(step);
        
        if (arr[mid] === targetNum) {
          setComparison(`Found ${targetNum} at index ${mid}!`);
          setFoundIndex(mid);
          break;
        }

        if (arr[mid] < targetNum) {
          setComparison(`${targetNum} > ${arr[mid]}, searching right half`);
          left = mid + 1;
        } else {
          setComparison(`${targetNum} < ${arr[mid]}, searching left half`);
          right = mid - 1;
        }

        await new Promise((r) => setTimeout(r, 2000));
        step++;
      }

      if (left > right) {
        setComparison(`Target ${targetNum} not found in the array`);
      }
    } catch (err) {
      setError('An error occurred during search');
    } finally {
      setIsSearching(false);
      setHighlightIndices([]);
    }
  };

  const renderBoxes = () => {
    if (!arrayInput.trim()) return null;
    
    const arr = arrayInput.split(',').map((x) => parseInt(x.trim()));
    return (
      <div className="flex gap-2 justify-center mt-4 flex-wrap" role="list" aria-label="Array elements">
        {arr.map((value, index) => (
          <div
            key={index}
            className={`w-12 h-12 flex items-center justify-center rounded text-white font-bold shadow-md transition-all duration-300
              ${index === foundIndex ? 'bg-pink-500 scale-110' :
                highlightIndices.includes(index) ? 'bg-pink-300 animate-pulse' : 'bg-pink-400'}`}
            role="listitem"
            aria-label={`Element ${index}: ${value}`}
          >
            {value}
          </div>
        ))}
      </div>
    );
  };

  const renderAnimation = () => {
    if (!animationArray.length) return null;

    return (
      <div className="relative h-[400px] bg-gradient-to-b from-pink-50 to-white rounded-lg p-6">
        <div className="absolute top-4 left-4 text-pink-600 font-semibold">
          Step {animationStep + 1}
        </div>
        
        {/* Array visualization */}
        <div className="flex justify-center items-center h-full">
          <div className="flex gap-4 items-center">
            {animationArray.map((value, index) => (
              <div
                key={index}
                className={`relative transition-all duration-500 ${
                  index === highlightIndices[1] ? 'scale-110' : ''
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-lg shadow-lg flex items-center justify-center text-xl font-bold transition-all duration-500
                    ${index === foundIndex ? 'bg-pink-500 text-white' :
                      index === highlightIndices[1] ? 'bg-pink-300 text-white' :
                      index >= searchRange.left && index <= searchRange.right ? 'bg-pink-200 text-pink-700' :
                      'bg-white text-pink-600 border-2 border-pink-200 opacity-50'}`}
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

        {/* Middle pointer */}
        {highlightIndices[1] !== undefined && (
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-500"
            style={{
              left: `calc(${(highlightIndices[1] * 100) / animationArray.length}% + ${(highlightIndices[1] * 16)}px)`,
            }}
          >
            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-transparent border-b-pink-600"></div>
            <div className="text-pink-600 font-medium text-center mt-2">Mid</div>
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
            Binary Search Definition
            <span className="text-pink-600">{isDefinitionOpen ? '▼' : '▶'}</span>
          </h2>
        </button>
        {isDefinitionOpen && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">What is Binary Search?</h3>
            <p className="text-gray-700 mb-4">
              Binary Search is an efficient searching algorithm that works on sorted arrays by repeatedly dividing the search interval in half. It's much faster than linear search for large datasets.
            </p>
            
            <h3 className="text-lg font-semibold text-pink-700 mb-2">How it Works:</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Compare the target value with the middle element of the array</li>
              <li>If they match, return the middle index</li>
              <li>If the target is less than the middle element, search the left half</li>
              <li>If the target is greater than the middle element, search the right half</li>
              <li>Repeat steps 1-4 until the element is found or the search interval is empty</li>
            </ol>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Time Complexity:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Best Case: O(1) - Element found at middle position</li>
              <li>Worst Case: O(log n) - Element not found or found at last step</li>
              <li>Average Case: O(log n) - Element found after several steps</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Space Complexity:</h3>
            <p className="text-gray-700">O(1) - Constant space as it only uses a few variables to store indices</p>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Important Note:</h3>
            <p className="text-gray-700">Binary Search requires the array to be sorted. If the array is not sorted, you must sort it first, which would add O(n log n) to the time complexity.</p>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Input section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">Binary Search</h2>
          {error && (
            <div className="bg-pink-100 border border-pink-400 text-pink-700 px-4 py-3 rounded mb-4" role="alert">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="arrayInput" className="block text-sm font-medium text-pink-700 mb-1">
                Sorted Array Input
              </label>
              <input
                id="arrayInput"
                type="text"
                value={arrayInput}
                onChange={(e) => setArrayInput(e.target.value)}
                placeholder="Enter sorted numbers separated by commas"
                className="w-full p-2 border border-pink-200 rounded focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                aria-describedby="arrayInputHelp"
              />
              <p id="arrayInputHelp" className="text-sm text-pink-500 mt-1">
                Example: 1, 2, 3, 4, 5 (must be sorted)
              </p>
            </div>
            <div>
              <label htmlFor="targetInput" className="block text-sm font-medium text-pink-700 mb-1">
                Target Number
              </label>
              <input
                id="targetInput"
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Enter target number"
                className="w-full p-2 border border-pink-200 rounded focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className={`w-full p-2 text-white rounded shadow-md transition-all duration-300 ${
                isSearching ? 'bg-pink-300' : 'bg-pink-600 hover:bg-pink-700 hover:scale-105'
              }`}
              aria-busy={isSearching}
            >
              {isSearching ? 'Searching...' : 'Start Search'}
            </button>
          </div>
          {renderBoxes()}
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
