/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useContext } from "react";

import CurrentTrackContext from "./context";
import { getPayload } from "../../lib/auth";
import { getAccesssToken } from "../../lib/api";

const UpdateCurrentTrack = ({ authenticated }) => {
  const uid = getPayload().sub;
  const { updateCurrentTrackDetails } = useContext(CurrentTrackContext);
  var UpdateHandler;

  const getCurrentTrack = async (accessToken, type) => {
    let endpoint;

    if (type === "song") {
      endpoint =
        "https://api.spotify.com/v1/me/player/currently-playing?market=ES";
    } else {
      endpoint =
        "https://api.spotify.com/v1/me/player/currently-playing?market=ES&type=episode";
    }

    const autherHeader = `Bearer ${accessToken}`;
    let res;
    try {
      res = await axios.get(endpoint, {
        headers: { Authorization: autherHeader },
      });
    } catch (e) {
      console.log(e);
      res = e.response;
    }
    return res;
  };

  const parseTrack = (data) => {
    return {
      currentTrackName: data.item.name,
      currentTrackId: data.item.id,
      progress: data.progress_ms,
      isPlaying: data.is_playing,
    };
  };

  const attemptSongRetrieval = async (accessToken) => {
    let songRes;
    let trackInfo;
    songRes = await getCurrentTrack(accessToken, "song");
    if (songRes.status == 200) {
      try {
        trackInfo = parseTrack(songRes.data);
      } catch (e) {}
    }

    return {
      resStatus: songRes.status,
      trackDetails: trackInfo,
    };
  };

  const attemptPodcastRetrival = async (accessToken) => {
    let podRes;
    let trackInfo;
    podRes = await getCurrentTrack(accessToken, "podcast");
    if (podRes.status == 200) {
      try {
        trackInfo = parseTrack(podRes.data);
        console.log("td", trackInfo);
      } catch (e) {}
    }

    return {
      resStatus: podRes.status,
      trackDetails: trackInfo,
    };
  };

  const getTrackDetails = async (accessToken) => {
    let songRes = await attemptSongRetrieval(accessToken);
    let trackDetails;

    if (songRes.trackDetails) {
      trackDetails = songRes.trackDetails;
    } else {
      let podRes = await attemptPodcastRetrival(accessToken);
      if (podRes.trackDetails) {
        trackDetails = podRes.trackDetails;
      }
    }

    if (trackDetails) {
      updateCurrentTrackDetails(trackDetails);
    } else {
      if (songRes.resStatus == 401) {
        let accessTokenRes = await getAccesssToken(uid);
        accessToken = accessTokenRes.data.accessToken;
      }
    }

    clearInterval(UpdateHandler);

    UpdateHandler = setInterval(() => getTrackDetails(accessToken), 1000);
  };

  useEffect(async () => {
    if (authenticated == false) {
      return null;
    }
    let response = await getAccesssToken(uid);
    console.log("RES", response.data);

    UpdateHandler = setInterval(
      () => getTrackDetails(response.data.accessToken),
      500
    );

    return () => clearInterval(UpdateHandler);
  }, [authenticated]);

  return <></>;
};

export default UpdateCurrentTrack;
