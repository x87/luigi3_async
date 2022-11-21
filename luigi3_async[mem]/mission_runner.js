/// <reference path="../.config/gta3.d.ts" />
const p = new Player(0);

// needed to implement wasted_busted check and immediate mission failure
const _asyncWait = globalThis.asyncWait;
export async function asyncWait(delay) {
  await _asyncWait(delay);
  if (!p.isPlaying()) {
    throw new Error("MISSION ABORTED");
  }
}

export async function startMission(path) {
  const hasPassed = await (await import(path)).default();
  if (!hasPassed) {
    Text.ClearSmallPrints();
    ONMISSION = false;
  }
  return hasPassed;
}
