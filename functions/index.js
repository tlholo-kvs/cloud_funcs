const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.sendNotificationToTopic = functions.firestore.document('donate items/{uid}').onCreate(async (event) => {
    let title = event.after.get('title');
    let description = event.after.get('description');
    //preparing the actual  notification
    var message = {
        notification: {
            title : title,
            body: description
        },
        topic: 'item added',
    };

    let response = await admin.messaging().send(message);
});

exports.sendNotificationToTopic = functions.firestore.document('reviewed requests/{uid}').onCreate(async (event) => {
    let title = event.after.get('title');
    let description = event.after.get('description');
    //preparing the actual  notification
    var message = {
        notification: {
            title : title,
            body: description,
            click_action :"FCM_PLUGIN_ACTIVITY",
            icon: "assets/images/logo.gif",
        },
        topic: 'item added',
        priority: 'high',
    };

    let response = await admin.messaging().send(message);
});
