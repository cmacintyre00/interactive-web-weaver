// Code written by Connor MacIntyre
// Main hook that ties everything together: manages array state, runs the sorting
// animation loop step by step, and tracks comparisons/swaps in real time.

import { useState, useCallback, useRef, useEffect } from 'react';
import { WasmBridge, type AlgorithmId, type SortStep } from '@/wasm/WasmBridge';

export function useSortingEngine() {
  const [array, setArray] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<SortStep | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [algorithm, setAlgorithm] = useState<AlgorithmId>('bubble');
  const [speed, setSpeed] = useState(50);
  const [arraySize, setArraySize] = useState(40);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const cancelRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const bridge = useRef(WasmBridge.getInstance());

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelRef.current = true;
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const generateNewArray = useCallback(() => {
    const newArr = bridge.current.generateArray(arraySize);
    setArray(newArr);
    setCurrentStep(null);
    setIsSorted(false);
    setComparisons(0);
    setSwaps(0);
  }, [arraySize]);

  useEffect(() => {
    generateNewArray();
  }, [generateNewArray]);

  const startSort = useCallback(async () => {
    if (isRunning || isSorted) return;
    setIsRunning(true);
    cancelRef.current = false;
    setComparisons(0);
    setSwaps(0);

    const gen = bridge.current.getSortGenerator(algorithm, array);
    let compCount = 0;
    let swapCount = 0;

    const runStep = () => {
      if (cancelRef.current) return;
      const result = gen.next();
      if (result.done) {
        setIsRunning(false);
        if (!cancelRef.current) setIsSorted(true);
        return;
      }
      const step = result.value;
      if (step.comparing) compCount++;
      if (step.swapping) swapCount++;
      setComparisons(compCount);
      setSwaps(swapCount);
      setCurrentStep(step);
      setArray(step.array);

      const delay = Math.max(1, 200 - speed * 2);
      timerRef.current = window.setTimeout(runStep, delay);
    };

    runStep();
  }, [isRunning, isSorted, algorithm, array, speed]);

  const stopSort = useCallback(() => {
    cancelRef.current = true;
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    cancelRef.current = true;
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
    generateNewArray();
  }, [generateNewArray]);

  return {
    array, currentStep, isRunning, isSorted,
    algorithm, setAlgorithm,
    speed, setSpeed,
    arraySize, setArraySize: (size: number) => { setArraySize(size); },
    comparisons, swaps,
    startSort, stopSort, reset, generateNewArray,
  };
}
