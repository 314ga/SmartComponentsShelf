import { getDateYYYYMMDD } from "./dateParser";
import axios from "axios";

export async function sendNotifications(title, body, date) {
  const headers = {
    Authorization: process.env.REACT_APP_FIREBASE_NOTIFICATION_SENDER_KEY,
    "Content-Type": "application/json",
  };
  let message = {
    to: "/topics/threshold",
    notification: {
      body: body + " " + getDateYYYYMMDD(date),
      title: title,
    },
  };
  await axios
    .post("https://fcm.googleapis.com/fcm/send", message, {
      headers: headers,
    })
    .then((res) => {
      return 1;
    })
    .catch((e) => {
      console.log(e);

      return -1;
    });
}

export async function subscribeNotifications(token) {
  const headers = {
    Authorization: process.env.REACT_APP_FIREBASE_NOTIFICATION_SENDER_KEY,
    "Content-Type": "application/json",
  };
  let message = {
    to: "/topics/threshold",
    registration_tokens: [token],
  };
  return await axios.post(
    "https://iid.googleapis.com/iid/v1:batchAdd",
    message,
    {
      headers: headers,
    }
  );
}
