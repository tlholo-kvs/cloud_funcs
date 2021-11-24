/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendNotificationToTopic = functions.firestore.document("donate items/{uid}").onCreate(async (event) => {
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
});

exports.sendNotificationToTopic = functions.firestore.document("reviewed requests/{uid}").onCreate(async (event) => {
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
});
