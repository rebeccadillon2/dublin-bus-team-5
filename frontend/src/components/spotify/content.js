import React from "react";

import { useTheme } from "../../hooks";
import { Navigation } from "../journey";
import PodcastList from "./podcast-list";

export function SpotifyContent(props) {
  const { setContainerType, containerType, ...rest } = props;
  const [isDarkMode] = useTheme();
  const themeClasses = `${
    isDarkMode ? "text-primary-white" : "text-system-grey7"
  }`;
  const classes = `text-lg font-semibold ml-2 mb-2 ${themeClasses} `;

  return (
    <div className='mb-6' {...rest}>
      <Navigation setContainerType={setContainerType} />
      <div className={classes}>
        <p>Dublin Podcasts</p>
      </div>
      <PodcastList />
    </div>
  );
}
