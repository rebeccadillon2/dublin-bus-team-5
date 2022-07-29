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
        setArtistSongs(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getArtistSongs();
  }, []);

  return (
    <div>
      {artistSongs && artistSongs.length > 0 ? (
        <div className='absolute top-0 right-0 index-20 bg-[rgba(255, 255, 255, 0.5)] p-4 w-[55px] h-[55px] border-l-[100px] flex flex-row justify-end'>
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
