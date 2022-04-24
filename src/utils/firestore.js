import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  getDocs,
  getDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { sendNotifications, subscribeNotifications } from "./RestAPI_CUD";

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
//TESTED  - WORKS
export const signInWithEmailAndPswd = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
//TESTED  - WORKS
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
//TESTED  - WORKS
export const sendResetEmail = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("email sent");
    })
    .catch((error) => {
      return "Error resetting password" + error;
    });
};
//TESTED  - WORKS
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
 *********************NOTIFICATIONS LOGIC***************************
 **************************************************************************************
 *************************************************************************************/
//TESTED  - WORKS
export const addNotificationToDB = async (
  componentName,
  title,
  text,
  componentsLeft
) => {
  try {
    //add notification to DB
    var time = serverTimestamp();
    var newDocRef = doc(collection(firestore, "Thresholds"));
    await setDoc(newDocRef, {
      date: time,
      text: text,
      componentName: componentName,
      notificationID: newDocRef.id,
      title: title,
      componentsLeft: componentsLeft,
      seen: false,
    });

    //send notification through web
    sendNotifications(
      componentName + " component reached threshold!",
      "Order this component soon to ensure fluent workflow",
      new Date()
    );
  } catch (error) {
    console.error("Error creating notification", error);
  }
};

//TESTED - WORKS
export const getNotSeenNotifications = async () => {
  var notifications = collection(firestore, "Thresholds");
  const q = query(notifications, where("seen", "==", false));
  return await getDocs(q);
};
export const getNotifications = async () => {
  return await getDocs(collection(firestore, "Thresholds"));
};
export const getContainers = async () => {
  return await getDocs(collection(firestore, "ContainerWeight"));
};
export const getSeenNotifications = async () => {
  var notifications = collection(firestore, "Thresholds");
  const q = query(notifications, where("seen", "==", true));
  return await getDocs(q);
};

//TESTED - WORKS
export const seenNotification = async (notificationID) => {
  var docRef = doc(firestore, "Thresholds", notificationID);
  return updateDoc(docRef, { seen: true });
};
export const updateContainer = async (containerName, container) => {
  var docRef = doc(firestore, "ContainerWeight", containerName);
  return updateDoc(docRef, {
    description: container.description,
    name: container.name,
    singleCompWeight: container.singleCompWeight,
    storedComponents: container.storedComponents,
    threshold: container.threshold,
  });
};

export const requestNotificationPermision = (setTokenFound, setUserToken) => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
      .then(function (registration) {
        getToken(messaging, {
          vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: registration,
        })
          .then((currentToken) => {
            if (currentToken) {
              setTokenFound(true);
              setUserToken(currentToken);
              updateUserNotificationToken(currentToken);
              // Track the token -> client mapping, by sending to backend server
              // show on the UI that permission is secured
            } else {
              console.log(
                "No registration token available. Request permission to generate one."
              );
              setTokenFound(false);
              // shows on the UI that permission is required
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
            // catch error while creating client token
          });
      })
      .catch(function (err) {
        console.log("Service worker registration failed, error:", err);
      });
  }
};

export const updateUserNotificationToken = async (token) => {
  var newDocument = false;
  var subscribed = true;
  var newDocRef = doc(firestore, "AdminNotificationTokens", token);
  const docSnap = await getDoc(newDocRef);
  if (!docSnap.exists()) {
    setDoc(newDocRef, { notificationsAllowed: false }).then(() => {
      subscribeNotifications(token)
        .then((r) => {
          if (r.status === 200) {
            updateDoc(newDocRef, { notificationsAllowed: true }).then(() => {});
          }
        })
        .catch((r) => {
          console.log(r);
        });
    });
  } else {
    subscribed = docSnap.data().notificationsAllowed;
  }
  if (!subscribed)
    subscribeNotifications(token)
      .then((r) => {
        if (r.status === 200) {
          updateDoc(newDocRef, { notificationsAllowed: true }).then(() => {
            console.log("ddd");
          });
        }
      })
      .catch((r) => {
        console.log(r);
      });
};

/**************************************************************************************
 **************************************************************************************
 *********************LISTENERS********************************************************
 **************************************************************************************
 *************************************************************************************/
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
