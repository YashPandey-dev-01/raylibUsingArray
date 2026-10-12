const r = require("raylib");

function setup() {
  const world = {
    WIDTH: 500,
    HEIGHT: 500,
    barWidth: 30,
    barGap: 4,
    data: [12, 45, 78, 23, 91, 56, 34, 67, 89, 40, 60, 100, 67, 28, 19, 40, 28, 50, 69, 90],
    colorPalette: {
      bg: r.RAYWHITE,
      bar: r.DARKBLUE,
      avgLine: r.RED
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
    max = arr[i] > max ? arr[i] : max;
  }

  return max;
}

function drawBar(w, scalingFactor) {

  for (let i = 0; i < w.data.length; i++) {
    let x = i * (w.barWidth + w.barGap);
    let y = w.HEIGHT - w.data[i] * scalingFactor;
    let width = w.barWidth;
    let height = w.data[i] * scalingFactor;

    r.DrawRectangle(x, y, width, height, w.colorPalette.bar);
  }

}

function calcAvg(arr) {
  let sum = 0;

  for (let i of arr) {
    sum = sum + i;
  }

  return sum / arr.length;
}

function drawAvgLine(w, scalingFactor) {
  const avg = calcAvg(w.data);
  const y = w.HEIGHT - avg * scalingFactor;

  r.DrawLine(0, y, w.WIDTH, y, w.colorPalette.avgLine);
}

function drawGraph(w) {
  const maxValue = findMax(w.data);
  const maxHeight = (90 / 100) * w.HEIGHT;
  const scalingFactor = maxHeight / maxValue;

  drawBar(w, scalingFactor);
  drawAvgLine(w, scalingFactor);
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