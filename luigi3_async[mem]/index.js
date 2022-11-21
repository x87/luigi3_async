/// <reference path="../.config/gta3.d.ts" />

import { Fade } from ".././.config/enums";
import { readScmVariable } from "./scm";
import { flag_luigi_mission3_passed, flag_industrial_passed } from "./scm_variables.mjs";
import { fading } from "./common.mjs";
import { startMission } from "./mission_runner";

ONMISSION = false;
const p = new Player(0);
const startPos = [p.getCoordinates().x + 2, p.getCoordinates().y, p.getCoordinates().z];
// const startPos = [892.8, -425.8, 13.9];

(async () => {
  while (true) {
    await starter(); // starter resolves when player is in the marker and can start the mission
    if (await startMission("./mission.mjs")) {
      // mission completed, create a starter for the next mission

      break;
    }
  }
})();

async function starter() {
  while (true) {
    await asyncWait(0);
    if (readScmVariable(flag_luigi_mission3_passed) || readScmVariable(flag_industrial_passed)) {
      exit();
    }

    // check if player is in the marker and can start the mission
    if (p.isPlaying() && p.locateOnFoot3D(...startPos, 1.5, 2.0, 2.0, true) && !ONMISSION) {
      if (p.canStartMission()) {
        log("*** STARTING MISSION luigi3 ***");
        p.makeSafeForCutscene();
        Camera.SetFadingColor(0, 0, 0);
        Camera.DoFade(1500, Fade.Out);
        Streaming.Switch(false);
        Text.PrintBig("LM3", 15000, 2); //"Drive Misty For Me."
        return fading();
      }
    }
  }
}
