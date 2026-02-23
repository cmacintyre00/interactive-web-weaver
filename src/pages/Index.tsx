import { Link } from 'react-router-dom';

const sections = [
  {
    tag: '// 01. purpose',
    title: 'What Is WASM::SortViz?',
    content: `WASM::SortViz is a browser-based interactive sorting algorithm visualizer built with a WebAssembly (WASM) architecture. It demonstrates how performance-critical logic — like sorting algorithms — can be written in C++, compiled to WebAssembly via Emscripten, and executed directly in the browser with zero installations.

The project serves as both an educational tool for understanding sorting algorithms and a reference architecture for building C++/WASM web applications.`,
  },
  {
    tag: '// 02. architecture',
    title: 'How It Works',
    content: `The application follows a clean three-layer architecture:`,
    layers: [
      {
        label: 'C++ / WASM Layer',
        color: 'text-primary',
        desc: 'Handles the core sorting algorithms (Bubble, Selection, Quick, Insertion Sort). Written in C++ and compiled to a .wasm binary module using Emscripten. This layer operates on raw arrays in linear memory for maximum performance.',
      },
      {
        label: 'JavaScript Bridge',
        color: 'text-accent',
        desc: 'The WasmBridge module loads the .wasm binary, manages memory allocation, and exposes clean TypeScript functions for the UI to call. It translates between JavaScript objects and WASM linear memory.',
      },
      {
        label: 'React UI Layer',
        color: 'text-bar-comparing',
        desc: 'Renders the bar chart visualization, control panel, and terminal log. Receives sorting steps from the bridge and animates them in real-time. Fully responsive and interactive.',
      },
    ],
  },
];

const algorithms = [
  {
    name: 'Bubble Sort',
    time: 'O(n²)',
    space: 'O(1)',
    desc: 'Repeatedly walks through the list comparing adjacent pairs and swapping them if out of order. Simple but slow on large datasets. Best for: educational purposes, nearly-sorted data.',
  },
  {
    name: 'Selection Sort',
    time: 'O(n²)',
    space: 'O(1)',
    desc: 'Scans the unsorted portion to find the minimum value, then places it at the front. Performs fewer swaps than Bubble Sort. Best for: small arrays, situations where swap cost is high.',
  },
  {
    name: 'Quick Sort',
    time: 'O(n log n)',
    space: 'O(log n)',
    desc: 'Picks a pivot element, partitions the array into elements less than and greater than the pivot, then recursively sorts each partition. Best for: general-purpose sorting, large datasets.',
  },
  {
    name: 'Insertion Sort',
    time: 'O(n²)',
    space: 'O(1)',
    desc: 'Builds the sorted array one element at a time by inserting each new element into its correct position among the already-sorted elements. Best for: small or nearly-sorted arrays, online sorting.',
  },
];

const outputGuide = [
  {
    color: 'bg-bar',
    label: 'Default (Teal)',
    meaning: 'Unsorted element sitting in the array waiting to be processed.',
  },
  {
    color: 'bg-bar-comparing',
    label: 'Comparing (Yellow)',
    meaning: 'These two bars are currently being compared by the algorithm to determine their relative order.',
  },
  {
    color: 'bg-bar-swapping',
    label: 'Swapping (Red)',
    meaning: 'These two bars are being swapped because they were found to be in the wrong order.',
  },
  {
    color: 'bg-bar-sorted',
    label: 'Sorted (Cyan)',
    meaning: 'This element is in its final correct position and will not be moved again.',
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse-glow" />
          <h1 className="text-sm font-semibold tracking-widest uppercase">
            <span className="text-primary glow-text">WASM</span>
            <span className="text-muted-foreground">::</span>
            <span>SortViz</span>
          </h1>
        </div>
        <Link
          to="/visualizer"
          className="px-4 py-2 rounded bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          ▶ Launch Visualizer
        </Link>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 max-w-4xl mx-auto text-center">
        <div className="inline-block px-3 py-1 rounded border border-border bg-secondary/30 text-xs text-muted-foreground uppercase tracking-widest mb-6">
          C++ → Emscripten → WebAssembly → Browser
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Interactive Sorting Algorithm
          <br />
          <span className="text-primary glow-text">Visualizer</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Watch sorting algorithms execute step-by-step in real-time. Understand how Bubble Sort, Selection Sort, Quick Sort, and Insertion Sort work — powered by a WebAssembly architecture running entirely in your browser.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/visualizer"
            className="px-6 py-3 rounded bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity glow-border"
          >
            ▶ Start Visualizing
          </Link>
          <a
            href="#how-to-use"
            className="px-6 py-3 rounded border border-border text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-colors"
          >
            ↓ Learn More
          </a>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 pb-20 space-y-16">
        {/* Purpose & Architecture */}
        {sections.map((section) => (
          <section key={section.tag}>
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">{section.tag}</div>
            <h3 className="text-xl font-bold mb-4">{section.title}</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">{section.content}</p>
            {section.layers && (
              <div className="mt-6 space-y-3">
                {section.layers.map((layer) => (
                  <div key={layer.label} className="p-4 bg-card border border-border rounded-lg">
                    <div className={`text-sm font-semibold mb-1 ${layer.color}`}>{layer.label}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{layer.desc}</p>
                  </div>
                ))}
                {/* Flow diagram */}
                <div className="p-4 bg-secondary/20 border border-border rounded-lg text-center text-xs text-muted-foreground">
                  <span className="text-primary font-semibold">C++ Source</span>
                  <span className="mx-2">→</span>
                  <span className="text-accent font-semibold">Emscripten</span>
                  <span className="mx-2">→</span>
                  <span className="text-primary font-semibold">.wasm Binary</span>
                  <span className="mx-2">→</span>
                  <span className="text-accent font-semibold">WasmBridge.ts</span>
                  <span className="mx-2">→</span>
                  <span className="text-bar-comparing font-semibold">React UI</span>
                </div>
              </div>
            )}
          </section>
        ))}

        {/* Algorithms */}
        <section>
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">// 03. algorithms</div>
          <h3 className="text-xl font-bold mb-4">Available Sorting Algorithms</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {algorithms.map((algo) => (
              <div key={algo.name} className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-primary">{algo.name}</span>
                  <div className="flex gap-3 text-xs">
                    <span className="text-bar-comparing">Time: {algo.time}</span>
                    <span className="text-accent">Space: {algo.space}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{algo.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use">
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">// 04. how to use</div>
          <h3 className="text-xl font-bold mb-4">How to Use the Visualizer</h3>
          <div className="space-y-3">
            {[
              { step: '01', title: 'Choose an Algorithm', desc: 'Select one of the four sorting algorithms from the control panel on the right side. Each button shows the algorithm name — click to select.' },
              { step: '02', title: 'Adjust Parameters', desc: 'Use the Speed slider (1–100%) to control animation speed. Use the Array Size slider (10–120) to set how many bars to sort. The array regenerates automatically when you change the size.' },
              { step: '03', title: 'Execute the Sort', desc: 'Click the "▶ Execute" button to start the visualization. The bars will animate in real-time showing each comparison and swap. You can click "■ Halt" at any time to pause.' },
              { step: '04', title: 'Observe the Output', desc: 'Watch the bar colors change as the algorithm runs. The terminal log at the bottom shows execution status. Stats (comparisons and swaps) update live.' },
              { step: '05', title: 'Reset & Repeat', desc: 'Click "↻ Reset" to generate a new random array and try again with a different algorithm or parameters.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 p-4 bg-card border border-border rounded-lg">
                <div className="text-primary font-bold text-lg opacity-40">{item.step}</div>
                <div>
                  <div className="text-sm font-semibold mb-1">{item.title}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Output Guide */}
        <section>
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">// 05. reading the output</div>
          <h3 className="text-xl font-bold mb-4">What the Output Means</h3>

          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3">Bar Colors</h4>
            <div className="space-y-2">
              {outputGuide.map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg">
                  <span className={`w-4 h-4 rounded-sm mt-0.5 shrink-0 ${item.color}`} />
                  <div>
                    <div className="text-sm font-semibold">{item.label}</div>
                    <p className="text-xs text-muted-foreground">{item.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3">Bar Height</h4>
            <p className="text-xs text-muted-foreground leading-relaxed p-3 bg-card border border-border rounded-lg">
              Each bar's height represents the numeric value of that array element. Taller bars = larger numbers. The goal of sorting is to arrange all bars from shortest (left) to tallest (right).
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3">Statistics Panel</h4>
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="p-3 bg-card border border-border rounded-lg">
                <span className="text-sm font-semibold text-bar-comparing">Comparisons</span>
                <p className="text-xs text-muted-foreground mt-1">How many times the algorithm checked whether one element is greater or less than another. More comparisons = slower algorithm.</p>
              </div>
              <div className="p-3 bg-card border border-border rounded-lg">
                <span className="text-sm font-semibold text-bar-swapping">Swaps</span>
                <p className="text-xs text-muted-foreground mt-1">How many times the algorithm moved elements to different positions. Each swap is an expensive memory operation in real systems.</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Terminal Log</h4>
            <p className="text-xs text-muted-foreground leading-relaxed p-3 bg-card border border-border rounded-lg">
              The terminal-style output at the bottom of the visualizer shows system status messages. It displays when the WASM module initializes, which algorithm is executing, and final statistics after completion. This simulates the kind of logging you'd see from a real WebAssembly runtime.
            </p>
          </div>
        </section>

        {/* Architecture Details */}
        <section>
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">// 06. project structure</div>
          <h3 className="text-xl font-bold mb-4">Project Structure</h3>
          <div className="p-4 bg-card border border-border rounded-lg text-xs font-mono space-y-1">
            <div className="text-muted-foreground">src/</div>
            <div className="pl-4"><span className="text-primary">wasm/</span></div>
            <div className="pl-8"><span className="text-accent">WasmBridge.ts</span> <span className="text-muted-foreground">— WASM module loader & JS bridge</span></div>
            <div className="pl-8"><span className="text-accent">cpp/sorting_module.cpp.ts</span> <span className="text-muted-foreground">— C++ source reference</span></div>
            <div className="pl-4"><span className="text-primary">components/</span></div>
            <div className="pl-8"><span className="text-accent">BarChart.tsx</span> <span className="text-muted-foreground">— Animated bar visualization</span></div>
            <div className="pl-8"><span className="text-accent">ControlPanel.tsx</span> <span className="text-muted-foreground">— Algorithm & parameter controls</span></div>
            <div className="pl-4"><span className="text-primary">hooks/</span></div>
            <div className="pl-8"><span className="text-accent">useSortingEngine.ts</span> <span className="text-muted-foreground">— Sorting state machine & animation loop</span></div>
            <div className="pl-4"><span className="text-primary">pages/</span></div>
            <div className="pl-8"><span className="text-accent">Index.tsx</span> <span className="text-muted-foreground">— This documentation page</span></div>
            <div className="pl-8"><span className="text-accent">Visualizer.tsx</span> <span className="text-muted-foreground">— Interactive visualizer</span></div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <Link
            to="/visualizer"
            className="inline-block px-8 py-4 rounded bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity glow-border glow-box"
          >
            ▶ Launch the Visualizer
          </Link>
          <p className="text-xs text-muted-foreground mt-4">No installation required — runs entirely in your browser.</p>
        </section>
      </div>
    </div>
  );
};

export default Index;
