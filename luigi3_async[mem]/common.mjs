export async function fading() {
  while (Camera.GetFadingStatus()) {
    await asyncWait(0);
  }
}
