import React from "react";
import { PlayTrack } from "../../lib/api";
import { getPayload } from "../../lib/auth";

export function TrackDetail({ track, type, moveBack, moveForward, preview }) {
  const uid = getPayload().sub;
  const uri =
    type === "podcast"
      ? `spoitfy:episode:${track.id}`
      : `spoitfy:track:${track.id}`;

  const playTrack = () => {
    PlayTrack(uri, uid);
  };

  return (
    <div>
      <button className='p-2 bg-primary-blue' onClick={playTrack}>
        Play
      </button>
      {track.name}
    </div>
  );
}
