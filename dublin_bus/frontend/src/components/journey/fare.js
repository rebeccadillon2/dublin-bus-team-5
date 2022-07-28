// Fare calculator reference sheet
// https://images-goaheadireland.passenger-website.com/downloads/191127%20-%20BMO%20Dublin%20Commuter%20-%20Fare%20Charts%20-%20ALL%20reformatted_0.pdf

export const calculateFare = (numOfStops) => {
  const type = window.localStorage.getItem("fare");
  if (!type || type === "adult") {
    if (numOfStops <= 6) {
      return "€2.40";
    } else if (numOfStops <= 8) {
      return "€2.80";
    } else if (numOfStops <= 10) {
      return "€3.30";
    } else if (numOfStops <= 12) {
      return "€4.00";
    } else if (numOfStops <= 14) {
      return "€4.30";
    } else if (numOfStops <= 16) {
      return "€4.70";
    } else if (numOfStops <= 18) {
      return "€5.00";
    } else if (numOfStops <= 20) {
      return "€5.50";
    } else if (numOfStops <= 22) {
      return "€6.00";
    } else if (numOfStops <= 24) {
      return "€6.50";
    } else if (numOfStops <= 26) {
      return "€7.30";
    } else if (numOfStops <= 30) {
      return "€7.70";
    } else if (numOfStops <= 32) {
      return "€8.50";
    } else if (numOfStops <= 36) {
      return "€9.50";
    } else if (numOfStops <= 38) {
      return "€10.00";
    } else if (numOfStops <= 42) {
      return "€2.80";
    } else if (numOfStops <= 46) {
      return "€12.00";
    } else if (numOfStops <= 60) {
      return "€13.00";
    } else if (numOfStops <= 70) {
      return "€14.00";
    } else if (numOfStops <= 80) {
      return "€15.00";
    }
  } else {
    if (numOfStops <= 6) {
      return "€1.40";
    } else if (numOfStops <= 8) {
      return "€1.70";
    } else if (numOfStops <= 10) {
      return "€1.90";
    } else if (numOfStops <= 12) {
      return "€2.30";
    } else if (numOfStops <= 14) {
      return "€2.40";
    } else if (numOfStops <= 16) {
      return "€2.80";
    } else if (numOfStops <= 18) {
      return "€3.00";
    } else if (numOfStops <= 20) {
      return "€3.30";
    } else if (numOfStops <= 22) {
      return "€3.50";
    } else if (numOfStops <= 24) {
      return "€3.90";
    } else if (numOfStops <= 26) {
      return "€4.30";
    } else if (numOfStops <= 30) {
      return "€4.60";
    } else if (numOfStops <= 32) {
      return "€5.00";
    } else if (numOfStops <= 36) {
      return "€5.30";
    } else if (numOfStops <= 38) {
      return "€5.70";
    } else if (numOfStops <= 42) {
      return "€6.50";
    } else if (numOfStops <= 46) {
      return "€7.00";
    } else if (numOfStops <= 60) {
      return "€7.50";
    } else if (numOfStops <= 70) {
      return "€8.00";
    } else if (numOfStops <= 80) {
      return "€9.00";
    }
  }
};
