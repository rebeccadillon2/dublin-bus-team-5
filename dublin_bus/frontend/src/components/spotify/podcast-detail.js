/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { useTheme } from "../../hooks";
import TrackDetail from "./track-detail";
import { getPayload } from "../../lib/auth";
import { getDublinPodcastEpisodes } from "../../lib/api";

const PodcastDetail = (props) => {
  const { podcast, ...rest } = props;
  const [isDarkMode] = useTheme();

  const themeClasses = `${
    isDarkMode ? "bg-system-grey7 border-system-grey6" : ""
  }`;
  const classes = `border shadow w-100% p-4 my-2 rounded-xl min-h-44.752 max-h-44.752 ${themeClasses}`;

  const userId = getPayload().sub;
  let [episodeDetails, setEpisodeDetails] = useState({
    episodes: [],
    episode_chosen: 0,
  });

  const GetEpisodes = async () => {
    try {
      let response = await getDublinPodcastEpisodes(podcast.id, userId);
      setEpisodeDetails({
        ...episodeDetails,
        episodes: response.data.episodes,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(GetEpisodes, []);

  const moveBackwards = () => {
    if (episodeDetails.episode_chosen == 0) {
      setEpisodeDetails({
        ...episodeDetails,
        episode_chosen: episodeDetails.episodes.length - 1,
      });
    } else {
      setEpisodeDetails({
        ...episodeDetails,
        episode_chosen: episodeDetails.episode_chosen - 1,
      });
    }
  };

  const moveForwards = () => {
    if (episodeDetails.episode_chosen == episodeDetails.episodes.length - 1) {
      setEpisodeDetails({ ...episodeDetails, episode_chosen: 0 });
    } else {
      setEpisodeDetails({
        ...episodeDetails,
        episode_chosen: episodeDetails.episode_chosen + 1,
      });
    }
  };

  return (
    <div className={classes} {...rest}>
      <div className='flex items-center pb-2'>
        <img
          alt='img'
          height='30'
          width='auto'
          src={podcast.image}
          className='rounded-full mx-2'
        />
        <p
          className={`${
            isDarkMode ? "text-system-grey1" : ""
          } font-bold text-xs`}
        >
          {podcast.name}
        </p>
      </div>
      {episodeDetails.episodes.length === 0 ? null : (
        <TrackDetail
          type={"podcast"}
          moveForwards={moveForwards}
          moveBackwards={moveBackwards}
          track={episodeDetails.episodes[episodeDetails.episode_chosen]}
          key={episodeDetails.episodes[episodeDetails.episode_chosen].id}
        />
      )}
    </div>
  );
};

export default PodcastDetail;
