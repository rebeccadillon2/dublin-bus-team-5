// Fare calculator reference sheet
// https://images-goaheadireland.passenger-website.com/downloads/191127%20-%20BMO%20Dublin%20Commuter%20-%20Fare%20Charts%20-%20ALL%20reformatted_0.pdf

export const calculateFare = (numOfStops) => {
  const type = window.localStorage.getItem("fare");
  const payment = window.localStorage.getItem("payment");

  // Adult and cash
  if ((!type || type === "adult") && (!payment || payment === "cash")) {
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
  }
  // Adult and leap card
  else if ((!type || type === "adult") && payment === "leap") {
    if (numOfStops <= 6) {
      return "€1.68";
    } else if (numOfStops <= 8) {
      return "€1.96";
    } else if (numOfStops <= 10) {
      return "€2.31";
    } else if (numOfStops <= 12) {
      return "€2.80";
    } else if (numOfStops <= 14) {
      return "€3.01";
    } else if (numOfStops <= 16) {
      return "€3.29";
    } else if (numOfStops <= 18) {
      return "€3.50";
    } else if (numOfStops <= 20) {
      return "€3.85";
    } else if (numOfStops <= 22) {
      return "€4.20";
    } else if (numOfStops <= 24) {
      return "€4.55";
    } else if (numOfStops <= 26) {
      return "€5.11";
    } else if (numOfStops <= 30) {
      return "€5.39";
    } else if (numOfStops <= 32) {
      return "€5.95";
    } else if (numOfStops <= 36) {
      return "€6.65";
    } else if (numOfStops <= 38) {
      return "€7.00";
    } else if (numOfStops <= 42) {
      return "€7.70";
    } else if (numOfStops <= 46) {
      return "€8.40";
    } else if (numOfStops <= 60) {
      return "€9.10";
    } else if (numOfStops <= 70) {
      return "€9.80";
    } else if (numOfStops <= 80) {
      return "€10.50";
    }
  }
  // Student and cash
  else if (type === "student" && (!payment || payment === "cash")) {
    if (numOfStops <= 6) {
      return "€2.40";
    } else if (numOfStops <= 8) {
      return "€2.80";
    } else if (numOfStops <= 10) {
      return "€2.80";
    } else if (numOfStops <= 12) {
      return "€3.20";
    } else if (numOfStops <= 14) {
      return "€3.40";
    } else if (numOfStops <= 16) {
      return "€3.70";
    } else if (numOfStops <= 18) {
      return "€4.00";
    } else if (numOfStops <= 20) {
      return "€4.30";
    } else if (numOfStops <= 22) {
      return "€4.80";
    } else if (numOfStops <= 24) {
      return "€5.20";
    } else if (numOfStops <= 26) {
      return "€5.80";
    } else if (numOfStops <= 30) {
      return "€6.10";
    } else if (numOfStops <= 32) {
      return "€6.80";
    } else if (numOfStops <= 36) {
      return "€7.50";
    } else if (numOfStops <= 38) {
      return "€8.00";
    } else if (numOfStops <= 42) {
      return "€8.50";
    } else if (numOfStops <= 46) {
      return "€9.50";
    } else if (numOfStops <= 60) {
      return "€10.00";
    } else if (numOfStops <= 70) {
      return "€11.00";
    } else if (numOfStops <= 80) {
      return "€12.00";
    }
    // Student and leap
  } else if (type === "student" && payment === "leap") {
    if (numOfStops <= 6) {
      return "€1.68";
    } else if (numOfStops <= 8) {
      return "€1.96";
    } else if (numOfStops <= 10) {
      return "€1.96";
    } else if (numOfStops <= 12) {
      return "€2.24";
    } else if (numOfStops <= 14) {
      return "€2.38";
    } else if (numOfStops <= 16) {
      return "€2.59";
    } else if (numOfStops <= 18) {
      return "€2.80";
    } else if (numOfStops <= 20) {
      return "€3.01";
    } else if (numOfStops <= 22) {
      return "€3.36";
    } else if (numOfStops <= 24) {
      return "€3.64";
    } else if (numOfStops <= 26) {
      return "€4.06";
    } else if (numOfStops <= 30) {
      return "€4.27";
    } else if (numOfStops <= 32) {
      return "€4.76";
    } else if (numOfStops <= 36) {
      return "€5.25";
    } else if (numOfStops <= 38) {
      return "€5.60";
    } else if (numOfStops <= 42) {
      return "€5.95";
    } else if (numOfStops <= 46) {
      return "€6.65";
    } else if (numOfStops <= 60) {
      return "€7.00";
    } else if (numOfStops <= 70) {
      return "€7.70";
    } else if (numOfStops <= 80) {
      return "€8.40";
    }
  }
  // Child and cash
  else if (type === "child" && (!payment || payment === "cash")) {
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
  // Child and leap
  else {
    if (numOfStops <= 6) {
      return "€0.98";
    } else if (numOfStops <= 8) {
      return "€1.19";
    } else if (numOfStops <= 10) {
      return "€1.33";
    } else if (numOfStops <= 12) {
      return "€1.61";
    } else if (numOfStops <= 14) {
      return "€1.68";
    } else if (numOfStops <= 16) {
      return "€1.96";
    } else if (numOfStops <= 18) {
      return "€2.10";
    } else if (numOfStops <= 20) {
      return "€2.31";
    } else if (numOfStops <= 22) {
      return "€2.45";
    } else if (numOfStops <= 24) {
      return "€2.73";
    } else if (numOfStops <= 26) {
      return "€3.01";
    } else if (numOfStops <= 30) {
      return "€3.22";
    } else if (numOfStops <= 32) {
      return "€3.50";
    } else if (numOfStops <= 36) {
      return "€3.71";
    } else if (numOfStops <= 38) {
      return "€3.99";
    } else if (numOfStops <= 42) {
      return "€4.55";
    } else if (numOfStops <= 46) {
      return "€4.90";
    } else if (numOfStops <= 60) {
      return "€5.25";
    } else if (numOfStops <= 70) {
      return "€5.60";
    } else if (numOfStops <= 80) {
      return "€6.30";
    }
  }
};
