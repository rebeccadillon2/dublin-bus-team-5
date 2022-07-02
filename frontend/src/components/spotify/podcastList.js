import React, { useEffect, useState } from "react";
import { getDublinPodcasts } from "../../lib/api";
import { PodcastDetail } from ".";

export function PodcastList() {
  const [podcastInfo, setPodcastInfo] = useState({ pods: [] });

  useEffect(() => {
    const getPods = async () => {
      try {
        const { data } = await getDublinPodcasts();
        setPodcastInfo({ ...podcastInfo, pods: data.podcasts });
      } catch (e) {
        console.log(e);
      }
    };
    getPods();
  }, []);

  return (
    <div>
      {podcastInfo.pods ? (
        podcastInfo.pods.map((pod) => (
          <PodcastDetail key={pod.name} pod={pod} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
