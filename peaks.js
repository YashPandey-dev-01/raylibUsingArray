const r = require("raylib");

function setup() {
  const world = {
    WIDTH: 1000,
    HEIGHT: 1000,
    widthPerPoint: 50,
    data: [12, 45, 78, 23, 91, 56, 34, 67, 89, 40, 60, 100, 67, 28, 19, 40, 28, 50, 69, 90],
    // data: [12, 45, 78, 23, 91, 56, 34, 67, 89, 40],
    peakPointWidth: 4,
    colorPalette: {
      bg: r.RAYWHITE,
      peak: r.RED,
      line: r.BLACK
    }
  };

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(world.WIDTH, world.HEIGHT, "Raylib using Trignometry Concepts");
  r.SetTargetFPS(60);

  return world;
}

function findMax(arr) {
  let max = - Infinity;

  for (let i = 0; i < arr.length; i++) {
    max = Math.max(arr[i], max);
  }

  return max;
}

function calcGraphPoints(w) {
  const maxValue = findMax(w.data);
  const maxHeight = 0.9 * w.HEIGHT;
  const scalingFactor = maxHeight / maxValue;
  const graphPoints = [];

  for (let i = 0; i < w.data.length; i++) {
    const x = i * w.widthPerPoint;
    const y = w.HEIGHT - w.data[i] * scalingFactor;
    graphPoints.push([x, y]);
  }

  return graphPoints;
}

function connectPoints(points, color) {
  for (let i = 0; i < points.length - 1; i++) {
    const x1 = points[i][0];
    const y1 = points[i][1];
    const x2 = points[i + 1][0];
    const y2 = points[i + 1][1];

    r.DrawLine(x1, y1, x2, y2, color);
  }
}

function calcPeaks(points) {
  const peaks = [];

  for (let i = 1; i < points.length - 1; i++) {
    if (points[i] > points[i + 1] && points[i] > points[i - 1]) {
      peaks.push({ idx: i, data: points[i] });;
    }
  }

  return peaks;
}

function drawPeaks(w, peaks, color) {
  const maxValue = findMax(w.data);
  const maxHeight = 0.9 * w.HEIGHT;
  const scalingFactor = maxHeight / maxValue;
  let nPeak = 0;

  for (let i = 0; i < w.data.length && nPeak < peaks.length; i++) {
    if (i === peaks[nPeak].idx) {
      const x = i * w.widthPerPoint;
      const y = w.HEIGHT - w.data[i] * scalingFactor;
      r.DrawCircle(x, y, w.peakPointWidth, color);
      nPeak++;
    }
  }
}

function drawGraph(w) {
  const graphPoints = calcGraphPoints(w);
  const peaks = calcPeaks(w.data);

  connectPoints(graphPoints, w.colorPalette.line);
  drawPeaks(w, peaks, w.colorPalette.peak);
}

function draw(w) {
  r.BeginDrawing();
  r.ClearBackground(w.colorPalette.bg);

  drawGraph(w);

  r.EndDrawing();
}

function loop(w) {
  while (!r.WindowShouldClose()) {
    draw(w);
  }
}

function teardown() {
  r.CloseWindow();
}

function main() {
  const w = setup();
  loop(w);
  teardown();
}

main();