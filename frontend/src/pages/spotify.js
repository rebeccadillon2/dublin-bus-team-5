import React, { useEffect, useState } from "react";
import { getSpotifyAuthUrl, isSpotifyAuthenticated } from "../lib/api";

export function Spotify() {
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);

  useEffect(() => {
    const check = async () => {
      const res = await isSpotifyAuthenticated();
      setSpotifyAuthenticated(res.data.status);
    };
    check();
  }, []);

  const loginToSpotify = async () => {
    const response = await getSpotifyAuthUrl();
    window.location.replace(response.data.url);
  };

  return (
    <div>
      {spotifyAuthenticated ? (
        <div>Logged in to spotify</div>
      ) : (
        <button
          onClick={() => loginToSpotify()}
          className='bg-primary-green p-2 rounded-lg'
        >
          Login to spotify
        </button>
      )}
    </div>
  );
}
