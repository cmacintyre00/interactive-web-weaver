import { BarChart } from '@/components/BarChart';
import { ControlPanel } from '@/components/ControlPanel';
import { useSortingEngine } from '@/hooks/useSortingEngine';

const Index = () => {
  const engine = useSortingEngine();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
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
        <div className="text-xs text-muted-foreground hidden sm:block">
          C++ → WebAssembly → Browser
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Visualization Area */}
        <main className="flex-1 p-6 flex flex-col">
          <div className="flex-1 bg-card border border-border rounded-lg p-4 flex flex-col glow-box">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                // visualization output
              </span>
              <span className="text-xs text-primary">
                {engine.isRunning ? '● RUNNING' : engine.isSorted ? '✓ COMPLETE' : '○ READY'}
              </span>
            </div>
            <div className="flex-1 flex items-end">
              <BarChart array={engine.array} step={engine.currentStep} />
            </div>
          </div>

          {/* Terminal-style log */}
          <div className="mt-4 p-3 bg-card border border-border rounded text-xs text-muted-foreground font-mono scanline">
            <span className="text-primary">$</span> wasm_bridge.init() → module loaded
            <br />
            <span className="text-primary">$</span> sort.{engine.algorithm}(arr[{engine.arraySize}]) → {engine.isSorted ? 'completed' : engine.isRunning ? 'executing...' : 'awaiting execution'}
            {engine.isSorted && (
              <>
                <br />
                <span className="text-primary">$</span> stats: {engine.comparisons} comparisons, {engine.swaps} swaps
              </>
            )}
          </div>
        </main>

        {/* Sidebar Controls */}
        <aside className="lg:w-80 border-t lg:border-t-0 lg:border-l border-border p-6">
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
            // control panel
          </div>
          <ControlPanel
            algorithm={engine.algorithm}
            onAlgorithmChange={engine.setAlgorithm}
            speed={engine.speed}
            onSpeedChange={engine.setSpeed}
            arraySize={engine.arraySize}
            onArraySizeChange={(size) => {
              engine.setArraySize(size);
              engine.generateNewArray();
            }}
            isRunning={engine.isRunning}
            isSorted={engine.isSorted}
            onStart={engine.startSort}
            onStop={engine.stopSort}
            onReset={engine.reset}
            comparisons={engine.comparisons}
            swaps={engine.swaps}
          />
        </aside>
      </div>
    </div>
  );
};

export default Index;
