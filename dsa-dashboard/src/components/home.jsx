import { Link } from 'react-router-dom';

export default function Home() {
  const sections = [
    {
      title: 'Search Algorithms',
      icon: '🔍',
      items: [
        { name: 'Linear Search', path: '/search/linear', description: 'Simple sequential search algorithm' },
        { name: 'Binary Search', path: '/search/binary', description: 'Efficient search for sorted arrays' }
      ]
    },
    {
      title: 'Sorting Algorithms',
      icon: '🔄',
      items: [
        { name: 'Bubble Sort', path: '/sorting/bubble', description: 'Simple comparison-based sorting' },
        { name: 'Quick Sort', path: '/sorting/quick', description: 'Efficient divide-and-conquer sorting' }
      ]
    },
    {
      title: 'Data Structures',
      icon: '📚',
      items: [
        { name: 'Stack', path: '/stack', description: 'LIFO (Last In First Out) structure' },
        { name: 'Queue', path: '/queue', description: 'FIFO (First In First Out) structure' },
        { name: 'Linked List', path: '/linkedlist', description: 'Dynamic linear data structure' },
      ]
    },
    {
      title: 'Trees & Graphs',
      icon: '🌳',
      items: [
        { name: 'Binary Tree', path: '/tree/binary', description: 'Hierarchical data structure' },
        { name: 'Graph', path: '/graph', description: 'Network of connected nodes' }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-pink-600 mb-6 tracking-tight">
          Welcome to DSA Dashboard
        </h1>
        <p className="text-gray-600 text-xl max-w-2xl mx-auto">
          Interactive visualization and learning platform for Data Structures and Algorithms
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
            <div className="bg-gradient-to-r from-pink-600 to-pink-500 p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  to={item.path}
                  className="block p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-all duration-300 transform hover:translate-x-2"
                >
                  <h3 className="text-lg font-medium text-pink-700 mb-2">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-pink-600 to-pink-500 rounded-xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-semibold mb-6">About This Dashboard</h2>
        <p className="text-pink-100 mb-6 text-lg">
          This interactive dashboard provides visualizations and explanations of common data structures and algorithms.
          Each section includes:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">📝 Detailed Explanations</h3>
            <p className="text-pink-100">Comprehensive definitions and step-by-step breakdowns</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">🎯 Interactive Visualizations</h3>
            <p className="text-pink-100">Real-time demonstrations of algorithms in action</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">⚡ Performance Analysis</h3>
            <p className="text-pink-100">Time and space complexity breakdowns</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">🔍 Step-by-Step Guide</h3>
            <p className="text-pink-100">Detailed walkthroughs of each algorithm</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">💡 Use Cases</h3>
            <p className="text-pink-100">Real-world applications and examples</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">📊 Complexity Analysis</h3>
            <p className="text-pink-100">Best, worst, and average case scenarios</p>
          </div>
        </div>
      </div>
    </div>
  );
}