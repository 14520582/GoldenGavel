// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.sendMessageNotification = functions.database.ref('Message/{uid}/{messageID}')
  .onCreate(event => {
    const uid = event.params.uid;
    const message = event.data.val();
    var topic = 'Message_' + uid;
    admin.database().ref(`User/${message.sender}`).once('value', (user) => {
      sender = user.val()
      var payload = {
        data: {
            custom_notification: JSON.stringify({
              title: sender.displayName,
              body: message.content.message,
              priority: "high" ,
              show_in_foreground: true,
              vibrate: 300,
              icon: "auction",
              sound: "default",
            })
          }
        };
      admin.messaging().sendToTopic(topic, payload)
          .then(function(response) {
            console.log("Successfully sent message:", response);
          })
          .catch(function(error) {
            console.log("Error sending message:", error);
          });
    })

});
exports.sendNotification = functions.database.ref('Notification/{uid}/{notificatonID}')
  .onCreate(event => {
    const uid = event.params.uid;
    const notification = event.data.val();
    var topic = 'Notification_' + uid;
    admin.database().ref(`User/${notification.sender}`).once('value', (user) => {
      sender = user.val()
      var payload = {
        data: {
            custom_notification: JSON.stringify({
              title: sender.displayName,
              body: 'just bidded your '+ notification.content.nameitem,
              priority: "high" ,
              show_in_foreground: true,
              vibrate: 300,
              icon: "auction",
              sound: "default",
            })
          }
        };
      admin.messaging().sendToTopic(topic, payload)
          .then(function(response) {
            console.log("Successfully sent message:", response);
          })
          .catch(function(error) {
            console.log("Error sending message:", error);
          });
    })
});
