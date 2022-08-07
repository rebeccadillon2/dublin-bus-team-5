import axios from "axios";

export function getSportEvents() {
  return axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?size=8&classificationName=sport&city=Dublin&sort=date,asc&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
  );
}

export function getComedyEvents() {
  return axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?size=8&classificationName=comedy&city=Dublin&sort=date,asc&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
  );
}

export function getRapEvents() {
  return axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?size=8&genreId=KnvZfZ7vAv1&city=Dublin&sort=date,asc&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
  );
}

export function getPopEvents() {
  return axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?size=8&subGenreId=KZazBEonSMnZfZ7v6F1&city=Dublin&sort=date,asc&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
  );
}

export function getRockEvents() {
  return axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?size=8&subGenreId=KZazBEonSMnZfZ7v6dt&city=Dublin&sort=date,asc&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
  );
}

export function getMusicEvents() {
  return axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?size=8&classificationName=music&city=Dublin&sort=date,asc&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
  );
}

export function getFolkEvents() {
  return axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?size=8&genreId=KnvZfZ7vAva&city=Dublin&sort=date,asc&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
  );
}
