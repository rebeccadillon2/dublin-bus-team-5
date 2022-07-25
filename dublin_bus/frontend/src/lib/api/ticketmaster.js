import axios from "axios";

export function getSportEvents() {
  return axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sport&city=Dublin&sort=date,asc&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
  );
}

export function getComedyEvents() {
  return axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=comedy&city=Dublin&sort=date,asc&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
  );
}

export function getRapEvents() {
  return axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?genreId=KnvZfZ7vAv1&city=Dublin&sort=date,asc&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
  );
}

export function getPopEvents() {
  return axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?subGenreId=KZazBEonSMnZfZ7v6F1&city=Dublin&sort=date,asc&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
  );
}
