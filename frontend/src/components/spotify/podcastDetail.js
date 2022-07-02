import React, { useEffect, useState } from "react";

import { TrackDetail } from ".";
import { getPayload } from "../../lib/auth";
import { getDublinPodcastEpisodes } from "../../lib/api";

export function PodcastDetail({ pod }) {
  const userId = getPayload().sub;
  const [episodeInfo, setEpisodeInfo] = useState({
    episodes: [],
    chosenEpisode: 0,
  });

  useEffect(() => {
    const getEpisodes = async () => {
      const { data } = await getDublinPodcastEpisodes(pod.id, userId);
      console.log("ep_data", data);
      setEpisodeInfo({ ...episodeInfo, episodes: data.episodes });
    };
    getEpisodes();
  }, []);

  const moveBack = () => {
    if (episodeInfo.chosenEpisode === 0) {
      setEpisodeInfo({
        ...episodeInfo,
        chosenEpisode: episodeInfo.episodes.length - 1,
      });
    } else {
      setEpisodeInfo({
        ...episodeInfo,
        chosenEpisode: episodeInfo.chosenEpisode - 1,
      });
    }
  };

  const moveForward = () => {
    if (episodeInfo.chosenEpisode === episodeInfo.episodes.length - 1) {
      setEpisodeInfo({ ...episodeInfo, chosenEpisode: 0 });
    } else {
      setEpisodeInfo({
        ...episodeInfo,
        chosenEpisode: episodeInfo.chosenEpisode + 1,
      });
    }
  };

  return (
    <div className=''>
      <img alt={"podcast profile"} className='h-10 w-auto' src={pod.image} />
      <div className='text-xs'>{pod.name}</div>
      {episodeInfo.episodes.length === 0 ? (
        <></>
      ) : (
        <TrackDetail
          type={"podcast"}
          moveBack={moveBack}
          moveForward={moveForward}
          track={episodeInfo.episodes[episodeInfo.chosenEpisode]}
          key={episodeInfo.episodes[episodeInfo.chosenEpisode].id}
        />
      )}
    </div>
  );
}
