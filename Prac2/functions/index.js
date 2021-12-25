const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendMessage = functions.firestore
    .document("products/{productId}")
    .onCreate(events => {
        const docId = events.params.productId;
        const name = events.data.data().name;
        const productRef = admin.firestore().collection("products").doc(docId);
        return productRef.update({ message: `Hello ${name}` });
    })
