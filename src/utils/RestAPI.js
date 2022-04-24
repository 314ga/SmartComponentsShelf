import axios from "axios";

export const MQTTapi = axios.create({
  // TODO: Change to MQTT baseURL or whateva
  baseURL: "http://localhost:7073/api/",
  timeout: 5000,
});

export const DBapi = axios.create({
  // TODO: Change to database baseURL
  baseURL: "https://api.thingspeak.com/channels/1711037/fields",
  timeout: 5000,
});
