/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendNotificationToTopic = functions.firestore.document("reviewed donated items/{uid}").onCreate(async (event) => {
  const title = event.after.get("title");
  const description = event.after.get("description");
  // preparing the actual  notification
  const message = {
    notification: {
      title: title,
      body: description,
      click_action: "FCM_PLUGIN_ACTIVITY",
      icon: "assets/images/logo.gif",
    },
    topic: "item added",
  };

  await admin.messaging().send(message);
  // console.log(respone);
});

exports.sendNotificationToTopic = functions.firestore.document("reviewed requests/{uid}").onWrite(async (event) => {
  const title = event.after.get("title");
  const description = event.after.get("description");
  // preparing the actual  notification
  const message = {
    notification: {
      title: title,
      body: description,
      click_action: "FCM_PLUGIN_ACTIVITY",
      icon: "assets/images/logo.gif",
    },
    topic: "item added",
    priority: "high",
  };

  await admin.messaging().send(message);
  // console.log(respone);
});


// attempting to send notifications by using the FCM token
// This method attempts to send notification on changes to the reviewed requests document,
// whihc will store donations that have been fully processed and accepted
exports.sendNotificationToFCMToken = functions.firestore.document("reviewed requests/{uid}").onWrite(async (event) =>{
  const uid = event.after.get("userUid");
  const userDoc = await admin.firestore().doc(`userId/${uid}`).get();
  const title = event.after.get("title");
  const description = event.after.get("description");
  const fcmToken = userDoc.get("fcm");

  const message = {
    notification: {
      title: title,
      body: description,
    },
    token: fcmToken,
  };

  const response = await admin.messaging().send(message);
  console.log(response);
});


