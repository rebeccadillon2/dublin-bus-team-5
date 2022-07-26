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

export function getMapContainerStyle(width, isExpanded) {
  return {
    width: width >= 768 ? "calc(100vw - 400px)" : "100vw",
    height: width >= 768 ? "calc(100vh - 64px)" : "100vh",
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
      return 0;
    case "Feb":
      return 1;
    case "Mar":
      return 2;
    case "Apr":
      return 3;
    case "May":
      return 4;
    case "Jun":
      return 5;
    case "Jul":
      return 6;
    case "Aug":
      return 7;
    case "Sep":
      return 8;
    case "Oct":
      return 9;
    case "Nov":
      return 10;
    case "Dec":
      return 11;
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

        try {
          // Getting the number of stops for the route
          // const numStops = await getRouteDirectionStopCount(
          //   `60-${routeShortName}-d12-1`,
          //   headSign
          // );
          // console.log("numStops", numStops);
          // Getting our ML Prediction
          // const { data } = await getMLPrediction(
          //   headSign,
          //   routeShortName,
          //   weatherVariables.humidity,
          //   weatherVariables.wind,
          //   secondsFromStartOfDay,
          //   day,
          //   month
          // );
          // console.log("PR", Math.floor(data/60));
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};
