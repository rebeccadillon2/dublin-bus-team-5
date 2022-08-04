import { errorTypes } from ".";
import {
  getForecastWeather,
  getLiveWeather,
  getMLPrediction,
  getRouteDirectionStopCount,
} from "../../lib/api";
import { center, darkStyles } from "../../lib/map";

export const currentBrowser = (window) => getBrowser(window);

function getBrowser(window) {
  let cb = "Not known";
  if (window.navigator.userAgent.indexOf("Chrome") !== -1) {
    cb = "Google Chrome";
  } else if (window.navigator.userAgent.indexOf("Firefox") !== -1) {
    cb = "Mozilla Firefox";
  } else {
    console.log("Others");
  }
  return cb;
}

export function routeErrorCheck(
  originVal,
  destinationVal,
  setInputError,
  time
) {
  if (originVal === "" || destinationVal === "") {
    setInputError(errorTypes.MISSING_INPUT);
    return true;
  }
  if (originVal === destinationVal) {
    setInputError(errorTypes.SAME);
    return true;
  }

  if (!time.getHours()) {
    setInputError(errorTypes.INVALID_TIME);
    return true;
  }
  const now = new Date();
  if (time.getTime() < now.getTime() - 180000) {
    setInputError(errorTypes.PAST_TIME);
    return true;
  }
  return false;
}

export function getMapContainerStyle(width, isExpanded, windowHeight) {
  return {
    width: width >= 768 ? "calc(100vw - 400px)" : "100vw",
    height: width >= 768 ? "calc(100vh - 64px)" : `${windowHeight}px`,
    // isExpanded
    // ? "calc(100vh - 64px - 80vh)"
    // : "calc(100vh - 64px - 216px)",
    position: "absolute",
    right: "0",
  };
}

export const setUserLocation = (originRef) => {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const latLng = new window.google.maps.LatLng(lat, lng);
        const gecoder = new window.google.maps.Geocoder();
        gecoder.geocode({ latLng: latLng }, (results, status) => {
          if (status !== window.google.maps.GeocoderStatus.OK) {
            // eslint-disable-next-line no-alert
            alert("There was a problem trying to find your location");
            console.log(status);
          }
          if (status === window.google.maps.GeocoderStatus.OK && results) {
            console.log("res", results);
            originRef.current.value = results[0].formatted_address;
          }
        });
      },
      () => null
    );
  } else {
    // eslint-disable-next-line no-alert
    alert("Denied access to geolocation");
  }
};

export const getInputOptions = () => ({
  radius: 10000,
  location: new window.google.maps.LatLng(center.lat, center.lng),
  componentRestrictions: { country: ["ie"] },
});

export function getMapOptions(isDarkMode) {
  const styles = isDarkMode ? darkStyles : [];
  return {
    disableDefaultUI: true,
    zoomControl: true,
    styles,
  };
}

export const configureWeatherVariables = async (time) => {
  const datum = Date.parse(time) / 1000;
  const now = Math.floor(Date.now() / 1000);

  // Checking if selected time is over 5 days away
  if (datum > now + 60 * 60 * 24 * 5) {
    console.log("over five days away");
    // If selection is over 5 days away, no forecast data so use Dublin mean values
    return {
      wind: 2.2,
      humidity: 75,
    };

    // Check if selected time is greter than 3 hours away
  } else if (datum > now + 60 * 60 * 3) {
    console.log("over three hours away");
    try {
      const { data } = await getForecastWeather();
      for (let i = 0; i < data.list.length; i++) {
        if (data.list[i].dt > datum) {
          return {
            wind: data.list[i].wind.speed,
            humidity: data.list[i].main.humidity,
          };
        }
      }
    } catch (e) {
      console.log(e);
    }

    // Returning current weather
  } else {
    console.log("within three hours");
    try {
      const { data } = await getLiveWeather();
      return { wind: data.wind.speed, humidity: data.main.humidity };
    } catch (e) {
      console.log(e);
    }
  }

  // If an error occurs return the Dublin's mean wind and humidity
  return {
    wind: 2.2,
    humidity: 75,
  };
};

const getMonthNum = (month) => {
  switch (month) {
    case "Jan":
      return 1;
    case "Feb":
      return 2;
    case "Mar":
      return 3;
    case "Apr":
      return 4;
    case "May":
      return 5;
    case "Jun":
      return 6;
    case "Jul":
      return 7;
    case "Aug":
      return 8;
    case "Sep":
      return 9;
    case "Oct":
      return 10;
    case "Nov":
      return 11;
    case "Dec":
      return 12;
    default:
      return 1;
  }
};

const getDayNum = (day) => {
  switch (day) {
    case "Mon":
      return 0;
    case "Tue":
      return 1;
    case "Wed":
      return 2;
    case "Thu":
      return 3;
    case "Fri":
      return 4;
    case "Sat":
      return 5;
    case "Sun":
      return 6;
    default:
      return 1;
  }
};

const convertToSeconds = (str) => {
  const [hrs, mins, secs] = str.split(":");
  return Number(hrs) * 60 * 60 + Number(mins) * 60 + Number(secs);
};

export const addMLPredictionsToResponse = async (results, weatherVariables) => {
  const obj = { ...results };

  // Iterating over each of the journeys
  for (let i = 0; i < results.routes.length; i++) {
    // Duration in seconds
    let duration = 0;
    // Iterating over each of the steps in a journey
    for (let j = 0; j < results.routes[i].legs[0].steps.length; j++) {
      // Check if not Dublin Bus step

      if (
        results.routes[i].legs[0].steps[j].travel_mode !== "TRANSIT" ||
        results.routes[i].legs[0].steps[j].transit.line.agencies[0].name !==
          "Dublin Bus"
      ) {
        duration += results.routes[i].legs[0].steps[j].duration.value;
      } else {
        // Getting headsign parameter
        const headSign = results.routes[i].legs[0].steps[j].transit.line.name;

        // Getting route short name parameter
        const routeShortName =
          results.routes[i].legs[0].steps[j].transit.line.short_name;
        console.log("routeShortName", routeShortName);

        // Getting seconds from start of day parameter
        const secondsFromStartOfDay = convertToSeconds(
          String(
            results.routes[i].legs[0].steps[j].transit.departure_time.value
          ).slice(16, 24)
        );

        // Getting day of week parameter
        const day = getDayNum(
          String(
            results.routes[i].legs[0].steps[j].transit.departure_time.value
          ).slice(0, 3)
        );

        // Getting month parameter
        const month = getMonthNum(
          String(
            results.routes[i].legs[0].steps[j].transit.departure_time.value
          ).slice(4, 7)
        );

        // Getting routeheadsign parameter
        const routeHeadSign =
          results.routes[i].legs[0].steps[j].transit.headsign;

        // Getting numStops parameter
        const numStops = results.routes[i].legs[0].steps[j].transit.num_stops;

        try {
          // Getting our ML Prediction
          const { data } = await getMLPrediction(
            headSign,
            routeShortName,
            weatherVariables.humidity,
            weatherVariables.wind,
            secondsFromStartOfDay,
            day,
            month,
            routeHeadSign,
            numStops
          );
          console.log("PR", data * 60);
          // Adding ML prediction to the total duration
          duration += data * 60;

          // Adding ML prediction to the bus part of the journey
          obj.routes[i].legs[0].steps[j].duration = {
            ...obj.routes[i].legs[0].steps[j].duration,
            predictedValue: data * 60,
          };
        } catch (e) {
          duration += results.routes[i].legs[0].steps[j].duration.value;
          console.log(e);
        }
      }
    }
    // Adding the duration to the object
    console.log("Duration:", duration);
    obj.routes[i].legs[0].duration = {
      ...obj.routes[i].legs[0].duration,
      predictedValue: duration,
    };
  }
  return obj;
};

export const convertMinutesToDisplay = (minutes) => {
  if (minutes < 60) {
    return `${minutes} mins`;
  }
  const hrs = Math.floor(minutes / 60);
  const mins = minutes - hrs * 60;
  if (hrs === 1) {
    return `${hrs} hour ${mins} mins`;
  }
  return `${hrs} hours ${mins} mins`;
};

export const addMinutesToTime = (time, minutes) => {
  const newMins = parseInt(time.slice(3, 5));
  if (newMins + minutes < 60) {
    return `${time.slice(0, 2)}:${newMins + minutes}`;
  }
  const hrs = Math.floor((newMins + minutes) / 60);

  if (time.slice(0, 2) === "23") {
    if (hrs < 10) {
      return `0${hrs}:${(newMins + minutes) % 60}`;
    } else {
      return `${hrs}:${(newMins + minutes) % 60}`;
    }
  }
  return `${parseInt(time.slice(0, 2)) + hrs}:${(newMins + minutes) % 60}`;
};
