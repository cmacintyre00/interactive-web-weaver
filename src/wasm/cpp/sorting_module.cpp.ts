// Code written by Connor MacIntyre
//
// Reference C++ source for the sorting algorithms. This is what you'd compile
// with Emscripten to get the .wasm binary:
//   emcc sorting_module.cpp -o sorting.js \
//     -s EXPORTED_FUNCTIONS="['_bubbleSort','_generateArray']" -s MODULARIZE=1
//
// The actual runtime logic lives in WasmBridge.ts as TypeScript generators.

/*
 * #include <emscripten/bind.h>
 * #include <vector>
 * #include <algorithm>
 * #include <cstdlib>
 *
 * extern "C" {
 *   int* generateArray(int size) {
 *     static std::vector<int> arr;
 *     arr.resize(size);
 *     for (int i = 0; i < size; i++) {
 *       arr[i] = rand() % 100 + 5;
 *     }
 *     return arr.data();
 *   }
 *
 *   void bubbleSort(int* arr, int size, void (*onStep)(int, int, int)) {
 *     for (int i = size - 1; i > 0; i--) {
 *       for (int j = 0; j < i; j++) {
 *         onStep(j, j + 1, 0);
 *         if (arr[j] > arr[j + 1]) {
 *           std::swap(arr[j], arr[j + 1]);
 *           onStep(j, j + 1, 1);
 *         }
 *       }
 *     }
 *   }
 *
 *   void selectionSort(int* arr, int size, void (*onStep)(int, int, int)) {
 *     for (int i = 0; i < size; i++) {
 *       int minIdx = i;
 *       for (int j = i + 1; j < size; j++) {
 *         onStep(minIdx, j, 0);
 *         if (arr[j] < arr[minIdx]) minIdx = j;
 *       }
 *       if (minIdx != i) {
 *         std::swap(arr[i], arr[minIdx]);
 *         onStep(i, minIdx, 1);
 *       }
 *     }
 *   }
 *
 *   void quickSort(int* arr, int lo, int hi, void (*onStep)(int, int, int)) {
 *     if (lo < hi) {
 *       int pivot = arr[hi], i = lo;
 *       for (int j = lo; j < hi; j++) {
 *         onStep(j, hi, 0);
 *         if (arr[j] < pivot) {
 *           std::swap(arr[i], arr[j]);
 *           onStep(i, j, 1);
 *           i++;
 *         }
 *       }
 *       std::swap(arr[i], arr[hi]);
 *       onStep(i, hi, 1);
 *       quickSort(arr, lo, i - 1, onStep);
 *       quickSort(arr, i + 1, hi, onStep);
 *     }
 *   }
 * }
 *
 * EMSCRIPTEN_BINDINGS(sorting_module) {
 *   emscripten::function("generateArray", &generateArray, emscripten::allow_raw_pointers());
 *   emscripten::function("bubbleSort", &bubbleSort, emscripten::allow_raw_pointers());
 *   emscripten::function("selectionSort", &selectionSort, emscripten::allow_raw_pointers());
 *   emscripten::function("quickSort", &quickSort, emscripten::allow_raw_pointers());
 * }
 */

export {};
