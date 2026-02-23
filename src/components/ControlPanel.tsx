import { ALGORITHMS, type AlgorithmId } from '@/wasm/WasmBridge';

interface ControlPanelProps {
  algorithm: AlgorithmId;
  onAlgorithmChange: (id: AlgorithmId) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  isRunning: boolean;
  isSorted: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  comparisons: number;
  swaps: number;
}

export function ControlPanel({
  algorithm, onAlgorithmChange,
  speed, onSpeedChange,
  arraySize, onArraySizeChange,
  isRunning, isSorted,
  onStart, onStop, onReset,
  comparisons, swaps,
}: ControlPanelProps) {
  const currentAlgo = ALGORITHMS.find(a => a.id === algorithm)!;

  return (
    <div className="space-y-5">
      {/* Algorithm Selection */}
      <div>
        <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-widest">
          // algorithm
        </label>
        <div className="grid grid-cols-2 gap-2">
          {ALGORITHMS.map(algo => (
            <button
              key={algo.id}
              onClick={() => !isRunning && onAlgorithmChange(algo.id)}
              disabled={isRunning}
              className={`px-3 py-2 text-xs rounded border transition-all text-left
                ${algorithm === algo.id
                  ? 'border-primary bg-primary/10 text-primary glow-border'
                  : 'border-border bg-secondary/50 text-secondary-foreground hover:border-muted-foreground'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {algo.name}
            </button>
          ))}
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="p-3 bg-secondary/30 rounded border border-border text-xs space-y-1">
        <p className="text-muted-foreground">{currentAlgo.description}</p>
        <div className="flex gap-4 pt-1">
          <span className="text-primary">Time: {currentAlgo.timeComplexity}</span>
          <span className="text-accent">Space: {currentAlgo.spaceComplexity}</span>
        </div>
      </div>

      {/* Speed Slider */}
      <div>
        <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-widest">
          // speed: {speed}%
        </label>
        <input
          type="range"
          min={1}
          max={100}
          value={speed}
          onChange={e => onSpeedChange(Number(e.target.value))}
          className="w-full accent-primary h-1"
        />
      </div>

      {/* Array Size Slider */}
      <div>
        <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-widest">
          // array size: {arraySize}
        </label>
        <input
          type="range"
          min={10}
          max={120}
          value={arraySize}
          onChange={e => !isRunning && onArraySizeChange(Number(e.target.value))}
          disabled={isRunning}
          className="w-full accent-primary h-1 disabled:opacity-50"
        />
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        {!isRunning ? (
          <button
            onClick={onStart}
            disabled={isSorted}
            className="flex-1 py-2.5 rounded bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ▶ Execute
          </button>
        ) : (
          <button
            onClick={onStop}
            className="flex-1 py-2.5 rounded bg-destructive text-destructive-foreground text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity"
          >
            ■ Halt
          </button>
        )}
        <button
          onClick={onReset}
          className="px-4 py-2.5 rounded border border-border text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-colors"
        >
          ↻ Reset
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 bg-secondary/30 rounded border border-border">
          <div className="text-xs text-muted-foreground uppercase tracking-widest">Comparisons</div>
          <div className="text-lg font-bold text-bar-comparing mt-1">{comparisons}</div>
        </div>
        <div className="p-3 bg-secondary/30 rounded border border-border">
          <div className="text-xs text-muted-foreground uppercase tracking-widest">Swaps</div>
          <div className="text-lg font-bold text-bar-swapping mt-1">{swaps}</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-bar" /> Default</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-bar-comparing" /> Comparing</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-bar-swapping" /> Swapping</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-bar-sorted" /> Sorted</span>
      </div>
    </div>
  );
}
