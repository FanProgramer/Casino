const admin = require('firebase-admin');
const serviceAccount = require('..netlify/functions/casinoo.json'); // Cambia a la ruta correcta

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://casino-6de4f-default-rtdb.firebaseio.com' // Cambia a tu URL de base de datos
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    try {
      const { comment, userName } = JSON.parse(event.body);
      await db.collection('comments').add({ comment, userName, timestamp: admin.firestore.FieldValue.serverTimestamp() });
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Comentario guardado con éxito.' })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message })
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido' })
    };
  }
};

