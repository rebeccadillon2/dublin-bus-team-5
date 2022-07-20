/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

import { Warning } from ".";
import { Error } from "../error";
import { SpotifyContext } from "../../App";
import { TableSkeleton } from "../skeleton";
import PodcastDetail from "./podcast-detail";
import { getDublinPodcasts } from "../../lib/api";

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
