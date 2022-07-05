/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import PodcastDetail from "./podcast-detail";
import { getDublinPodcasts } from "../../lib/api";

const PodcastList = () => {
  const [podcastDetails, setPodcastDetails] = useState({ podcasts: [] });

  useEffect(async () => {
    let response = await getDublinPodcasts();
    setPodcastDetails({ ...podcastDetails, podcasts: response.data.podcasts });
  }, []);

  return (
    <div className='flex flex-col items-start justify-start'>
      {podcastDetails.podcasts
        ? podcastDetails.podcasts.map((podcast) => (
            <PodcastDetail key={podcast.name} podcast={podcast} />
          ))
        : null}
    </div>
  );
};

export default PodcastList;
