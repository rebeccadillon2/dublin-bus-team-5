import axios from "axios";
import { baseUrl, headers } from ".";

export function isSpotifyAuthenticated() {
  return axios.get(`${baseUrl}/api/spotify/is-authenticated/`, headers());
}

export function getSpotifyAuthUrl() {
  return axios.get(`${baseUrl}/api/spotify/get-auth-url/`, headers());
}

export async function getDublinPodcasts() {
  let res;
  try {
    res = await axios.get(`${baseUrl}/api/spotify/get-podcasts/`, headers());
  } catch (e) {
    console.log(e.message);
    res = e.message;
  }
  return res;
}

export async function getDublinPodcastEpisodes(id, userId) {
  let res;
  try {
    res = await axios.get(
      `${baseUrl}/api/spotify/get-podcast-episodes/`,
      {
        params: {
          id: id,
          uid: userId,
        },
      },
      headers()
    );
  } catch (e) {
    console.log(e.message);
    res = e.mesage;
  }
  return res;
}

export async function playTrack(uri, uid) {
  let res;
  try {
    res = await axios.get(
      `${baseUrl}/api/spotify/play-track/`,
      {
        params: {
          uri,
          uid,
        },
      },
      headers()
    );
  } catch (e) {
    console.log(e);
    res = e.message;
  }
  return res;
}

export async function pauseTrack(uid) {
  let res;
  try {
    res = await axios.get(
      `${baseUrl}/api/spotify/pause-track/`,
      {
        params: {
          uid,
        },
      },
      headers()
    );
  } catch (e) {
    console.log(e.message);
    res = e.message;
  }
  return res;
}

export async function getAccesssToken(uid) {
  let res;
  try {
    res = await axios.get(
      `${baseUrl}/api/spotify/get-access-token/`,
      {
        params: {
          uid,
        },
      },
      headers()
    );
    console.log("RES", res);
  } catch (e) {
    console.log(e);
    res = e.message;
  }
  return res;
}
