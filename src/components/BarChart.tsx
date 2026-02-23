import type { SortStep } from '@/wasm/WasmBridge';

interface BarChartProps {
  array: number[];
  step: SortStep | null;
}

export function BarChart({ array, step }: BarChartProps) {
  const maxVal = Math.max(...array, 1);

  return (
    <div className="flex items-end gap-[1px] h-[400px] w-full px-2">
      {array.map((value, index) => {
        const heightPercent = (value / maxVal) * 100;
        let colorClass = 'bg-bar';

        if (step?.sorted?.includes(index)) {
          colorClass = 'bg-bar-sorted';
        } else if (step?.swapping && (index === step.swapping[0] || index === step.swapping[1])) {
          colorClass = 'bg-bar-swapping';
        } else if (step?.comparing && (index === step.comparing[0] || index === step.comparing[1])) {
          colorClass = 'bg-bar-comparing';
        }

        return (
          <div
            key={index}
            className={`flex-1 min-w-[2px] rounded-t-sm transition-all duration-75 ${colorClass}`}
            style={{ height: `${heightPercent}%` }}
          />
        );
      })}
    </div>
  );
}
