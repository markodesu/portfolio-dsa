// components/SearchAlgorithms/LinearSearch.jsx
import React, { useState, useEffect } from 'react';

export default function LinearSearch() {
  const [arrayInput, setArrayInput] = useState('');
  const [target, setTarget] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isDefinitionOpen, setIsDefinitionOpen] = useState(false);
  const [animationArray, setAnimationArray] = useState([]);
  const [animationStep, setAnimationStep] = useState(0);

  const validateInput = (input) => {
    const numbers = input.split(',').map(x => x.trim());
    return numbers.every(num => !isNaN(num) && num !== '');
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

    setIsSearching(true);
    const arr = arrayInput.split(',').map((x) => parseInt(x.trim()));
    setFoundIndex(null);
    setAnimationArray(arr);
    setAnimationStep(0);

    try {
      for (let i = 0; i < arr.length; i++) {
        setHighlightIndex(i);
        setAnimationStep(i);
        await new Promise((r) => setTimeout(r, 500));
        if (arr[i] === parseInt(target)) {
          setFoundIndex(i);
          break;
        }
      }
    } catch (err) {
      setError('An error occurred during search');
    } finally {
      setIsSearching(false);
      setHighlightIndex(null);
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
                index === highlightIndex ? 'bg-pink-300 animate-pulse' : 'bg-pink-400'}`}
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
          Step {animationStep + 1} of {animationArray.length}
        </div>
        
        {/* Array visualization */}
        <div className="flex justify-center items-center h-full">
          <div className="flex gap-4 items-center">
            {animationArray.map((value, index) => (
              <div
                key={index}
                className={`relative transition-all duration-500 ${
                  index === animationStep ? 'scale-110' : ''
                }`}
              >
                <div
                  className={`w-20 h-20 rounded-lg shadow-lg flex items-center justify-center text-2xl font-bold transition-all duration-500
                    ${index === foundIndex ? 'bg-pink-500 text-white' :
                      index === animationStep ? 'bg-pink-300 text-white' :
                      index < animationStep ? 'bg-pink-200 text-pink-700' :
                      'bg-white text-pink-600 border-2 border-pink-200'}`}
                >
                  {value}
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-pink-600">
                  Index {index}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search pointer */}
        {animationStep < animationArray.length && (
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-500"
            style={{
              left: `calc(${(animationStep * 100) / animationArray.length}% + ${(animationStep * 16)}px)`,
            }}
          >
            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-transparent border-b-pink-600"></div>
          </div>
        )}

        {/* Status message */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-pink-600 font-medium">
            {foundIndex !== null 
              ? `Found ${target} at index ${foundIndex}!`
              : animationStep === animationArray.length - 1
                ? `Target ${target} not found in the array`
                : `Searching for ${target}...`}
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
            Linear Search Definition
            <span className="text-pink-600">{isDefinitionOpen ? '▼' : '▶'}</span>
          </h2>
        </button>
        {isDefinitionOpen && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">What is Linear Search?</h3>
            <p className="text-gray-700 mb-4">
              Linear Search is the simplest searching algorithm that checks each element in a list sequentially until the desired element is found or the end of the list is reached.
            </p>
            
            <h3 className="text-lg font-semibold text-pink-700 mb-2">How it Works:</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Start from the first element of the array</li>
              <li>Compare the current element with the target value</li>
              <li>If they match, return the current index</li>
              <li>If they don't match, move to the next element</li>
              <li>Repeat steps 2-4 until the element is found or the end of the array is reached</li>
            </ol>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Time Complexity:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Best Case: O(1) - Element found at first position</li>
              <li>Worst Case: O(n) - Element found at last position or not found</li>
              <li>Average Case: O(n/2) - Element found in the middle</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Space Complexity:</h3>
            <p className="text-gray-700">O(1) - Constant space as it only uses a single variable to store the current index</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Input and controls */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">Linear Search</h2>
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
              <input
                id="arrayInput"
                type="text"
                value={arrayInput}
                onChange={(e) => setArrayInput(e.target.value)}
                placeholder="Enter numbers separated by commas"
                className="w-full p-2 border border-pink-200 rounded focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                aria-describedby="arrayInputHelp"
              />
              <p id="arrayInputHelp" className="text-sm text-pink-500 mt-1">
                Example: 1, 2, 3, 4, 5
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

        {/* Right side - Animation */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">Visualization</h2>
          {renderAnimation()}
        </div>
      </div>
    </div>
  );
}
