(() => {
  'use strict';

  const ALGO_INFO = {
    bubble: {
      name: 'Bubble Sort',
      complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: 'Yes', inplace: 'Yes' },
      what: 'Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
      uses: ['Educational purposes', 'Small datasets', 'Nearly sorted arrays'],
      pros: ['Simple implementation', 'Stable sort', 'In-place'],
      cons: ['O(n²) time complexity', 'Slow for large datasets', 'Many unnecessary swaps']
    },
    selection: {
      name: 'Selection Sort',
      complexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: 'No', inplace: 'Yes' },
      what: 'Selection Sort divides the input into sorted and unsorted regions, repeatedly selecting the smallest element from unsorted.',
      uses: ['Small datasets', 'Memory-constrained environments', 'When writes are expensive'],
      pros: ['Simple implementation', 'In-place', 'Minimal swaps'],
      cons: ['O(n²) time complexity', 'Not stable', 'Not adaptive']
    },
    insertion: {
      name: 'Insertion Sort',
      complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: 'Yes', inplace: 'Yes' },
      what: 'Insertion Sort builds the sorted array one element at a time by placing each element in its correct position.',
      uses: ['Small datasets', 'Nearly sorted arrays', 'Online sorting'],
      pros: ['Simple', 'Adaptive', 'Stable', 'Online'],
      cons: ['O(n²) average case', 'Inefficient on large lists']
    },
    merge: {
      name: 'Merge Sort',
      complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stable: 'Yes', inplace: 'No' },
      what: 'Merge Sort is a divide-and-conquer algorithm that divides the array, sorts halves recursively, and merges them back.',
      uses: ['Large datasets', 'Linked lists', 'External sorting', 'Stable sorting required'],
      pros: ['Guaranteed O(n log n)', 'Stable', 'Predictable performance'],
      cons: ['O(n) extra space', 'Slower than quicksort in practice', 'Recursive overhead']
    },
    quick: {
      name: 'Quick Sort',
      complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', stable: 'No', inplace: 'Yes' },
      what: 'Quick Sort selects a pivot and partitions the array around it, then recursively sorts the sub-arrays.',
      uses: ['General-purpose sorting', 'Arrays in memory', 'Cache-efficient applications'],
      pros: ['Fast in practice', 'In-place', 'Cache-friendly', 'Average O(n log n)'],
      cons: ['Worst case O(n²)', 'Not stable', 'Recursive']
    },
    heap: {
      name: 'Heap Sort',
      complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)', stable: 'No', inplace: 'Yes' },
      what: 'Heap Sort builds a max heap, then repeatedly extracts the maximum element and rebuilds the heap until sorted.',
      uses: ['Guaranteed O(n log n) needed', 'Priority queues', 'Memory-constrained systems'],
      pros: ['Guaranteed O(n log n)', 'In-place', 'No worst-case degradation'],
      cons: ['Not stable', 'Poor cache performance', 'Complex implementation']
    },
    shell: {
      name: 'Shell Sort',
      complexity: { best: 'O(n log n)', average: 'O(n^1.25)', worst: 'O(n²)', space: 'O(1)', stable: 'No', inplace: 'Yes' },
      what: 'Shell Sort generalizes insertion sort by allowing exchange of far-apart elements, progressively reducing the gap.',
      uses: ['Embedded systems', 'Medium-sized datasets', 'When simplicity matters'],
      pros: ['Faster than insertion sort', 'In-place', 'Simple'],
      cons: ['Gap sequence affects performance', 'Not stable', 'Complex analysis']
    },
    counting: {
      name: 'Counting Sort',
      complexity: { best: 'O(n+k)', average: 'O(n+k)', worst: 'O(n+k)', space: 'O(k)', stable: 'Yes', inplace: 'No' },
      what: 'Counting Sort counts occurrences of each value, then uses counts to compute output positions.',
      uses: ['Integer sorting', 'Small range of values', 'Subroutine in Radix Sort'],
      pros: ['Linear time', 'Stable', 'Simple'],
      cons: ['Limited to integers', 'Space depends on range', 'Not for large ranges']
    },
    radix: {
      name: 'Radix Sort',
      complexity: { best: 'O(d(n+k))', average: 'O(d(n+k))', worst: 'O(d(n+k))', space: 'O(n+k)', stable: 'Yes', inplace: 'No' },
      what: 'Radix Sort processes digits from least to most significant, using a stable sort at each digit position.',
      uses: ['Integer/string sorting', 'Fixed-length keys', 'Large datasets with bounded keys'],
      pros: ['Linear for bounded digits', 'Stable', 'Predictable'],
      cons: ['Only for integers/strings', 'Space overhead', 'd depends on key size']
    },
    bucket: {
      name: 'Bucket Sort',
      complexity: { best: 'O(n+k)', average: 'O(n+k)', worst: 'O(n²)', space: 'O(n+k)', stable: 'Yes', inplace: 'No' },
      what: 'Bucket Sort distributes elements into buckets, sorts each bucket, then concatenates them.',
      uses: ['Uniformly distributed data', 'Floating point numbers', 'External sorting'],
      pros: ['Linear for uniform data', 'Stable', 'Parallelizable'],
      cons: ['Worst case O(n²)', 'Sensitive to distribution', 'Extra space']
    }
  };

  const $ = (sel) => document.querySelector(sel);

  const els = {
    loadingScreen: $('#loadingScreen'), app: $('#app'),
    canvas: $('#visualizerCanvas'),
    algorithmSelect: $('#algorithmSelect'), arrayTypeSelect: $('#arrayTypeSelect'),
    sizeSlider: $('#sizeSlider'), speedSlider: $('#speedSlider'),
    sizeValue: $('#sizeValue'), speedValue: $('#speedValue'),
    startBtn: $('#startBtn'), pauseBtn: $('#pauseBtn'), resumeBtn: $('#resumeBtn'),
    stepBtn: $('#stepBtn'), resetBtn: $('#resetBtn'), newArrayBtn: $('#newArrayBtn'),
    customArrayBtn: $('#customArrayBtn'), exportBtn: $('#exportBtn'),
    themeToggle: $('#themeToggle'), soundToggle: $('#soundToggle'), screenshotBtn: $('#screenshotBtn'),
    canvasLabel: $('#canvasLabel'),
    expWhat: $('#expWhat'), expUses: $('#expUses'), expPros: $('#expPros'), expCons: $('#expCons'),
    customArrayModal: $('#customArrayModal'), customArrayInput: $('#customArrayInput'),
    customArrayApply: $('#customArrayApply'), customArrayCancel: $('#customArrayCancel')
  };

  let state = {
    array: [], arraySize: 50, speed: 50, algorithm: 'bubble', arrayType: 'random',
    sorting: false, paused: false, stepResolve: null,
    comparisons: 0, swaps: 0, startTime: 0, elapsedTime: 0, timerInterval: null,
    theme: 'dark', soundEnabled: false, abortController: null
  };

  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }

  function playBeep(freq, duration) {
    freq = freq || 440; duration = duration || 0.05;
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch (e) { }
  }

  function getCtx(canvas) { return canvas.getContext('2d'); }

  function resizeCanvas(canvas) {
    var rect = canvas.parentElement.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    var w = rect.width - 24;
    var h = parseInt(getComputedStyle(canvas).height);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    var ctx = getCtx(canvas);
    ctx.scale(dpr, dpr);
    return { w: w, h: h };
  }

  function drawBars(canvas, array, colors) {
    colors = colors || {};
    var ctx = getCtx(canvas);
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.width / dpr;
    var h = canvas.height / dpr;
    ctx.clearRect(0, 0, w, h);
    var n = array.length;
    if (n === 0) return;
    var maxVal = Math.max.apply(null, array);
    if (!isFinite(maxVal) || maxVal < 1) maxVal = 1;
    var gap = Math.max(1, Math.min(3, Math.floor(w / n * 0.1)));
    var barW = Math.max(1, (w - gap * (n + 1)) / n);
    var normalColor = getComputedStyle(document.documentElement).getPropertyValue('--bar-normal').trim();
    for (var i = 0; i < n; i++) {
      var barH = (array[i] / maxVal) * (h - 30);
      var x = gap + i * (barW + gap);
      var y = h - 10 - barH;
      ctx.fillStyle = colors[i] || normalColor;
      var r = Math.min(3, barW / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + barW - r, y);
      ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
      ctx.lineTo(x + barW, y + barH);
      ctx.lineTo(x, y + barH);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.fill();
    }
  }

  function generateArray(type, size) {
    var arr = [];
    var i, a, b;
    switch (type) {
      case 'random':
        for (i = 0; i < size; i++) arr.push(Math.floor(Math.random() * 1000) + 1);
        break;
      case 'nearly':
        for (i = 0; i < size; i++) arr.push(i + 1);
        for (i = 0; i < Math.floor(size * 0.1); i++) {
          a = Math.floor(Math.random() * size);
          b = Math.floor(Math.random() * size);
          var tmp = arr[a]; arr[a] = arr[b]; arr[b] = tmp;
        }
        break;
      case 'reversed':
        for (i = 0; i < size; i++) arr.push(size - i);
        break;
      case 'fewUnique':
        var vals = [100, 300, 500, 700, 900];
        for (i = 0; i < size; i++) arr.push(vals[Math.floor(Math.random() * vals.length)]);
        break;
      default:
        for (i = 0; i < size; i++) arr.push(Math.floor(Math.random() * 1000) + 1);
    }
    return arr;
  }

  function getDelay() {
    var s = state.speed;
    if (s <= 10) return 500;
    if (s <= 30) return 200;
    if (s <= 50) return 80;
    if (s <= 70) return 20;
    if (s <= 90) return 5;
    return 1;
  }

  function delay(signal) {
    if (signal && signal.aborted) return Promise.reject(new Error('aborted'));
    if (state.paused) {
      return new Promise(function(resolve, reject) {
        state.stepResolve = resolve;
        if (signal) signal.addEventListener('abort', function() {
          state.stepResolve = null;
          reject(new Error('aborted'));
        }, { once: true });
      });
    }
    var d = getDelay();
    return new Promise(function(resolve, reject) {
      var id = setTimeout(function() {
        if (signal && signal.aborted) { reject(new Error('aborted')); return; }
        resolve();
      }, d);
      if (signal) signal.addEventListener('abort', function() {
        clearTimeout(id);
        reject(new Error('aborted'));
      }, { once: true });
    });
  }

  function updateExplanation(algo) {
    var info = ALGO_INFO[algo];
    els.expWhat.textContent = info.what;
    els.expUses.innerHTML = '';
    info.uses.forEach(function(u) { var li = document.createElement('li'); li.textContent = u; els.expUses.appendChild(li); });
    els.expPros.innerHTML = '';
    info.pros.forEach(function(p) { var li = document.createElement('li'); li.textContent = p; els.expPros.appendChild(li); });
    els.expCons.innerHTML = '';
    info.cons.forEach(function(c) { var li = document.createElement('li'); li.textContent = c; els.expCons.appendChild(li); });
  }

  function updateAllInfo() {
    var algo = state.algorithm;
    els.canvasLabel.textContent = ALGO_INFO[algo].name;
    updateExplanation(algo);
  }

  async function bubbleSort(canvas, arr, signal) {
    var n = arr.length;
    var sorted = new Set();
    for (var i = 0; i < n - 1; i++) {
      for (var j = 0; j < n - i - 1; j++) {
        if (signal && signal.aborted) throw new Error('aborted');
        state.comparisons++;
        var cols = {};
        cols[j] = '#fbbf24'; cols[j+1] = '#fbbf24';
        sorted.forEach(function(k) { cols[k] = '#34d399'; });
        drawBars(canvas, arr, cols);

        await delay(signal);
        if (arr[j] > arr[j+1]) {
          state.swaps++;
          var tmp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = tmp;
          cols = {}; cols[j] = '#f87171'; cols[j+1] = '#f87171';
          sorted.forEach(function(k) { cols[k] = '#34d399'; });
          drawBars(canvas, arr, cols);
          playBeep(300 + arr[j] * 0.5);
  
          await delay(signal);
        }
      }
      sorted.add(n - i - 1);
    }
    sorted.add(0);
    var finalCols = {};
    sorted.forEach(function(k) { finalCols[k] = '#34d399'; });
    drawBars(canvas, arr, finalCols);
  }

  async function selectionSort(canvas, arr, signal) {
    var n = arr.length;
    var sorted = new Set();
    for (var i = 0; i < n - 1; i++) {
      var minIdx = i;
      for (var j = i + 1; j < n; j++) {
        if (signal && signal.aborted) throw new Error('aborted');
        state.comparisons++;
        var cols = {};
        cols[minIdx] = '#fb923c'; cols[j] = '#fbbf24';
        sorted.forEach(function(k) { cols[k] = '#34d399'; });
        drawBars(canvas, arr, cols);

        await delay(signal);
        if (arr[j] < arr[minIdx]) {
          if (minIdx !== i) cols[minIdx] = '#fbbf24';
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        var tmp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = tmp;
        state.swaps++;
        cols = {}; cols[i] = '#f87171'; cols[minIdx] = '#f87171';
        drawBars(canvas, arr, cols);
        playBeep(300 + arr[i] * 0.5);

        await delay(signal);
      }
      sorted.add(i);
    }
    sorted.add(n - 1);
    var finalCols = {};
    sorted.forEach(function(k) { finalCols[k] = '#34d399'; });
    drawBars(canvas, arr, finalCols);
  }

  async function insertionSort(canvas, arr, signal) {
    var n = arr.length;
    for (var i = 1; i < n; i++) {
      var key = arr[i];
      var j = i - 1;
      var cols = {};
      cols[i] = '#fbbf24';
      for (var k = 0; k < i; k++) cols[k] = '#34d399';
      drawBars(canvas, arr, cols);

      await delay(signal);
      while (j >= 0 && arr[j] > key) {
        if (signal && signal.aborted) throw new Error('aborted');
        state.comparisons++;
        arr[j + 1] = arr[j];
        state.swaps++;
        cols = {}; cols[j] = '#f87171'; cols[j+1] = '#f87171';
        for (var m = 0; m < i; m++) { if (m !== j && m !== j+1) cols[m] = '#34d399'; }
        drawBars(canvas, arr, cols);
        playBeep(300 + arr[j+1] * 0.5);

        await delay(signal);
        j--;
      }
      state.comparisons++;
      arr[j + 1] = key;
    }
    var finalCols = {};
    for (var p = 0; p < n; p++) finalCols[p] = '#34d399';
    drawBars(canvas, arr, finalCols);
  }

  async function mergeSort(canvas, arr, signal) {
    var sorted = new Set();
    async function mergeSortRec(left, right) {
      if (left >= right) return;
      var mid = Math.floor((left + right) / 2);
      await mergeSortRec(left, mid);
      await mergeSortRec(mid + 1, right);
      var merged = [];
      var i = left, j = mid + 1;
      while (i <= mid && j <= right) {
        if (signal && signal.aborted) throw new Error('aborted');
        state.comparisons++;
        var cols = {};
        cols[i] = '#fbbf24'; cols[j] = '#a78bfa';
        for (var s = left; s <= right; s++) {
          if (s !== i && s !== j && sorted.has(s)) cols[s] = '#34d399';
        }
        drawBars(canvas, arr, cols);

        await delay(signal);
        if (arr[i] <= arr[j]) {
          merged.push(arr[i++]);
        } else {
          merged.push(arr[j++]);
          state.swaps++;
        }
      }
      while (i <= mid) merged.push(arr[i++]);
      while (j <= right) merged.push(arr[j++]);
      for (var k = 0; k < merged.length; k++) {
        arr[left + k] = merged[k];
      }
      var cols2 = {};
      for (var m = left; m <= right; m++) cols2[m] = '#34d399';
      drawBars(canvas, arr, cols2);
      playBeep(400);

      await delay(signal);
    }
    await mergeSortRec(0, arr.length - 1);
    var finalCols = {};
    for (var p = 0; p < arr.length; p++) finalCols[p] = '#34d399';
    drawBars(canvas, arr, finalCols);
  }

  async function quickSort(canvas, arr, signal) {
    var sorted = new Set();
    async function quickSortRec(low, high) {
      if (low >= high) {
        if (low === high) sorted.add(low);
        return;
      }
      var pivotIdx = await partition(low, high);
      sorted.add(pivotIdx);
      await quickSortRec(low, pivotIdx - 1);
      await quickSortRec(pivotIdx + 1, high);
    }

    async function partition(low, high) {
      var pivot = arr[high];
      var i = low - 1;
      for (var j = low; j < high; j++) {
        if (signal && signal.aborted) throw new Error('aborted');
        state.comparisons++;
        var cols = {};
        cols[high] = '#a78bfa'; cols[j] = '#fbbf24';
        if (i >= low) cols[i] = '#f87171';
        sorted.forEach(function(k) { if (k !== high && k !== j && k !== i) cols[k] = '#34d399'; });
        drawBars(canvas, arr, cols);

        await delay(signal);
        if (arr[j] < pivot) {
          i++;
          var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
          state.swaps++;
          cols = {}; cols[high] = '#a78bfa'; cols[i] = '#f87171'; cols[j] = '#f87171';
          drawBars(canvas, arr, cols);
          playBeep(300 + arr[i] * 0.5);
  
          await delay(signal);
        }
      }
      var tmp2 = arr[i+1]; arr[i+1] = arr[high]; arr[high] = tmp2;
      state.swaps++;
      var cols2 = {};
      cols2[high] = '#f87171'; cols2[i+1] = '#f87171';
      drawBars(canvas, arr, cols2);
      playBeep(350);

      await delay(signal);
      return i + 1;
    }

    await quickSortRec(0, arr.length - 1);
    var finalCols = {};
    for (var p = 0; p < arr.length; p++) finalCols[p] = '#34d399';
    drawBars(canvas, arr, finalCols);
  }

  async function heapSort(canvas, arr, signal) {
    var n = arr.length;
    async function heapify(size, root) {
      var largest = root;
      var left = 2 * root + 1;
      var right = 2 * root + 2;
      if (left < size) {
        state.comparisons++;
        var cols = {};
        cols[root] = '#fbbf24'; cols[left] = '#22d3ee';
        drawBars(canvas, arr, cols);

        await delay(signal);
        if (arr[left] > arr[largest]) largest = left;
      }
      if (right < size) {
        state.comparisons++;
        var cols2 = {};
        cols2[root] = '#fbbf24'; cols2[right] = '#22d3ee';
        drawBars(canvas, arr, cols2);

        await delay(signal);
        if (arr[right] > arr[largest]) largest = right;
      }
      if (largest !== root) {
        var tmp = arr[root]; arr[root] = arr[largest]; arr[largest] = tmp;
        state.swaps++;
        var cols3 = {};
        cols3[root] = '#f87171'; cols3[largest] = '#f87171';
        drawBars(canvas, arr, cols3);
        playBeep(300 + arr[root] * 0.5);

        await delay(signal);
        await heapify(size, largest);
      }
    }

    for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(n, i);
    }
    var sorted = new Set();
    for (var j = n - 1; j > 0; j--) {
      var tmp2 = arr[0]; arr[0] = arr[j]; arr[j] = tmp2;
      state.swaps++;
      sorted.add(j);
      var cols = {};
      cols[0] = '#f87171'; cols[j] = '#f87171';
      sorted.forEach(function(k) { if (k !== j) cols[k] = '#34d399'; });
      drawBars(canvas, arr, cols);
      playBeep(350);

      await delay(signal);
      await heapify(j, 0);
    }
    sorted.add(0);
    var finalCols = {};
    sorted.forEach(function(k) { finalCols[k] = '#34d399'; });
    drawBars(canvas, arr, finalCols);
  }

  async function shellSort(canvas, arr, signal) {
    var n = arr.length;
    var gap = Math.floor(n / 2);
    while (gap > 0) {
      for (var i = gap; i < n; i++) {
        if (signal && signal.aborted) throw new Error('aborted');
        var temp = arr[i];
        var j = i;
        var cols = {};
        cols[i] = '#fb923c';
        drawBars(canvas, arr, cols);

        await delay(signal);
        while (j >= gap) {
          state.comparisons++;
          cols = {}; cols[j] = '#fbbf24'; cols[j - gap] = '#fb923c';
          drawBars(canvas, arr, cols);
  
          await delay(signal);
          if (arr[j - gap] > temp) {
            arr[j] = arr[j - gap];
            state.swaps++;
            cols = {}; cols[j] = '#f87171'; cols[j - gap] = '#f87171';
            drawBars(canvas, arr, cols);
            playBeep(300 + arr[j] * 0.5);
    
            await delay(signal);
            j -= gap;
          } else {
            break;
          }
        }
        arr[j] = temp;
      }
      gap = Math.floor(gap / 2);
    }
    var finalCols = {};
    for (var p = 0; p < n; p++) finalCols[p] = '#34d399';
    drawBars(canvas, arr, finalCols);
  }

  async function countingSort(canvas, arr, signal) {
    var n = arr.length;
    var maxVal = Math.max.apply(null, arr);
    var minVal = Math.min.apply(null, arr);
    var range = maxVal - minVal + 1;
    var count = new Array(range).fill(0);
    var output = new Array(n);

    for (var i = 0; i < n; i++) {
      if (signal && signal.aborted) throw new Error('aborted');
      count[arr[i] - minVal]++;
      var cols = {}; cols[i] = '#ec4899';
      drawBars(canvas, arr, cols);

      await delay(signal);
    }

    for (var j = 1; j < range; j++) count[j] += count[j - 1];

    for (var k = n - 1; k >= 0; k--) {
      if (signal && signal.aborted) throw new Error('aborted');
      output[count[arr[k] - minVal] - 1] = arr[k];
      count[arr[k] - minVal]--;
      state.swaps++;
      var cols2 = {}; cols2[k] = '#f87171';
      drawBars(canvas, arr, cols2);
      playBeep(300 + arr[k] * 0.3);

      await delay(signal);
    }

    for (var m = 0; m < n; m++) {
      arr[m] = output[m];
    }
    var finalCols = {};
    for (var p = 0; p < n; p++) finalCols[p] = '#34d399';
    drawBars(canvas, arr, finalCols);
  }

  async function radixSort(canvas, arr, signal) {
    var n = arr.length;
    var maxVal = Math.max.apply(null, arr);

    for (var exp = 1; Math.floor(maxVal / exp) > 0; exp *= 10) {
      var output = new Array(n);
      var count = new Array(10).fill(0);

      for (var i = 0; i < n; i++) {
        if (signal && signal.aborted) throw new Error('aborted');
        var digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
        var cols = {}; cols[i] = '#6366f1';
        drawBars(canvas, arr, cols);

        await delay(signal);
      }

      for (var j = 1; j < 10; j++) count[j] += count[j - 1];

      for (var k = n - 1; k >= 0; k--) {
        var digit2 = Math.floor(arr[k] / exp) % 10;
        output[count[digit2] - 1] = arr[k];
        count[digit2]--;
        state.swaps++;
      }

      for (var m = 0; m < n; m++) arr[m] = output[m];
      var cols3 = {};
      for (var q = 0; q < n; q++) cols3[q] = '#6366f1';
      drawBars(canvas, arr, cols3);
      playBeep(400 + exp);

      await delay(signal);
    }
    var finalCols = {};
    for (var p = 0; p < n; p++) finalCols[p] = '#34d399';
    drawBars(canvas, arr, finalCols);
  }

  async function bucketSort(canvas, arr, signal) {
    var n = arr.length;
    if (n === 0) return;
    var maxVal = Math.max.apply(null, arr);
    var minVal = Math.min.apply(null, arr);
    var bucketCount = Math.floor(Math.sqrt(n));
    if (bucketCount < 2) bucketCount = 2;
    var bucketSize = (maxVal - minVal + 1) / bucketCount;
    var buckets = [];
    for (var i = 0; i < bucketCount; i++) buckets.push([]);

    for (var j = 0; j < n; j++) {
      if (signal && signal.aborted) throw new Error('aborted');
      var idx = Math.floor((arr[j] - minVal) / bucketSize);
      if (idx >= bucketCount) idx = bucketCount - 1;
      buckets[idx].push(arr[j]);
      var cols = {}; cols[j] = '#84cc16';
      drawBars(canvas, arr, cols);

      await delay(signal);
    }

    var outputIdx = 0;
    for (var b = 0; b < bucketCount; b++) {
      buckets[b].sort(function(a, c) { return a - c; });
      for (var k = 0; k < buckets[b].length; k++) {
        arr[outputIdx] = buckets[b][k];
        var cols2 = {}; cols2[outputIdx] = '#84cc16';
        drawBars(canvas, arr, cols2);
        playBeep(300 + arr[outputIdx] * 0.3);

        await delay(signal);
        outputIdx++;
      }
    }
    var finalCols = {};
    for (var p = 0; p < n; p++) finalCols[p] = '#34d399';
    drawBars(canvas, arr, finalCols);
  }

  var SORT_FUNCTIONS = {
    bubble: bubbleSort, selection: selectionSort, insertion: insertionSort,
    merge: mergeSort, quick: quickSort, heap: heapSort,
    shell: shellSort, counting: countingSort, radix: radixSort, bucket: bucketSort
  };

  async function runSort(canvas, arr, algo, signal) {
    var fn = SORT_FUNCTIONS[algo];
    if (fn) await fn(canvas, arr, signal);
  }

  function startTimer() {
    state.startTime = Date.now() - state.elapsedTime;
    state.timerInterval = setInterval(function() {
      state.elapsedTime = Date.now() - state.startTime;
    }, 50);
  }

  function stopTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  function setButtonStates(sorting) {
    els.startBtn.disabled = sorting;
    els.pauseBtn.disabled = !sorting || state.paused;
    els.resumeBtn.disabled = !sorting || !state.paused;
    els.stepBtn.disabled = !sorting || !state.paused;
    els.algorithmSelect.disabled = sorting;
    els.arrayTypeSelect.disabled = sorting;
    els.sizeSlider.disabled = sorting;
  }

  async function startSorting() {
    if (state.sorting) return;
    state.sorting = true;
    state.paused = false;
    state.comparisons = 0;
    state.swaps = 0;
    state.elapsedTime = 0;
    state.array = state.array.slice();
    setButtonStates(true);
    startTimer();

    var signal;
    if (typeof AbortController !== 'undefined') {
      state.abortController = new AbortController();
      signal = state.abortController.signal;
    }

    try {
      await runSort(els.canvas, state.array, state.algorithm, signal);
      state.elapsedTime = Date.now() - state.startTime;
      playBeep(600, 0.15);
    } catch (e) {
      if (e.message !== 'aborted') console.error(e);
    }

    stopTimer();
    state.sorting = false;
    state.paused = false;
    setButtonStates(false);
    els.pauseBtn.disabled = true;
    els.resumeBtn.disabled = true;
    els.stepBtn.disabled = true;
  }

  function pauseSorting() {
    if (!state.sorting || state.paused) return;
    state.paused = true;
    stopTimer();
    setButtonStates(true);
  }

  function resumeSorting() {
    if (!state.sorting || !state.paused) return;
    state.paused = false;
    startTimer();
    setButtonStates(true);
    if (state.stepResolve) {
      var resolve = state.stepResolve;
      state.stepResolve = null;
      resolve();
    }
  }

  function stepForward() {
    if (!state.sorting || !state.paused) return;
    if (state.stepResolve) {
      var resolve = state.stepResolve;
      state.stepResolve = null;
      resolve();
    }
  }

  function resetSorting() {
    if (state.abortController) {
      state.abortController.abort();
    }
    stopTimer();
    if (state.stepResolve) {
      var resolve = state.stepResolve;
      state.stepResolve = null;
      resolve();
    }
    state.sorting = false;
    state.paused = false;
    state.comparisons = 0;
    state.swaps = 0;
    state.elapsedTime = 0;
    state.array = generateArray(state.arrayType, state.arraySize);
    setButtonStates(false);
    els.pauseBtn.disabled = true;
    els.resumeBtn.disabled = true;
    els.stepBtn.disabled = true;

    refreshCanvas();
  }

  function new_array() {
    if (state.sorting) resetSorting();
    state.array = generateArray(state.arrayType, state.arraySize);
    state.comparisons = 0;
    state.swaps = 0;
    state.elapsedTime = 0;
    refreshCanvas();
  }

  function refreshCanvas() {
    resizeCanvas(els.canvas);
    drawBars(els.canvas, state.array);
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('sortviz-theme', state.theme);
    refreshCanvas();
  }

  function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    var on = els.soundToggle.querySelector('.sound-on-icon');
    var off = els.soundToggle.querySelector('.sound-off-icon');
    on.style.display = state.soundEnabled ? '' : 'none';
    off.style.display = state.soundEnabled ? 'none' : '';
  }

  function takeScreenshot() {
    var link = document.createElement('a');
    link.download = 'sorting-visualization.png';
    link.href = els.canvas.toDataURL('image/png');
    link.click();
  }

  function exportStats() {
    var data = {
      algorithm: ALGO_INFO[state.algorithm].name,
      arraySize: state.arraySize,
      arrayType: state.arrayType,
      comparisons: state.comparisons,
      swaps: state.swaps,
      timeElapsed: (state.elapsedTime / 1000).toFixed(2) + 's',
      speed: state.speed,
      complexity: ALGO_INFO[state.algorithm].complexity
    };
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var link = document.createElement('a');
    link.download = 'sorting-stats.json';
    link.href = URL.createObjectURL(blob);
    link.click();
  }

  function initEventListeners() {
    els.startBtn.addEventListener('click', startSorting);
    els.pauseBtn.addEventListener('click', pauseSorting);
    els.resumeBtn.addEventListener('click', resumeSorting);
    els.stepBtn.addEventListener('click', stepForward);
    els.resetBtn.addEventListener('click', resetSorting);
    els.newArrayBtn.addEventListener('click', new_array);
    els.themeToggle.addEventListener('click', toggleTheme);
    els.soundToggle.addEventListener('click', toggleSound);
    els.screenshotBtn.addEventListener('click', takeScreenshot);
    els.exportBtn.addEventListener('click', exportStats);

    els.algorithmSelect.addEventListener('change', function() {
      state.algorithm = this.value;
      updateAllInfo();
    });

    els.arrayTypeSelect.addEventListener('change', function() {
      state.arrayType = this.value;
      new_array();
    });

    els.sizeSlider.addEventListener('input', function() {
      state.arraySize = parseInt(this.value);
      els.sizeValue.textContent = this.value;
      if (!state.sorting) {
        state.array = generateArray(state.arrayType, state.arraySize);
        refreshCanvas();
      }
    });

    els.speedSlider.addEventListener('input', function() {
      state.speed = parseInt(this.value);
      els.speedValue.textContent = this.value;
    });

    els.customArrayBtn.addEventListener('click', function() {
      els.customArrayModal.classList.remove('hidden');
      els.customArrayInput.focus();
    });

    els.customArrayApply.addEventListener('click', function() {
      var val = els.customArrayInput.value;
      var nums = val.split(',').map(function(s) { return parseInt(s.trim()); }).filter(function(n) { return !isNaN(n) && n > 0; });
      if (nums.length > 0) {
        if (state.sorting) resetSorting();
        state.array = nums;
        state.arraySize = nums.length;
        els.sizeSlider.value = nums.length;
        els.sizeValue.textContent = nums.length;
        refreshCanvas();

      }
      els.customArrayModal.classList.add('hidden');
    });

    els.customArrayCancel.addEventListener('click', function() {
      els.customArrayModal.classList.add('hidden');
    });

    document.addEventListener('keydown', function(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          if (state.sorting && !state.paused) pauseSorting();
          else if (state.sorting && state.paused) resumeSorting();
          else startSorting();
          break;
        case 'KeyR': resetSorting(); break;
        case 'KeyN': new_array(); break;
        case 'KeyS': if (!state.sorting) startSorting(); break;
        case 'KeyT': toggleTheme(); break;
        case 'KeyM': toggleSound(); break;
        case 'ArrowRight': if (state.paused) stepForward(); break;
      }
    });

    window.addEventListener('resize', function() {
      if (!state.sorting) refreshCanvas();
    });

    document.addEventListener('mousemove', function(ev) {
      var btns = document.querySelectorAll('.btn, .icon-btn');
      btns.forEach(function(btn) {
        var rect = btn.getBoundingClientRect();
        btn.style.setProperty('--x', ((ev.clientX - rect.left) / rect.width * 100) + '%');
        btn.style.setProperty('--y', ((ev.clientY - rect.top) / rect.height * 100) + '%');
      });
    });

    els.customArrayModal.addEventListener('click', function(e) {
      if (e.target === els.customArrayModal) els.customArrayModal.classList.add('hidden');
    });
  }

  function init() {
    var savedTheme = localStorage.getItem('sortviz-theme');
    if (savedTheme) {
      state.theme = savedTheme;
      document.documentElement.setAttribute('data-theme', state.theme);
    }

    state.array = generateArray(state.arrayType, state.arraySize);

    setTimeout(function() {
      resizeCanvas(els.canvas);
      drawBars(els.canvas, state.array);
      updateAllInfo();

      els.loadingScreen.classList.add('hidden');
      els.app.classList.add('visible');
    }, 800);

    initEventListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
