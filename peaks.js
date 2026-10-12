const r = require("raylib");

function calcPeaks(points) {
  const peaks = [];

  for (let i = 1; i < points.length - 1; i++) {
    if (points[i] > points[i + 1] && points[i] > points[i - 1]) {
      peaks.push(i);
    }
  }

  return peaks;
}

function setup() {
  const WIDTH = 1000;
  const HEIGHT = 1000;
  const widthPerPoint = 50;
  const data = [100, 45, 78, 23, 91, 56, 34, 67, 89, 40, 60, 100, 67, 28, 19, 0, 28, 50, 69, 70];
  const peakPointWidth = 4;
  const colorPalette = {
    bg: r.RAYWHITE,
    peak: r.RED,
    line: r.BLACK
  };
  const maxBarWidthRatio = 0.9

  const peaks = calcPeaks(data);

  const world = { WIDTH, HEIGHT, widthPerPoint, data, peakPointWidth, colorPalette, peaks, maxBarWidthRatio };

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

function calcScalingFactor(w) {
  const maxValue = findMax(w.data);
  const maxHeight = w.maxBarWidthRatio * w.HEIGHT;
  const scalingFactor = maxHeight / maxValue;

  return scalingFactor;
}

function drawLineGraph(w) {
  const scalingFactor = calcScalingFactor(w);

  for (let i = 1; i < w.data.length; i++) {
    const point1 = {
      x: i * w.widthPerPoint,
      y: w.HEIGHT - w.data[i] * scalingFactor
    }
    const point2 = {
      x: (i - 1) * w.widthPerPoint,
      y: w.HEIGHT - w.data[i - 1] * scalingFactor
    }

    r.DrawLineEx(point1, point2, 5, w.colorPalette.line);
  }
}

function drawPeak(w) {
  const scalingFactor = calcScalingFactor(w);

  for (const i of w.peaks) {
    const x = i * w.widthPerPoint;
    const y = w.HEIGHT - w.data[i] * scalingFactor;

    r.DrawCircle(x, y, w.peakPointWidth, w.colorPalette.peak);
  }
}

function draw(w) {
  r.BeginDrawing();
  r.ClearBackground(w.colorPalette.bg);

  drawLineGraph(w);
  drawPeak(w);

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