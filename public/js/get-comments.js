const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://casino-6de4f-default-rtdb.firebaseio.com'
});

const db = admin.firestore();

exports.handler = async function(event, context) {
  try {
    const snapshot = await db.collection('comments').orderBy('timestamp', 'desc').get();
    const comments = snapshot.docs.map(doc => doc.data());

    return {
      statusCode: 200,
      body: JSON.stringify(comments),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
