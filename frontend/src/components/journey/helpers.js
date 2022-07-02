import { errorTypes } from ".";
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

export function routeErrorCheck(originVal, destinationVal, setInputError) {
  if (originVal === "" || destinationVal === "") {
    setInputError(errorTypes.MISSING_INPUT);
    return true;
  }
  if (originVal === destinationVal) {
    setInputError(errorTypes.SAME);
    return true;
  }
  return false;
}

export function getMapContainerStyle(width, isExpanded) {
  return {
    width: width >= 768 ? "calc(100vw - 400px)" : "100vw",
    height:
      width >= 768
        ? "calc(100vh - 64px)"
        : isExpanded
        ? "calc(100vh - 64px - 80vh)"
        : "calc(100vh - 64px - 216px)",
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
