const admin = require('firebase-admin');
const serviceAccount = require('.netlify/functions/casinoo.json'); // Cambia a la ruta correcta

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://casino-6de4f-default-rtdb.firebaseio.com' // Cambia a tu URL de base de datos
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  try {
    const snapshot = await db.collection('comments').orderBy('timestamp', 'desc').get();
    const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return {
      statusCode: 200,
      body: JSON.stringify(comments)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
