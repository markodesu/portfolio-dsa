import React, { useState } from 'react';

const HashFunction = () => {
  const [mod, setMod] = useState(7);
  const [inputValue, setInputValue] = useState('');
  const [collisionStrategy, setCollisionStrategy] = useState('chaining');
  const [table, setTable] = useState(Array.from({ length: 7 }, () => []));
  const [error, setError] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const hash = (key) => {
    return key % mod;
  };

  const insert = () => {
    const num = parseInt(inputValue);
    if (isNaN(num)) {
      setError('Please enter a valid number');
      return;
    }
    setError('');
    const index = hash(num);

    if (collisionStrategy === 'chaining') {
      const newTable = [...table];
      newTable[index] = [...newTable[index], num];
      setTable(newTable);
    } else {
      const newTable = [...table];
      let i = 0;
      let newIndex = index;
      let attempts = 0;

      while (attempts < mod) {
        if (
          typeof newTable[newIndex] === 'number' &&
          !isNaN(newTable[newIndex])
        ) {
          if (collisionStrategy === 'linear') {
            i++;
            newIndex = (index + i) % mod;
          } else if (collisionStrategy === 'quadratic') {
            i++;
            newIndex = (index + i * i) % mod;
          } else if (collisionStrategy === 'double') {
            const h2 = 1 + (num % (mod - 1));
            newIndex = (index + i * h2) % mod;
            i++;
          }
        } else {
          newTable[newIndex] = num;
          setTable(newTable);
          return;
        }
        attempts++;
      }
      setError('Hash table is full or insertion failed due to collisions.');
    }

    setInputValue('');
  };

  const clearTable = () => {
    setTable(
      collisionStrategy === 'chaining'
        ? Array.from({ length: mod }, () => [])
        : Array.from({ length: mod }, () => null)
    );
    setError('');
  };

  const handleModChange = (e) => {
    const newMod = parseInt(e.target.value);
    if (!isNaN(newMod) && newMod > 0) {
      setMod(newMod);
      clearTable();
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">Hash Function Visualization</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-300 px-3 py-1 rounded"
          placeholder="Enter number"
        />
        <select
          value={collisionStrategy}
          onChange={(e) => {
            setCollisionStrategy(e.target.value);
            clearTable();
          }}
          className="border border-gray-300 px-3 py-1 rounded"
        >
          <option value="chaining">Open Hashing (Chaining)</option>
          <option value="linear">Closed Hashing (Linear Probing)</option>
          <option value="quadratic">Closed Hashing (Quadratic Probing)</option>
          <option value="double">Closed Hashing (Double Hashing)</option>
        </select>
        <input
          type="number"
          value={mod}
          onChange={handleModChange}
          className="border border-gray-300 px-3 py-1 rounded w-20"
          placeholder="Mod"
        />
        <button
          onClick={insert}
          className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700"
        >
          Insert
        </button>
        <button
          onClick={clearTable}
          className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
        >
          Clear
        </button>
      </div>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      {/* Rolling definition section */}
      <div className="mb-4">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="text-pink-600 underline mb-2 focus:outline-none"
        >
          {showInfo ? 'Hide Definitions ▲' : 'What is Open and Closed Hashing? ▼'}
        </button>

        {showInfo && (
          <div className="bg-pink-50 border border-pink-300 text-sm p-4 rounded transition-all duration-300">
            <p className="mb-2">
              <strong>Open Hashing (Chaining):</strong> Each bucket holds a list. When collisions occur, values are appended to that bucket’s list.
            </p>
            <p>
              <strong>Closed Hashing (Open Addressing):</strong> All values are stored directly in the table. Collisions are resolved by finding another open slot using linear, quadratic, or double hashing.
            </p>
          </div>
        )}
      </div>

      {/* Table Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {table.map((cell, idx) => (
          <div key={idx} className="border border-gray-300 rounded p-3">
            <p className="font-semibold text-gray-700 mb-1">Index {idx}:</p>
            {collisionStrategy === 'chaining' ? (
              <div className="flex flex-wrap gap-2">
                {cell.map((val, i) => (
                  <span key={i} className="bg-pink-200 text-pink-800 px-2 py-1 rounded">
                    {val}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-pink-700 font-medium">
                {cell !== null ? cell : '—'}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HashFunction;
