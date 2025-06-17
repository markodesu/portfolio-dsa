import { useState, useEffect } from 'react';

export default function Graph() {
  const [graph, setGraph] = useState({});
  const [startNode, setStartNode] = useState('');
  const [endNode, setEndNode] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');
  const [isDefinitionOpen, setIsDefinitionOpen] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [highlightedEdges, setHighlightedEdges] = useState([]);
  const [operation, setOperation] = useState('');
  const [algorithm, setAlgorithm] = useState('dfs');
  const [result, setResult] = useState('');
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [distances, setDistances] = useState({});
  const [mstEdges, setMstEdges] = useState([]);
  const [nodePositions, setNodePositions] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [dragNode, setDragNode] = useState(null);

  const addEdge = () => {
    if (!startNode || !endNode) {
      setError('Please enter both start and end nodes');
      return;
    }

    setError('');
    setOperation('Adding edge...');
    setAnimationStep(0);
    setHighlightedNodes([startNode, endNode]);

    const newGraph = { ...graph };
    if (!newGraph[startNode]) newGraph[startNode] = {};
    if (!newGraph[endNode]) newGraph[endNode] = {};

    const edgeWeight = weight ? parseInt(weight) : 1;
    newGraph[startNode][endNode] = edgeWeight;
    newGraph[endNode][startNode] = edgeWeight;

    setGraph(newGraph);
    setStartNode('');
    setEndNode('');
    setWeight('');
    setOperation('Edge added successfully!');
  };

  const removeEdge = () => {
    if (!startNode || !endNode) {
      setError('Please enter both start and end nodes');
      return;
    }

    setError('');
    setOperation('Removing edge...');
    setAnimationStep(0);
    setHighlightedNodes([startNode, endNode]);

    const newGraph = { ...graph };
    if (newGraph[startNode]) delete newGraph[startNode][endNode];
    if (newGraph[endNode]) delete newGraph[endNode][startNode];

    setGraph(newGraph);
    setStartNode('');
    setEndNode('');
    setWeight('');
    setOperation('Edge removed successfully!');
  };

  const dfs = async (start) => {
    if (!graph[start]) {
      setError('Start node does not exist in the graph');
      return;
    }

    const visited = new Set();
    const path = [];
    setAnimationStep(0);
    setOperation('Starting DFS...');
    setHighlightedNodes([]);
    setHighlightedEdges([]);
    setVisitedNodes(new Set());

    const dfsHelper = async (node) => {
      if (visited.has(node)) return;
      
      visited.add(node);
      path.push(node);
      setVisitedNodes(new Set(visited));
      setHighlightedNodes([...visited]);
      setOperation(`Visiting node: ${node}`);
      setAnimationStep(prev => prev + 1);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const neighbors = Object.keys(graph[node] || {}).sort();
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          setHighlightedEdges([`${node}-${neighbor}`]);
          await new Promise(resolve => setTimeout(resolve, 500));
          await dfsHelper(neighbor);
        }
      }
    };

    try {
      await dfsHelper(start);
      setResult(`DFS Path: ${path.join(' → ')}`);
      setOperation('DFS complete!');
    } catch (error) {
      setError('Error during DFS traversal');
      console.error('DFS Error:', error);
    }
  };

  const bfs = async (start) => {
    if (!graph[start]) {
      setError('Start node does not exist in the graph');
      return;
    }

    const visited = new Set();
    const queue = [start];
    const path = [];
    setAnimationStep(0);
    setOperation('Starting BFS...');
    setHighlightedNodes([]);
    setHighlightedEdges([]);
    setVisitedNodes(new Set());

    try {
      while (queue.length > 0) {
        const current = queue.shift();
        
        if (!visited.has(current)) {
          visited.add(current);
          path.push(current);
          setVisitedNodes(new Set(visited));
          setHighlightedNodes([...visited]);
          setOperation(`Visiting node: ${current}`);
          setAnimationStep(prev => prev + 1);
          await new Promise(resolve => setTimeout(resolve, 1000));

          const neighbors = Object.keys(graph[current] || {}).sort();
          for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
              queue.push(neighbor);
              setHighlightedEdges([`${current}-${neighbor}`]);
              await new Promise(resolve => setTimeout(resolve, 500));
            }
          }
        }
      }

      setResult(`BFS Path: ${path.join(' → ')}`);
      setOperation('BFS complete!');
    } catch (error) {
      setError('Error during BFS traversal');
      console.error('BFS Error:', error);
    }
  };

  const dijkstra = async (start) => {
    if (!graph[start]) {
      setError('Start node does not exist in the graph');
      return;
    }

    const distances = {};
    const previous = {};
    const unvisited = new Set();
    setAnimationStep(0);
    setOperation('Starting Dijkstra\'s algorithm...');
    setHighlightedNodes([]);
    setHighlightedEdges([]);
    setVisitedNodes(new Set());

    // Initialize distances
    for (const node in graph) {
      distances[node] = Infinity;
      previous[node] = null;
      unvisited.add(node);
    }
    distances[start] = 0;

    try {
      while (unvisited.size > 0) {
        // Find node with smallest distance
        let current = null;
        let smallestDistance = Infinity;
        for (const node of unvisited) {
          if (distances[node] < smallestDistance) {
            current = node;
            smallestDistance = distances[node];
          }
        }

        if (current === null) break;

        unvisited.delete(current);
        setVisitedNodes(prev => new Set([...prev, current]));
        setHighlightedNodes([current]);
        setOperation(`Processing node: ${current} (distance: ${distances[current]})`);
        setAnimationStep(prev => prev + 1);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Update distances to neighbors
        for (const neighbor in graph[current]) {
          if (unvisited.has(neighbor)) {
            const distance = distances[current] + graph[current][neighbor];
            if (distance < distances[neighbor]) {
              distances[neighbor] = distance;
              previous[neighbor] = current;
              setHighlightedEdges([`${current}-${neighbor}`]);
              await new Promise(resolve => setTimeout(resolve, 500));
            }
          }
        }
      }

      // Build result string
      const result = Object.entries(distances)
        .map(([node, dist]) => `${node}: ${dist === Infinity ? '∞' : dist}`)
        .join(', ');
      setResult(`Shortest distances from ${start}: ${result}`);
      setOperation('Dijkstra\'s algorithm complete!');
    } catch (error) {
      setError('Error during Dijkstra\'s algorithm');
      console.error('Dijkstra Error:', error);
    }
  };

  const prim = async (start) => {
    if (!graph[start]) {
      setError('Start node does not exist in the graph');
      return;
    }

    const visited = new Set([start]);
    const mst = [];
    setAnimationStep(0);
    setOperation('Starting Prim\'s algorithm...');
    setHighlightedNodes([start]);
    setHighlightedEdges([]);
    setVisitedNodes(new Set([start]));

    try {
      while (visited.size < Object.keys(graph).length) {
        let minEdge = null;
        let minWeight = Infinity;

        // Find minimum weight edge from visited to unvisited
        for (const node of visited) {
          for (const neighbor in graph[node]) {
            if (!visited.has(neighbor) && graph[node][neighbor] < minWeight) {
              minEdge = [node, neighbor];
              minWeight = graph[node][neighbor];
            }
          }
        }

        if (minEdge === null) break;

        const [from, to] = minEdge;
        visited.add(to);
        mst.push([from, to, minWeight]);
        setVisitedNodes(new Set(visited));
        setHighlightedNodes([...visited]);
        setHighlightedEdges([...mst.map(([f, t]) => `${f}-${t}`)]);
        setOperation(`Adding edge: ${from}-${to} (weight: ${minWeight})`);
        setAnimationStep(prev => prev + 1);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setMstEdges(mst);
      setResult(`MST Edges: ${mst.map(([from, to, weight]) => `${from}-${to}(${weight})`).join(', ')}`);
      setOperation('Prim\'s algorithm complete!');
    } catch (error) {
      setError('Error during Prim\'s algorithm');
      console.error('Prim Error:', error);
    }
  };

  const kruskal = async () => {
    const edges = [];
    const parent = {};
    const rank = {};
    setAnimationStep(0);
    setOperation('Starting Kruskal\'s algorithm...');
    setHighlightedNodes([]);
    setHighlightedEdges([]);

    // Initialize disjoint sets
    for (const node in graph) {
      parent[node] = node;
      rank[node] = 0;
    }

    // Collect all edges
    for (const node in graph) {
      for (const neighbor in graph[node]) {
        if (node < neighbor) { // Avoid duplicate edges
          edges.push([node, neighbor, graph[node][neighbor]]);
        }
      }
    }

    // Sort edges by weight
    edges.sort((a, b) => a[2] - b[2]);

    const find = (node) => {
      if (parent[node] !== node) {
        parent[node] = find(parent[node]);
      }
      return parent[node];
    };

    const union = (x, y) => {
      const rootX = find(x);
      const rootY = find(y);

      if (rootX === rootY) return;

      if (rank[rootX] < rank[rootY]) {
        parent[rootX] = rootY;
      } else if (rank[rootX] > rank[rootY]) {
        parent[rootY] = rootX;
      } else {
        parent[rootY] = rootX;
        rank[rootX]++;
      }
    };

    const mst = [];
    for (const [from, to, weight] of edges) {
      if (find(from) !== find(to)) {
        mst.push([from, to, weight]);
        union(from, to);
        setHighlightedNodes([from, to]);
        setHighlightedEdges([...mst.map(([f, t]) => `${f}-${t}`)]);
        setOperation(`Adding edge: ${from}-${to} (weight: ${weight})`);
        setAnimationStep(prev => prev + 1);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    setMstEdges(mst);
    setResult(`MST Edges: ${mst.map(([from, to, weight]) => `${from}-${to}(${weight})`).join(', ')}`);
    setOperation('Kruskal\'s algorithm complete!');
  };

  const runAlgorithm = async () => {
    if (!startNode && algorithm !== 'kruskal') {
      setError('Please enter a start node');
      return;
    }

    setError('');
    setResult('');
    setVisitedNodes(new Set());
    setDistances({});
    setMstEdges([]);
    setHighlightedNodes([]);
    setHighlightedEdges([]);
    setAnimationStep(0);

    try {
      switch (algorithm) {
        case 'dfs':
          await dfs(startNode);
          break;
        case 'bfs':
          await bfs(startNode);
          break;
        case 'dijkstra':
          await dijkstra(startNode);
          break;
        case 'prim':
          await prim(startNode);
          break;
        case 'kruskal':
          await kruskal();
          break;
      }
    } catch (error) {
      setError(`Error running ${algorithm}: ${error.message}`);
      console.error('Algorithm Error:', error);
    }
  };

  const calculateNodePositions = () => {
    const nodes = Object.keys(graph);
    if (nodes.length === 0) return {};

    const positions = {};
    const centerX = 400; // SVG width / 2
    const centerY = 200; // SVG height / 2
    const radius = Math.min(150, 300 / nodes.length);

    nodes.forEach((node, index) => {
      const angle = (2 * Math.PI * index) / nodes.length;
      positions[node] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    });

    return positions;
  };

  useEffect(() => {
    setNodePositions(calculateNodePositions());
  }, [graph]);

  const handleMouseDown = (node) => {
    setIsDragging(true);
    setDragNode(node);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragNode) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setNodePositions(prev => ({
      ...prev,
      [dragNode]: { x, y }
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragNode(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <button
          onClick={() => setIsDefinitionOpen(!isDefinitionOpen)}
          className="w-full text-left bg-pink-100 p-4 rounded-lg hover:bg-pink-200 transition-colors"
        >
          <h2 className="text-xl font-semibold text-pink-800 flex justify-between items-center">
            Graph Algorithms Definition
            <span className="text-pink-600">{isDefinitionOpen ? '▼' : '▶'}</span>
          </h2>
        </button>
        {isDefinitionOpen && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">What is a Graph?</h3>
            <p className="text-gray-700 mb-4">
              A graph is a non-linear data structure consisting of nodes (vertices) connected by edges.
              Graphs can be directed or undirected, and edges can have weights.
            </p>

            <h3 className="text-lg font-semibold text-pink-700 mb-2">Graph Algorithms:</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-pink-600">Breadth-First Search (BFS)</h4>
                <p className="text-gray-700">
                  BFS is an algorithm for traversing or searching tree/graph data structures.
                  It explores all nodes at the present depth before moving on to nodes at the next depth level.
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>Time Complexity: O(V + E), where V is vertices and E is edges</li>
                  <li>Space Complexity: O(V)</li>
                  <li>Applications: Shortest path finding, web crawling, social networking</li>
                  <li>Key Features:
                    <ul className="list-disc list-inside ml-4">
                      <li>Uses a queue data structure</li>
                      <li>Visits all nodes at current level before moving deeper</li>
                      <li>Guarantees shortest path in unweighted graphs</li>
                      <li>Useful for finding minimum spanning trees in unweighted graphs</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-pink-600">Depth-First Search (DFS)</h4>
                <p className="text-gray-700">
                  DFS is an algorithm for traversing or searching tree/graph data structures.
                  It starts at a root node and explores as far as possible along each branch before backtracking.
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>Time Complexity: O(V + E), where V is vertices and E is edges</li>
                  <li>Space Complexity: O(V)</li>
                  <li>Applications: Maze solving, cycle detection, topological sorting</li>
                  <li>Key Features:
                    <ul className="list-disc list-inside ml-4">
                      <li>Uses a stack (implicitly through recursion)</li>
                      <li>Visits all nodes in a branch before backtracking</li>
                      <li>Can be used to detect cycles in directed graphs</li>
                      <li>Useful for finding strongly connected components</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-pink-600">Dijkstra's Algorithm</h4>
                <p className="text-gray-700">
                  Dijkstra's algorithm finds the shortest path between nodes in a graph.
                  It works for graphs with non-negative edge weights.
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>Time Complexity: O((V + E) log V) with binary heap</li>
                  <li>Space Complexity: O(V)</li>
                  <li>Applications: GPS navigation, network routing, game development</li>
                  <li>Key Features:
                    <ul className="list-disc list-inside ml-4">
                      <li>Maintains a priority queue of nodes</li>
                      <li>Guarantees shortest path for non-negative weights</li>
                      <li>Can be modified for different optimization criteria</li>
                      <li>Used in network routing protocols</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-pink-600">Prim's Algorithm</h4>
                <p className="text-gray-700">
                  Prim's algorithm finds a minimum spanning tree for a weighted undirected graph.
                  It starts from a single vertex and grows the tree by adding the cheapest edge.
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>Time Complexity: O(E log V) with binary heap</li>
                  <li>Space Complexity: O(V)</li>
                  <li>Applications: Network design, cluster analysis, image segmentation</li>
                  <li>Key Features:
                    <ul className="list-disc list-inside ml-4">
                      <li>Greedy algorithm that builds MST incrementally</li>
                      <li>Always adds the minimum weight edge</li>
                      <li>Maintains a single tree throughout</li>
                      <li>Works well for dense graphs</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-pink-600">Kruskal's Algorithm</h4>
                <p className="text-gray-700">
                  Kruskal's algorithm finds a minimum spanning tree by sorting all edges
                  and adding them one by one, avoiding cycles.
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>Time Complexity: O(E log E) with sorting</li>
                  <li>Space Complexity: O(V + E)</li>
                  <li>Applications: Network design, circuit design, clustering</li>
                  <li>Key Features:
                    <ul className="list-disc list-inside ml-4">
                      <li>Uses disjoint-set data structure</li>
                      <li>Processes edges in order of increasing weight</li>
                      <li>Can handle disconnected components</li>
                      <li>More efficient for sparse graphs</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">Graph Operations</h2>
          
          {/* Instructions Panel */}
          <div className="mb-6 p-4 bg-pink-50 rounded-lg">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">How to Build Your Graph:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Enter node names (letters or numbers) in the "Start Node" and "End Node" fields</li>
              <li>Optionally add a weight (number) to create a weighted edge</li>
              <li>Click "Add Edge" to connect the nodes</li>
              <li>Repeat to build your graph structure</li>
              <li>Use "Remove Edge" to delete connections between nodes</li>
            </ol>
            <div className="mt-4 p-3 bg-white rounded border border-pink-200">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-pink-600">Tip:</span> Start with a simple structure like:
                <br />
                A → B (weight: 1)
                <br />
                B → C (weight: 2)
                <br />
                A → C (weight: 3)
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-pink-100 border border-pink-400 text-pink-700 px-4 py-3 rounded mb-4" role="alert">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startNode" className="block text-sm font-medium text-pink-700 mb-1">
                  Start Node
                </label>
                <input
                  id="startNode"
                  type="text"
                  value={startNode}
                  onChange={(e) => setStartNode(e.target.value)}
                  placeholder="e.g., A"
                  className="w-full p-2 border border-pink-200 rounded focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div>
                <label htmlFor="endNode" className="block text-sm font-medium text-pink-700 mb-1">
                  End Node
                </label>
                <input
                  id="endNode"
                  type="text"
                  value={endNode}
                  onChange={(e) => setEndNode(e.target.value)}
                  placeholder="e.g., B"
                  className="w-full p-2 border border-pink-200 rounded focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-pink-700 mb-1">
                Edge Weight (optional)
              </label>
              <input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 1"
                min="0"
                className="w-full p-2 border border-pink-200 rounded focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
              <p className="mt-1 text-sm text-gray-500">Leave empty for unweighted edges</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={addEdge}
                className="flex-1 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Edge
              </button>
              <button
                onClick={removeEdge}
                className="flex-1 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
                Remove Edge
              </button>
            </div>
          </div>

          {/* Current Graph Structure */}
          <div className="mt-6 p-4 bg-pink-50 rounded-lg">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">Current Graph Structure:</h3>
            {Object.keys(graph).length === 0 ? (
              <p className="text-gray-600 italic">No nodes or edges added yet</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(graph).map(([node, neighbors]) => (
                  <div key={node} className="text-gray-700">
                    <span className="font-semibold">{node}</span> connects to:
                    {Object.entries(neighbors).length === 0 ? (
                      <span className="italic text-gray-500"> (no connections)</span>
                    ) : (
                      <ul className="list-disc list-inside ml-4">
                        {Object.entries(neighbors).map(([neighbor, weight]) => (
                          <li key={neighbor}>
                            {neighbor} {weight !== 1 && `(weight: ${weight})`}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">Graph Algorithms</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="algorithm" className="block text-sm font-medium text-pink-700 mb-1">
                Select Algorithm
              </label>
              <select
                id="algorithm"
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="w-full p-2 border border-pink-200 rounded focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="dfs">Depth-First Search (DFS)</option>
                <option value="bfs">Breadth-First Search (BFS)</option>
                <option value="dijkstra">Dijkstra's Algorithm</option>
                <option value="prim">Prim's Algorithm</option>
                <option value="kruskal">Kruskal's Algorithm</option>
              </select>
            </div>
            <button
              onClick={runAlgorithm}
              className="w-full bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
            >
              Run Algorithm
            </button>
            {result && (
              <div className="p-4 bg-pink-50 rounded-lg">
                <h3 className="text-lg font-semibold text-pink-700 mb-2">Result:</h3>
                <p className="text-gray-700 font-mono">{result}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">Visualization</h2>
          <div className="relative h-[400px] bg-gradient-to-b from-pink-50 to-white rounded-lg">
            <div className="absolute top-4 left-4 text-pink-600 font-semibold">
              Step {animationStep + 1}
            </div>
            <div className="absolute top-4 right-4 text-pink-600 font-medium">
              {operation}
            </div>
            <svg 
              className="w-full h-full"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Draw edges */}
              {Object.entries(graph).map(([from, neighbors]) =>
                Object.entries(neighbors).map(([to, weight]) => {
                  const fromPos = nodePositions[from];
                  const toPos = nodePositions[to];
                  if (!fromPos || !toPos) return null;

                  const isHighlighted = highlightedEdges.includes(`${from}-${to}`) ||
                    highlightedEdges.includes(`${to}-${from}`);

                  // Calculate edge label position
                  const midX = (fromPos.x + toPos.x) / 2;
                  const midY = (fromPos.y + toPos.y) / 2;

                  return (
                    <g key={`${from}-${to}`}>
                      <line
                        x1={fromPos.x}
                        y1={fromPos.y}
                        x2={toPos.x}
                        y2={toPos.y}
                        stroke={isHighlighted ? "#db2777" : "#9ca3af"}
                        strokeWidth={isHighlighted ? 3 : 1}
                      />
                      {weight !== 1 && (
                        <text
                          x={midX}
                          y={midY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-xs fill-pink-600 font-medium"
                        >
                          {weight}
                        </text>
                      )}
                    </g>
                  );
                })
              )}

              {/* Draw nodes */}
              {Object.keys(graph).map((node) => {
                const pos = nodePositions[node];
                if (!pos) return null;

                const isHighlighted = highlightedNodes.includes(node);
                const isVisited = visitedNodes.has(node);

                return (
                  <g
                    key={node}
                    onMouseDown={() => handleMouseDown(node)}
                    style={{ cursor: 'move' }}
                  >
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="20"
                      fill={isHighlighted ? "#db2777" : isVisited ? "#f472b6" : "#e5e7eb"}
                      stroke="#9ca3af"
                      strokeWidth="2"
                    />
                    <text
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-sm font-semibold fill-gray-700"
                    >
                      {node}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
} 