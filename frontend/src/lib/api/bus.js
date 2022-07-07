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
