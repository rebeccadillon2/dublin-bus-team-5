export const CalculateTrackLength = (ms) => {
  let secs = Math.floor(ms / 1000);
  let hrString = "";
  let secsLeft = secs;
  let hrs = Math.floor(secs / (60 * 60));
  if (hrs > 0) {
    hrString = `${hrs < 10 ? "0" : ""}${hrs}:`;
    secsLeft = secsLeft - hrs * 60 * 60;
  }
  let minsLeft = Math.floor(secsLeft / 60);
  let minString = `${minsLeft < 10 ? "0" : ""}${minsLeft}:`;
  secsLeft = secsLeft - minsLeft * 60;
  let secString = `${secsLeft < 10 ? "0" : ""}${secsLeft}`;
  return hrString.concat(minString).concat(secString);
};
