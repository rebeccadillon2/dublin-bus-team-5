import React, { useContext } from "react";
import { BsSpotify } from "react-icons/bs";
import { FaStepBackward, FaStepForward } from "react-icons/fa";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

import { useTheme } from "../../hooks";
import { SpotifyContext } from "../../App";
import CurrentTrackContext from "./context";
import { getPayload } from "../../lib/auth";
import { playTrack, pauseTrack } from "../../lib/api";
import { CalculateTrackLength, SpotifyProgressBar } from ".";

const TrackDetail = (props) => {
  const {
    type,
    track,
    preview,
    loading,
    moveForwards,
    moveBackwards,
    ...rest
  } = props;
  const [isDarkMode] = useTheme();
  const uid = getPayload().sub;
  const { playSpotifyTrack } = useContext(SpotifyContext);
  let currentTrackDetails = useContext(CurrentTrackContext);
  const trackLength = CalculateTrackLength(track.durationMs);

  const uri =
    type === "podcast"
      ? `spotify:episode:${track.id}`
      : `spotify:track:${track.id}`;

  let is_playing =
    track.id === currentTrackDetails.currentTrackId &&
    currentTrackDetails.isPlaying;

  const playTrackNow = () => {
    if (playSpotifyTrack == null) {
      // Play from users actual spotify app
      playTrack(uri, uid);
    } else {
      // Play from sdk
      playSpotifyTrack(uri);
    }
  };

  const pauseTrackNow = () => {
    pauseTrack(uid);
  };

  let progress = is_playing
    ? Math.floor(100 * (currentTrackDetails.progress / track.durationMs))
    : 0;

  return (
    <>
      <div className='w-100% flex justify-center items-center z-20' {...rest}>
        <div className='flex flex-1 justify-start'>
          {preview ? null : (
            <div
              className={`${
                isDarkMode ? "text-system-grey3" : "text-system-grey6"
              } h-2 w-2  pb-4 cursor-pointer active:text-system-grey4`}
              onClick={(e) => {
                e.stopPropagation();
                pauseTrack(uid);
                moveBackwards();
              }}
            >
              <FaStepBackward />
            </div>
          )}
          {preview ? (
            <BsSpotify className='w-3 h-3 text-[#1DB954] mr-[8px]' />
          ) : null}
        </div>
        <div
          className={`${
            isDarkMode ? "text-system-grey3" : "text-system-grey6"
          } cursor-pointer active:text-system-grey4`}
          onClick={(e) => {
            e.stopPropagation();
            is_playing == false ? playTrackNow() : pauseTrackNow();
          }}
        >
          {is_playing ? (
            <BsFillPauseFill className='h-6 w-6' />
          ) : (
            <BsFillPlayFill className='h-6 w-6' />
          )}
        </div>
        <div className='flex flex-1 justify-end'>
          {preview ? null : (
            <div
              className={`${
                isDarkMode ? "text-system-grey3" : "text-system-grey6"
              } h-2 w-2 pb-4 mr-2 cursor-pointer active:text-system-grey4`}
              onClick={() => {
                pauseTrack(uid);
                moveForwards();
              }}
            >
              <FaStepForward />
            </div>
          )}
        </div>
      </div>

      {preview ? null : (
        <>
          <div className='w-100% my-1'>
            <SpotifyProgressBar progress={progress} trackLength={trackLength} />
          </div>
          <div className='flex w-100% pt-0.5'>
            <p className='text-[11px] text-system-grey4 truncate'>
              {track.name}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default TrackDetail;
