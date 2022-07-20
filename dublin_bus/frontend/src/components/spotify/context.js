import React from "react";

const CurrentTrackContext = React.createContext({
  progress: null,
  isPlaying: null,
  currentTrackId: null,
  currentTrackName: null,
});

export const CurrentTrackContextProvider = CurrentTrackContext.Provider;

export default CurrentTrackContext;
