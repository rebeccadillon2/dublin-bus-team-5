import React, { useContext, useEffect } from "react";

import { SpotifyContext } from "../../App";
import { getPayload } from "../../lib/auth";
import { getAccesssToken } from "../../lib/api";

const SetupSpotifyWebPlayer = ({ authenticated, sdkReady }) => {
  const uid = getPayload().sub;
  let { updateSpotifyState } = useContext(SpotifyContext);

  useEffect(() => {
    if (authenticated == false || sdkReady == false) {
      return null;
    }
    // eslint-disable-next-line no-undef
    const player = new Spotify.Player({
      name: "Dublin Bus Player",
      getOAuthToken: async (cb) => {
        let res = await getAccesssToken(uid);
        cb(res.data.accessToken);
      },
      volume: 1.0,
    });

    player.connect().then((success) => {
      if (success) {
        updateSpotifyState({ failedToConnect: false });
      } else {
        updateSpotifyState({ failedToConnect: true });
      }
    });

    player.addListener("ready", ({ device_id }) => {
      const iframe = document.querySelector(
        'iframe[src="https://sdk.scdn.co/embedded/index.html"]'
      );

      if (iframe) {
        iframe.style.display = "block";
        iframe.style.position = "absolute";
        iframe.style.top = "-1000px";
        iframe.style.left = "-1000px";
      }

      const play = ({
        spotify_uri,
        playerInstance: {
          _options: { getOAuthToken },
        },
      }) => {
        getOAuthToken((access_token) => {
          fetch(
            `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
            {
              method: "PUT",
              body: JSON.stringify({ uris: [spotify_uri] }),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
        });
      };

      let playSongFunction = (spotify_uri) => {
        play({
          playerInstance: player,
          spotify_uri: spotify_uri,
          id: device_id,
        });
      };

      updateSpotifyState({
        playerReady: true,
        playSpotifyTrack: playSongFunction,
      });
    });

    player.addListener("initialization_error", ({ message }) => {
      console.error(`Initialization Error: ${message}`);
    });

    player.addListener("playback_error", ({ message }) => {
      console.error(`Playback Error: ${message}`);
    });

    player.addListener("authentication_error", ({ message }) => {
      console.error(`Authentication Error: ${message}`);
    });
    player.addListener("account_error", ({ message }) => {
      console.error(`Account Error: ${message}`);
    });

    player.addListener("player_state_changed", (state) => {});

    player.addListener("not_ready", ({ device_id }) => {
      console.log(`Device offline: ${device_id}`);
    });
  }, [authenticated, sdkReady]);

  return <></>;
};

export default SetupSpotifyWebPlayer;
