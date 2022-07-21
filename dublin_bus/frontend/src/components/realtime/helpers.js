import { getUpcomingStopTimesRoutes } from "../../lib/api";

export const getMinutes = (hms) => {
  const a = hms.split(":");
  var minutes = +a[0] * 60 + +a[1];
  return minutes;
};

export const panToSelectedStop = (panTo, selectedStop) => {
  const lat = parseFloat(selectedStop.stopLat);
  const lng = parseFloat(selectedStop.stopLon);
  panTo({ lat, lng }, 20);
};

export const getCurrentTime = () => {
  const now = new Date();
  let hrs = now.getHours();
  let mins = now.getMinutes();
  let secs = now.getSeconds();
  hrs = String(hrs).length > 1 ? hrs : `0${String(hrs)}`;
  mins = String(mins).length > 1 ? mins : `0${String(mins)}`;
  secs = String(secs).length > 1 ? hrs : `0${String(secs)}`;

  return String(hrs + ":" + mins + ":" + secs);
};

export const getETA = (time, arrivalTime) => {
  const now = getMinutes(time);
  const arrivalMin = getMinutes(arrivalTime);
  const diff = arrivalMin - now;
  if (diff < 1) {
    return 1;
  }
  return diff;
};

export const getDisplayData = async (
  time,
  stopId,
  setDisplayValues,
  setLoading,
  setError
) => {
  try {
    setLoading(true);
    const { data } = await getUpcomingStopTimesRoutes(stopId, time);
    console.log("data", data);
    setDisplayValues(data);
    setLoading(false);
  } catch (e) {
    setLoading(false);
    setError(true);
    console.log(e);
  }
};
