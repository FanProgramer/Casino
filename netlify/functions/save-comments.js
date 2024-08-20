const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

exports.handler = async function(event, context) {
  const { name, comment } = JSON.parse(event.body);

  try {
    await db.collection('comments').add({
      name,
      comment,
      timestamp: new Date(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Comment saved' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error saving comment' }),
    };
  }
};
