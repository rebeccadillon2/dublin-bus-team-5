/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { Error } from "../error";
import { LoadingSpinner } from "../loading";
import PodcastDetail from "./podcast-detail";
import { getDublinPodcasts } from "../../lib/api";

const PodcastList = () => {
  const [podcastDetails, setPodcastDetails] = useState({ podcasts: [] });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

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
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className='pt-6'>
          <Error />
        </div>
      ) : (
        <div className='flex flex-col items-start justify-start'>
          {podcastDetails.podcasts.map((podcast) => (
            <PodcastDetail key={podcast.name} podcast={podcast} />
          ))}
        </div>
      )}
    </>
  );
};

export default PodcastList;
