import { getShortRouteName, getStopTimes } from "../../lib/api";

export const getMinutes = (hms) => {
  const a = hms.split(":");
  var minutes = +a[0] * 60 + +a[1];
  return minutes;
};

export const panToSelectedStop = (panTo, selectedStop) => {
  const lat = parseFloat(selectedStop.stopLat);
  const lng = parseFloat(selectedStop.stopLon);
  panTo({ lat, lng });
};

export const getCurrentTime = () => {
  const now = new Date();
  return String(
    now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
  );
};

export const getDisplayData = async (
  time,
  selectedStop,
  setDisplayValues,
  setLoading,
  setError
) => {
  try {
    setError(false);
    setLoading(true);
    const { data } = await getStopTimes(selectedStop.stopId, time);
    console.log("check", data);
    const res = await getShortRouteName(
      data[0].tripId,
      data[1].tripId,
      data[2].tripId,
      data[3].tripId
    );

    const newState = data.map((obj) => {
      const nowMins = getMinutes(time);
      const temp = getMinutes(obj.arrivalTime) - nowMins;
      const arrivingIn = temp === 0 ? 1 : temp;
      if (obj.tripId === res.data[0].tripId) {
        return {
          ...obj,
          routeShortName: res.data[0].routeShortName,
          arrivingIn: arrivingIn,
        };
      }
      if (obj.tripId === res.data[1].tripId) {
        return {
          ...obj,
          routeShortName: res.data[1].routeShortName,
          arrivingIn: arrivingIn,
        };
      }
      if (obj.tripId === res.data[2].tripId) {
        return {
          ...obj,
          routeShortName: res.data[2].routeShortName,
          arrivingIn: arrivingIn,
        };
      }
      if (obj.tripId === res.data[3].tripId) {
        return {
          ...obj,
          routeShortName: res.data[3].routeShortName,
          arrivingIn: arrivingIn,
        };
      }
      return {
        ...obj,
        routeShortName: res.data[0].routeShortName,
        arrivingIn: arrivingIn,
      };
    });
    setLoading(false);
    console.log("ns", newState);
    setDisplayValues(newState);
  } catch (e) {
    setLoading(false);
    setError(true);
    console.log(e);
  }
};
