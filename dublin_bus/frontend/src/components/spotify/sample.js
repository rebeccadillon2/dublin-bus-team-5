import React, { useState, useEffect } from "react";
import { getArtistInfo } from "../../lib/api";
import { getPayload } from "../../lib/auth";
import TrackDetail from "./track-detail";

export function SpotifySample({ artistName }) {
  const [artistSongs, setArtistSongs] = useState([]);
  const uid = getPayload().sub;

  useEffect(() => {
    const getArtistSongs = async () => {
      try {
        const res = await getArtistInfo(artistName, uid);
        setArtistSongs(res.data.songs);
      } catch (e) {
        console.log(e);
      }
    };
    getArtistSongs();
  }, []);

  return (
    <div>
      {artistSongs && artistSongs.length > 0 ? (
        <div
          style={{
            borderRadius: "0 8px 0 100px",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
          className='absolute top-0 right-0 z-50 bg-primary-blue p-5 w-[60px] h-[60px] flex flex-row justify-end rounded-t-xl'
        >
          <TrackDetail
            type='track'
            sample={true}
            track={artistSongs[0]}
            moveForwards={() => {}}
            moveBackwards={() => {}}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
