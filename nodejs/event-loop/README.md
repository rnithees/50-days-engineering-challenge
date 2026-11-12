# Node.js Event Loop — Practical Learning Lab

## Overview

This repository documents my practical exploration of Node.js event-loop behaviour, asynchronous execution, callback scheduling, and non-blocking I/O.

The goal is to understand how Node.js coordinates asynchronous operations while executing JavaScript on a single main thread.

**Environment**
- Node.js: v24.13.0
- Language: JavaScript
- Module system: CommonJS

## Experiments

### Lab 01 — Callback Scheduling and Execution Order

**File:** `lab-01.js`

Explored the interaction between:
- Synchronous JavaScript execution
- `process.nextTick()`
- Promise microtasks
- `setTimeout()`
- `setImmediate()`
- File system I/O callbacks

**Key observations**

1. Synchronous statements execute before scheduled asynchronous callbacks.
2. In this CommonJS example, `process.nextTick()` callbacks execute before Promise microtasks.
3. Microtasks scheduled within a callback are processed at the appropriate callback boundary.
4. The relative ordering of `setTimeout(0)` and `setImmediate()` scheduled from the main module is not guaranteed.
5. I/O callback execution depends on when the underlying operation completes and the event loop can process it.

### Lab 02 — setTimeout() vs setImmediate() Inside I/O

**File:** `lab-02.js`

Scheduled both `setTimeout()` and `setImmediate()` inside an `fs.readFile()` callback.

**Observed output**

```text
I/O callback
Immediate
Timeout
```

Repeated the experiment five times in the local environment and observed the same ordering.

**Key learning**

When both callbacks are scheduled inside an I/O callback, `setImmediate()` executes before the timer callback in this scenario.

## Core Concepts Learned

### Event Loop
The event loop coordinates the execution of eligible asynchronous callbacks through its different phases.

### Non-blocking I/O
Asynchronous I/O allows Node.js to continue executing other JavaScript while waiting for operations such as database queries, file reads, and external API requests.

### Concurrency
Multiple operations can make progress during overlapping periods without requiring their JavaScript callbacks to execute simultaneously.

### Event-loop Blocking
CPU-intensive synchronous JavaScript occupies the main JavaScript thread and delays other callbacks.

### Worker Threads
CPU-intensive JavaScript can be moved to Worker Threads or other execution contexts to keep the main event loop responsive.

## Environment

```bash
node --version
# v24.13.0
```

Run the experiments:

```bash
node lab-01.js
node lab-02.js
```

## Learning Approach

These experiments are part of my ongoing Node.js backend engineering practice. The objective is to understand runtime behaviour through code execution, observation, and technical reasoning rather than relying solely on theoretical explanations.