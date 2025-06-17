# DSA Dashboard

An interactive learning platform for Data Structures and Algorithms with visualizations and step-by-step explanations.

## Features

- **Search Algorithms**: Linear Search, Binary Search
- **Sorting Algorithms**: Bubble Sort, Quick Sort, Merge Sort, Insertion Sort, Selection Sort, Radix Sort, Counting Sort, Heap Sort
- **Data Structures**: Stack, Queue, Linked List, Hash Function
- **Trees & Graphs**: Binary Tree, AVL Tree, Red-Black Tree, Graph

## Technologies Used

- React 19
- React Router DOM
- Tailwind CSS
- Framer Motion
- Vite

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Portfolio-work-1-dsa.git
cd Portfolio-work-1-dsa/dsa-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment

This project is configured for GitHub Pages deployment. The deployment happens automatically when you push to the `main` branch.

### Manual Deployment Steps:

1. Build the project:
```bash
npm run build
```

2. The built files will be in the `dist` directory.

3. GitHub Actions will automatically deploy to GitHub Pages.

### GitHub Pages Configuration:

- **Source**: GitHub Actions
- **Branch**: `gh-pages` (automatically created by the workflow)
- **URL**: `https://yourusername.github.io/Portfolio-work-1-dsa/`

## Project Structure

```
src/
├── components/
│   ├── SearchAlgorithms/
│   ├── SortingAlgorithms/
│   ├── DataStructures/
│   ├── Trees/
│   ├── Graphs/
│   └── home.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is created for educational purposes.
