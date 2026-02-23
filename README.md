# Algorithm Runtime Visualizer

An interactive web app I designed and built to visualize how algorithms perform and scale with different input sizes.

Live Demo: https://algorithm-runtime-visualizer.netlify.app/

---

## Overview

This project is a browser-based tool that lets users explore the runtime behavior of common algorithms in real time. Instead of just learning Big-O notation theoretically, you can actually see how performance changes as input size grows.

I focused on making it both fast and intuitive — combining low-level performance with a clean, interactive UI.

---

## Tech Stack

- C++
- WebAssembly (WASM)
- JavaScript
- React
- Tailwind CSS

---

## Key Features

- Visualizes time complexity (O(n), O(log n), O(n²), etc.) in real time  
- Adjustable input sizes to observe scaling behavior  
- Multiple algorithms for comparison  
- High-performance execution using C++ compiled to WebAssembly  
- Clean, responsive UI for easy interaction  

---

## How It Works

The core algorithms are written in C++ and compiled to WebAssembly, allowing them to run in the browser at near-native speed. The frontend (React) handles user interaction and dynamically updates visualizations based on runtime data.

This setup bridges systems-level performance with modern web development.

---

## Running Locally

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
