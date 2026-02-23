// Code written by Connor MacIntyre
//
// This is the bridge between the JavaScript UI and the sorting algorithms.
// In a real setup you'd compile C++ to .wasm with Emscripten and load it here.
// For now the sorting logic is implemented as TypeScript generators that yield
// each step so the UI can animate comparisons, swaps, and sorted elements.
//
// Data flow: C++ Source -> Emscripten -> .wasm binary -> WasmBridge (this file) -> React UI
// The original C++ source is kept in src/wasm/cpp/ for reference.

export type SortStep = {
  array: number[];
  comparing: [number, number] | null;
  swapping: [number, number] | null;
  sorted: number[];
};

export type AlgorithmId = 'bubble' | 'selection' | 'quick' | 'insertion';

export interface AlgorithmInfo {
  id: AlgorithmId;
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
}

export const ALGORITHMS: AlgorithmInfo[] = [
  {
    id: 'bubble',
    name: 'Bubble Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
  },
  {
    id: 'selection',
    name: 'Selection Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Finds the minimum element from the unsorted part and puts it at the beginning.',
  },
  {
    id: 'quick',
    name: 'Quick Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    description: 'Picks a pivot element and partitions the array around it recursively.',
  },
  {
    id: 'insertion',
    name: 'Insertion Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Builds the sorted array one item at a time by inserting each element into its correct position.',
  },
];

// Each sorting algorithm is a generator that yields a SortStep on every comparison or swap.

function* bubbleSort(arr: number[]): Generator<SortStep> {
  const a = [...arr];
  const sorted: number[] = [];
  for (let i = a.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      yield { array: [...a], comparing: [j, j + 1], swapping: null, sorted: [...sorted] };
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield { array: [...a], comparing: null, swapping: [j, j + 1], sorted: [...sorted] };
      }
    }
    sorted.push(i);
  }
  sorted.push(0);
  yield { array: [...a], comparing: null, swapping: null, sorted: [...sorted] };
}

function* selectionSort(arr: number[]): Generator<SortStep> {
  const a = [...arr];
  const sorted: number[] = [];
  for (let i = 0; i < a.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      yield { array: [...a], comparing: [minIdx, j], swapping: null, sorted: [...sorted] };
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      yield { array: [...a], comparing: null, swapping: [i, minIdx], sorted: [...sorted] };
    }
    sorted.push(i);
  }
  yield { array: [...a], comparing: null, swapping: null, sorted: Array.from({ length: a.length }, (_, i) => i) };
}

function* insertionSort(arr: number[]): Generator<SortStep> {
  const a = [...arr];
  const sorted: number[] = [0];
  for (let i = 1; i < a.length; i++) {
    let j = i;
    while (j > 0) {
      yield { array: [...a], comparing: [j - 1, j], swapping: null, sorted: [...sorted] };
      if (a[j - 1] > a[j]) {
        [a[j - 1], a[j]] = [a[j], a[j - 1]];
        yield { array: [...a], comparing: null, swapping: [j - 1, j], sorted: [...sorted] };
        j--;
      } else {
        break;
      }
    }
    sorted.push(i);
  }
  yield { array: [...a], comparing: null, swapping: null, sorted: Array.from({ length: a.length }, (_, i) => i) };
}

function* quickSort(arr: number[]): Generator<SortStep> {
  const a = [...arr];
  const sorted: number[] = [];

  function* partition(lo: number, hi: number): Generator<SortStep, number> {
    const pivot = a[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) {
      yield { array: [...a], comparing: [j, hi], swapping: null, sorted: [...sorted] };
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        yield { array: [...a], comparing: null, swapping: [i, j], sorted: [...sorted] };
        i++;
      }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    yield { array: [...a], comparing: null, swapping: [i, hi], sorted: [...sorted] };
    sorted.push(i);
    return i;
  }

  function* qs(lo: number, hi: number): Generator<SortStep> {
    if (lo < hi) {
      const p = yield* partition(lo, hi);
      yield* qs(lo, p - 1);
      yield* qs(p + 1, hi);
    } else if (lo === hi) {
      sorted.push(lo);
    }
  }

  yield* qs(0, a.length - 1);
  yield { array: [...a], comparing: null, swapping: null, sorted: Array.from({ length: a.length }, (_, i) => i) };
}

// Singleton that mimics what a real WASM module would expose.
// In production you'd swap the generators for WebAssembly.instantiate() calls.
export class WasmBridge {
  private static instance: WasmBridge | null = null;

  static getInstance(): WasmBridge {
    if (!this.instance) this.instance = new WasmBridge();
    return this.instance;
  }

  generateArray(size: number): number[] {
    const arr: number[] = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 100) + 5);
    }
    return arr;
  }

  getSortGenerator(algorithm: AlgorithmId, arr: number[]): Generator<SortStep> {
    switch (algorithm) {
      case 'bubble': return bubbleSort(arr);
      case 'selection': return selectionSort(arr);
      case 'quick': return quickSort(arr);
      case 'insertion': return insertionSort(arr);
    }
  }
}
