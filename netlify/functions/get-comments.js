const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

exports.handler = async function(event, context) {
  try {
    const snapshot = await db.collection('comments').orderBy('timestamp', 'desc').get();
    const comments = snapshot.docs.map(doc => doc.data());

    return {
      statusCode: 200,
      body: JSON.stringify(comments),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching comments' }),
    };
  }
};
