// netlify/functions/save-comment.js
const admin = require('firebase-admin');

const serviceAccount = require('.casino-6de4f-firebase-adminsdk-4amut-8aa571de64.json64.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://casino-6de4f-default-rtdb.firebaseio.com'
});

const db = admin.database();

exports.handler = async function(event) {
  const { userComment, userName } = JSON.parse(event.body);

  try {
    await db.ref('/comments').push({ userComment, userName });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Comment saved successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message })
    };
  }
};
