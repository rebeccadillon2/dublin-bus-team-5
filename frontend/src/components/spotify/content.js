import React from "react";

import { Navigation } from "../journey";
import PodcastList from "./podcast-list";

export function SpotifyContent(props) {
  const { setContainerType, containerType, ...rest } = props;

  return (
    <div className='mb-6' {...rest}>
      <Navigation setContainerType={setContainerType} />
      <div>Dublin Podcasts</div>
      <PodcastList />
    </div>
  );
}
