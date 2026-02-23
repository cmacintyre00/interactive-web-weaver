// Code written by Connor MacIntyre

import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

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
    label: 'Default (Grey)',
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

const steps = [
  { step: '01', title: 'Choose an Algorithm', desc: 'Select one of the four sorting algorithms from the control panel on the right side. Each button shows the algorithm name — click to select.' },
  { step: '02', title: 'Adjust Parameters', desc: 'Use the Speed slider (1–100%) to control animation speed. Use the Array Size slider (10–120) to set how many bars to sort. The array regenerates automatically when you change the size.' },
  { step: '03', title: 'Execute the Sort', desc: 'Click the "▶ Execute" button to start the visualization. The bars will animate in real-time showing each comparison and swap. You can click "■ Halt" at any time to pause.' },
  { step: '04', title: 'Observe the Output', desc: 'Watch the bar colors change as the algorithm runs. The terminal log at the bottom shows execution status. Stats (comparisons and swaps) update live.' },
  { step: '05', title: 'Reset & Repeat', desc: 'Click "↻ Reset" to generate a new random array and try again with a different algorithm or parameters.' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
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
      <section className="relative px-6 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-block px-3 py-1 rounded border border-border bg-secondary/30 text-xs text-muted-foreground uppercase tracking-widest mb-6">
            C++ → Emscripten → WebAssembly → Browser
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Interactive Sorting Algorithm
            <br />
            <span className="text-primary glow-text">Visualizer</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed text-base lg:text-lg">
            Watch sorting algorithms execute step-by-step in real-time. Understand how Bubble Sort, Selection Sort, Quick Sort, and Insertion Sort work — powered by a WebAssembly architecture running entirely in your browser.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/visualizer"
              className="px-8 py-4 rounded bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity glow-border"
            >
              ▶ Start Visualizing
            </Link>
            <a
              href="#purpose"
              className="px-8 py-4 rounded border border-border text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-colors"
            >
              ↓ Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Purpose section — asymmetric two-column */}
      <section id="purpose" className="px-6 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-2">
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">{sections[0].tag}</div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-2">{sections[0].title}</h3>
            </div>
            <div className="lg:col-span-3">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm lg:text-base">{sections[0].content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture section */}
      <section className="px-6 py-20 lg:py-24 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">{sections[1].tag}</div>
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">{sections[1].title}</h3>
          <p className="text-muted-foreground leading-relaxed text-sm lg:text-base mb-8">{sections[1].content}</p>

          <div className="grid md:grid-cols-3 gap-4">
            {sections[1].layers!.map((layer, i) => (
              <div key={layer.label} className="group relative p-6 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors">
                <div className="text-xs text-muted-foreground mb-3">0{i + 1}</div>
                <div className={`text-base font-semibold mb-3 ${layer.color}`}>{layer.label}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{layer.desc}</p>
              </div>
            ))}
          </div>

          {/* Data flow diagram */}
          <div className="mt-6 p-5 bg-secondary/20 border border-border rounded-lg text-center text-xs text-muted-foreground flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span className="text-primary font-semibold">C++ Source</span>
            <span>→</span>
            <span className="text-accent font-semibold">Emscripten</span>
            <span>→</span>
            <span className="text-primary font-semibold">.wasm Binary</span>
            <span>→</span>
            <span className="text-accent font-semibold">WasmBridge.ts</span>
            <span>→</span>
            <span className="text-bar-comparing font-semibold">React UI</span>
          </div>
        </div>
      </section>

      {/* Algorithm cards — full-width grid */}
      <section className="px-6 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">// 03. algorithms</div>
          <h3 className="text-2xl lg:text-3xl font-bold mb-8">Available Sorting Algorithms</h3>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {algorithms.map((algo) => (
              <div key={algo.name} className="p-6 bg-card border border-border rounded-lg flex flex-col hover:border-primary/30 transition-colors">
                <span className="text-base font-semibold text-primary mb-1">{algo.name}</span>
                <div className="flex gap-4 text-xs mb-3">
                  <span className="text-bar-comparing">Time: {algo.time}</span>
                  <span className="text-accent">Space: {algo.space}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{algo.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage instructions — numbered steps in a wider layout */}
      <section id="how-to-use" className="px-6 py-20 lg:py-24 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">// 04. how to use</div>
          <h3 className="text-2xl lg:text-3xl font-bold mb-8">How to Use the Visualizer</h3>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {steps.map((item) => (
              <div key={item.step} className="flex gap-4 p-6 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors">
                <div className="text-primary font-bold text-2xl opacity-30 shrink-0">{item.step}</div>
                <div>
                  <div className="text-sm font-semibold mb-2">{item.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color guide and output explanation — two-column layout */}
      <section className="px-6 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">// 05. reading the output</div>
          <h3 className="text-2xl lg:text-3xl font-bold mb-8">What the Output Means</h3>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left column — bar colors */}
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">Bar Colors</h4>
              <div className="space-y-3">
                {outputGuide.map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                    <span className={`w-4 h-4 rounded-sm mt-0.5 shrink-0 ${item.color}`} />
                    <div>
                      <div className="text-sm font-semibold">{item.label}</div>
                      <p className="text-sm text-muted-foreground">{item.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — bar height, stats, terminal */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">Bar Height</h4>
                <p className="text-sm text-muted-foreground leading-relaxed p-4 bg-card border border-border rounded-lg">
                  Each bar's height represents the numeric value of that array element. Taller bars = larger numbers. The goal of sorting is to arrange all bars from shortest (left) to tallest (right).
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">Statistics Panel</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <span className="text-sm font-semibold text-bar-comparing">Comparisons</span>
                    <p className="text-sm text-muted-foreground mt-2">How many times the algorithm checked whether one element is greater or less than another. More comparisons = slower algorithm.</p>
                  </div>
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <span className="text-sm font-semibold text-bar-swapping">Swaps</span>
                    <p className="text-sm text-muted-foreground mt-2">How many times the algorithm moved elements to different positions. Each swap is an expensive memory operation in real systems.</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">Terminal Log</h4>
                <p className="text-sm text-muted-foreground leading-relaxed p-4 bg-card border border-border rounded-lg">
                  The terminal-style output at the bottom of the visualizer shows system status messages. It displays when the WASM module initializes, which algorithm is executing, and final statistics after completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project file structure */}
      <section className="px-6 py-20 lg:py-24 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-2">
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">// 06. project structure</div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Project Structure</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A clean separation of concerns: WASM bridge for performance-critical sorting, React components for the UI, and custom hooks for state management.
              </p>
            </div>
            <div className="lg:col-span-3">
              <div className="p-6 bg-card border border-border rounded-lg text-sm font-mono space-y-1.5">
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
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="px-6 py-24 lg:py-32 text-center">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/visualizer"
            className="inline-block px-10 py-5 rounded bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity glow-border glow-box"
          >
            ▶ Launch the Visualizer
          </Link>
          <p className="text-sm text-muted-foreground mt-6">No installation required — runs entirely in your browser.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
