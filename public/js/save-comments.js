const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://casino-6de4f-default-rtdb.firebaseio.com'
});

const db = admin.firestore();

exports.handler = async function(event, context) {
  try {
    const { name, comment } = JSON.parse(event.body);

    await db.collection('comments').add({
      name: name,
      comment: comment,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
