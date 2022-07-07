import axios from "axios";
import { baseUrl } from ".";

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
