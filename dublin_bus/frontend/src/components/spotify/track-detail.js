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
  const { type, track, sample, loading, moveForwards, moveBackwards, ...rest } =
    props;
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
          {sample ? null : (
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
          {sample ? (
            <BsSpotify className='w-6 h-6 text-[#1DB954] mb-3 ml-5' />
          ) : null}
        </div>
        <div
          className={`${
            isDarkMode
              ? sample
                ? "text-system-grey4 active:text-system-grey3"
                : "text-system-grey3  active:text-system-grey4"
              : sample
              ? "text-system-grey2 active:text-system-grey3"
              : "text-system-grey6 active:text-system-grey4"
          } ${sample && "pb-3 pr-1 "} cursor-pointer `}
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
          {sample ? null : (
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

      {sample ? null : (
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
