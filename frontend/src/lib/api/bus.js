import axios from "axios";
import { baseUrl } from ".";

const headers = () => {
  return {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
};

export function getStopTimes(stopId, time) {
  return axios.get(`${baseUrl}/api/bus/get-stop-times/`, {
    params: {
      stopId,
      time,
    },
  });
}

export function getShortRouteNames(stopTimeObj) {
  return axios.get(`${baseUrl}/api/bus/get-route-names/`, {
    params: {
      stopTimeObj,
      is_private: false,
    },
  });
}

export function getShortRouteName(tripId1, tripId2, tripId3, tripId4, tripId5) {
  return axios.get(`${baseUrl}/api/bus/get-route-name/`, {
    params: {
      tripId1,
      tripId2,
      tripId3,
      tripId4,
      tripId5,
    },
  });
}

export function getAllStops() {
  return axios.get(`${baseUrl}/api/bus/get-all-stops/`);
}

// export function favouriteStop(stopId, userId) {
//   return axios.post(`${baseUrl}/api/bus/favourite-stop/`, {
//     params: {
//       stopId,
//       userId,
//     },
//   }, headers());
// }

export function favouriteStop(stopId, userId) {
  return axios.post(
    `${baseUrl}/api/bus/favourite-stop/${stopId}/${userId}/`,
    null,
    headers()
  );
}
