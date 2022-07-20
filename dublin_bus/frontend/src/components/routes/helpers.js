export const panToSelectedRoute = (panTo, selectedRoute) => {
  const lat = parseFloat(selectedRoute.stopLat);
  const lng = parseFloat(selectedRoute.stopLon);
  panTo({ lat, lng }, 20);
};
