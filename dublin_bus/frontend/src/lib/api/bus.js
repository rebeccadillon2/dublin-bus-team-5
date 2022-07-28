import axios from "axios";
import { baseUrl } from ".";

const headers = () => {
  return {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
};

export function getUpcomingStopTimesRoutes(stopId, time) {
  return axios.get(`${baseUrl}/api/bus/upcoming-stoptimes/`, {
    params: {
      stopId,
      time,
    },
  });
}

export function getAllStops() {
  return axios.get(`${baseUrl}/api/bus/get-all-stops/`);
}

export function favouriteStop(stopId, userId) {
  return axios.post(
    `${baseUrl}/api/bus/favourite-stop/${stopId}/${userId}/`,
    {
      params: {
        stopId,
        userId,
      },
    },
    headers()
  );
}

export function favouriteRoute(routeId, headSign, userId) {
  return axios.post(
    `${baseUrl}/api/bus/favourite-route/${routeId}/${headSign}/${userId}/`,
    {
      params: {
        routeId,
        headSign,
        userId,
      },
    },
    headers()
  );
}

export function getRouteStopsSingle(routeId, headSign) {
  return axios.get(
    `${baseUrl}/api/bus/get-route-stops-single/`,
    {
      params: {
        routeId,
        headSign,
      },
    },
    headers()
  );
}

export function getRouteDirectionStopCount(routeId, headSign) {
  return axios.get(
    `${baseUrl}/api/bus/get-route-direction-stop-count/`,
    {
      params: {
        routeId,
        headSign,
      },
    },
    headers()
  );
}

export function getAllRoutes() {
  return axios.get(`${baseUrl}/api/bus/get-all-routes/`);
}

export function getMLPrediction(
  headSign,
  routeShortName,
  humidity,
  wind,
  seconds,
  day,
  month,
  routeHeadSign,
  numStops
) {
  return axios.get(
    `${baseUrl}/api/bus/get-ml-prediction/`,
    {
      params: {
        headSign,
        routeShortName,
        humidity,
        wind,
        seconds,
        day,
        month,
        routeHeadSign,
        numStops,
      },
    },
    null
  );
}
