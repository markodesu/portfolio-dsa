// App.jsx
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/home';
import LinearSearch from './components/SearchAlgorithms/LinearSearch';
import BinarySearch from './components/SearchAlgorithms/BinarySearch';
import Stack from './components/DataStructures/Stack';
import Queue from './components/DataStructures/Queue';
import LinkedList from './components/DataStructures/LinkedList';
import HashFunction from './components/DataStructures/HashFunction';
import BinaryTree from './components/Trees/BinaryTree';
import AVL from './components/Trees/AVL';
import RBT from './components/Trees/RBT';
import BubbleSort from './components/SortingAlgorithms/BubbleSort';
import QuickSort from './components/SortingAlgorithms/QuickSort';
import Graph from './components/Graphs/Graph';
import RadixSort from './components/SortingAlgorithms/RadixSort';
import CountingSort from './components/SortingAlgorithms/CountingSort';
import HeapSort from './components/SortingAlgorithms/HeapSort';
import MergeSort from './components/SortingAlgorithms/MergeSort';
import InsertionSort from './components/SortingAlgorithms/InsertionSort';
import SelectionSort from './components/SortingAlgorithms/SelectionSort';

export default function App() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex flex-col">
      <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white p-6 text-center shadow-lg">
        <h1 className="text-3xl font-bold tracking-tight">DSA Dashboard</h1>
        <p className="text-pink-100 mt-2">Interactive Learning Platform</p>
      </header>

      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 py-4">
            <div className="w-full flex justify-center mb-4">
              <Link 
                to="/" 
                className={`text-lg font-semibold px-8 py-2 rounded-full transition-all duration-300 ${
                  isActive('/') 
                    ? 'bg-pink-600 text-white shadow-md' 
                    : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                }`}
              >
                Home
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold text-white bg-pink-600 px-4 py-1 rounded-full mb-2">Search</span>
                <div className="flex gap-3">
                  <Link 
                    to="/search/linear" 
                    className={`px-4 py-2 transition-all duration-300 ${
                      isActive('/search/linear') 
                        ? 'text-pink-600 font-semibold' 
                        : 'text-gray-600 hover:text-pink-600'
                    }`}
                  >
                    Linear
                  </Link>
                  <Link 
                    to="/search/binary" 
                    className={`px-4 py-2 transition-all duration-300 ${
                      isActive('/search/binary') 
                        ? 'text-pink-600 font-semibold' 
                        : 'text-gray-600 hover:text-pink-600'
                    }`}
                  >
                    Binary
                  </Link>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold text-white bg-pink-600 px-4 py-1 rounded-full mb-2">Sort</span>
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                    Sorting Algorithms
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <Link to="/sorting/bubble" className="block px-4 py-2 text-pink-600 hover:bg-pink-50">Bubble Sort</Link>
                    <Link to="/sorting/quick" className="block px-4 py-2 text-pink-600 hover:bg-pink-50">Quick Sort</Link>
                    <Link to="/sorting/merge" className="block px-4 py-2 text-pink-600 hover:bg-pink-50">Merge Sort</Link>
                    <Link to="/sorting/insertion" className="block px-4 py-2 text-pink-600 hover:bg-pink-50">Insertion Sort</Link>
                    <Link to="/sorting/selection" className="block px-4 py-2 text-pink-600 hover:bg-pink-50">Selection Sort</Link>
                    <Link to="/sorting/radix" className="block px-4 py-2 text-pink-600 hover:bg-pink-50">Radix Sort</Link>
                    <Link to="/sorting/counting" className="block px-4 py-2 text-pink-600 hover:bg-pink-50">Counting Sort</Link>
                    <Link to="/sorting/heap" className="block px-4 py-2 text-pink-600 hover:bg-pink-50">Heap Sort</Link>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold text-white bg-pink-600 px-4 py-1 rounded-full mb-2">Data Structures</span>
                <div className="flex gap-3">
                  <Link 
                    to="/stack" 
                    className={`px-4 py-2 transition-all duration-300 ${
                      isActive('/stack') 
                        ? 'text-pink-600 font-semibold' 
                        : 'text-gray-600 hover:text-pink-600'
                    }`}
                  >
                    Stack
                  </Link>
                  <Link 
                    to="/queue" 
                    className={`px-4 py-2 transition-all duration-300 ${
                      isActive('/queue') 
                        ? 'text-pink-600 font-semibold' 
                        : 'text-gray-600 hover:text-pink-600'
                    }`}
                  >
                    Queue
                  </Link>
                  <Link 
                    to="/linkedlist" 
                    className={`px-4 py-2 transition-all duration-300 ${
                      isActive('/linkedlist') 
                        ? 'text-pink-600 font-semibold' 
                        : 'text-gray-600 hover:text-pink-600'
                    }`}
                  >
                    LinkedList
                  </Link>
                  <Link 
                    to="/hashfunction" 
                    className={`px-4 py-2 transition-all duration-300 ${
                      isActive('/hashfunction') 
                        ? 'text-pink-600 font-semibold' 
                        : 'text-gray-600 hover:text-pink-600'
                    }`}
                  >
                    HashFunction
                  </Link>                 
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold text-white bg-pink-600 px-4 py-1 rounded-full mb-2">Trees & Graphs</span>
                <div className="flex gap-3">
                  <div className="relative group">
                    <button className="flex items-center gap-2 px-4 py-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                      Trees
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <Link to="/tree/binary" className="block px-4 py-2 text-pink-600 hover:bg-pink-50">Binary Tree</Link>
                      <Link to="/tree/avl" className="block px-4 py-2 text-pink-600 hover:bg-pink-50">AVL Tree</Link>
                      <Link to="/tree/redblack" className="block px-4 py-2 text-pink-600 hover:bg-pink-50">Red-Black Tree</Link>
                    </div>
                  </div>
                  <Link 
                    to="/graph" 
                    className={`px-4 py-2 transition-all duration-300 ${
                      isActive('/graph') 
                        ? 'text-pink-600 font-semibold' 
                        : 'text-gray-600 hover:text-pink-600'
                    }`}
                  >
                    Graph
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="p-6 max-w-7xl mx-auto flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/linear" element={<LinearSearch />} />
          <Route path="/search/binary" element={<BinarySearch />} />
          <Route path="/sorting/bubble" element={<BubbleSort />} />
          <Route path="/sorting/quick" element={<QuickSort />} />
          <Route path="/sorting/merge" element={<MergeSort />} />
          <Route path="/sorting/insertion" element={<InsertionSort />} />
          <Route path="/sorting/selection" element={<SelectionSort />} />
          <Route path="/sorting/radix" element={<RadixSort />} />
          <Route path="/sorting/counting" element={<CountingSort />} />
          <Route path="/sorting/heap" element={<HeapSort />} />
          <Route path="/stack" element={<Stack />} />
          <Route path="/queue" element={<Queue />} />
          <Route path="/linkedlist" element={<LinkedList />} />
          <Route path="/hashfunction" element={<HashFunction />} />
          <Route path="/tree/binary" element={<BinaryTree />} />
          <Route path="/tree/avl" element={<AVL />} />
          <Route path="/tree/redblack" element={<RBT />} />
          <Route path="/graph" element={<Graph />} />
        </Routes>
      </main>

      <footer className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-pink-100">
            © {new Date().getFullYear()} Mariiam Raiimzhanova DSA Dashboard. All rights reserved.
          </p>
          <p className="text-pink-100 text-sm mt-2">
            Created with ❤️ for educational purposes
          </p>
        </div>
      </footer>
    </div>
  );
}
