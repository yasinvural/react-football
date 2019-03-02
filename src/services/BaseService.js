import axios from "axios";
import {NotificationManager} from "react-notifications";
const TOKEN = "104830cb63b14c85b8e5ec593d507470";

export function get(url) {
  return axios.get(url);
}

export function post(url, message) {
  return axios.post(url, message);
}

axios.interceptors.request.use(
  config => {
    config.headers["X-Auth-Token"] = `${TOKEN}`;
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(null,error=>{
  NotificationManager.error("Allowed to 10 calls per minute !");
})
