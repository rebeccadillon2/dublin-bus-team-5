/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { BsExclamationTriangleFill } from "react-icons/bs";

import { Error } from "../error";
import { useTheme } from "../../hooks";
import { SpotifyContext } from "../../App";
import { TableSkeleton } from "../skeleton";
import PodcastDetail from "./podcast-detail";
import { getDublinPodcasts } from "../../lib/api";

const Warning = () => {
  const [isDarkMode] = useTheme();

  return (
    <div
      className={`rounded-xl ${
        isDarkMode ? "bg-system-grey7	" : "bg-system-grey1"
      } p-4 my-2 shadow-lg`}
    >
      <div className='flex'>
        <div className='flex-shrink-0'>
          <BsExclamationTriangleFill
            className='h-5 w-5 text-yellow-400'
            aria-hidden='true'
          />
        </div>
        <div className='ml-3'>
          <h3 className='text-sm  font-semibold	text-yellow-700'>
            Spotify Warning
          </h3>
          <div className='mt-2 text-sm text-yellow-700'>
            <p>
              Your browser has failed to connect to the Spotify SDK. To conintue
              to use Spotify on this application ensure that your Spotify is
              open on this device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PodcastList = () => {
  const [podcastDetails, setPodcastDetails] = useState({ podcasts: [] });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { playSpotifyTrack } = useContext(SpotifyContext);

  useEffect(async () => {
    try {
      const res = await getDublinPodcasts();
      setPodcastDetails({
        ...podcastDetails,
        podcasts: res.data.podcasts,
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError(true);
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className='pt-6'>
          <TableSkeleton />
        </div>
      ) : error ? (
        <div className='pt-6'>
          <Error />
        </div>
      ) : (
        <div className='flex flex-col items-start justify-start'>
          {playSpotifyTrack == null && <Warning />}
          {podcastDetails.podcasts.map((podcast) => (
            <PodcastDetail key={podcast.name} podcast={podcast} />
          ))}
        </div>
      )}
    </>
  );
};

export default PodcastList;
