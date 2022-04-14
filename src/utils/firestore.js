import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { sendNotifications } from "./RestAPI_CUD";

/**FIREBASE CONFIGURATION AND INSTANCES */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebase = initializeApp(firebaseConfig);
const messaging = getMessaging(firebase);
export const storage = getStorage(firebase);
export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);

/**************************************************************************************
 **************************************************************************************
 *************************************SIGNING IN **************************************
 **************************************************************************************
 *************************************************************************************/
export const signInWithEmailAndPswd = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
export const logOut = async () => {
  return await signOut(auth)
    .then((m) => {
      return m;
    })
    .catch((error) => {
      return error;
    });
};

/**************************************************************************************
 **************************************************************************************
 *********************UPDATING PROFILE OF THE USER*************************************
 **************************************************************************************
 *************************************************************************************/
export const sendResetEmail = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("email sent");
    })
    .catch((error) => {
      return "Error resetting password" + error;
    });
};

export const updateUserPassword = (currentPassword, newPassword) => {
  var user = auth.currentUser;
  const emailCred = firebase.auth.EmailAuthProvider.credential(
    user.email,
    currentPassword
  );
  user
    .reauthenticateWithCredential(emailCred)
    .then(() => {
      // User successfully reauthenticated.
      return user.updatePassword(newPassword);
    })
    .catch((error) => {
      console.log(error.message);
      return error.message;
    });
};

/**************************************************************************************
 **************************************************************************************
 *********************NOTIFICATIONS LOGIC AND REQUESTS LOGIC***************************
 **************************************************************************************
 *************************************************************************************/
export const addNotificationToDB = async (
  componentName,
  title,
  text,
  date,
  componentsLeft
) => {
  try {
    //add notification to DB
    const newId = firestore.createId();
    await firestore
      .collection("Thresholds")
      .doc(newId)
      .set({
        date: firebase.firestore.Timestamp.fromDate(date),
        text: text,
        componentName: componentName,
        notificationID: newId,
        title: title,
        componentsLeft: componentsLeft,
        seen: false,
      });

    //send notification through web
    sendNotifications(
      componentName + " component reached threshold!",
      "Order this component soon to ensure fluent workflow",
      date
    );
  } catch (error) {
    console.error("Error creating notification", error);
  }
};

export const seenNotification = async (notificationID) => {
  try {
    const workerDocumentRef = firestore.doc(notificationID);
    workerDocumentRef.set({ seen: true }, { merge: true });
  } catch (error) {
    return new Error("Error with setting notificaiton as seen"); // rejects the promise
  }
};

/**************************************************************************************
 **************************************************************************************
 *********************LISTENERS********************************************************
 **************************************************************************************
 *************************************************************************************/
export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
