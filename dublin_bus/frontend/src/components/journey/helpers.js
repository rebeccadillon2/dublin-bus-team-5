import { errorTypes } from ".";
import { getForecastWeather, getLiveWeather } from "../../lib/api";
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
