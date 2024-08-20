// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDkA3AKF_lAvyp_yWd_4fv-L7f1GL-kYZo",
    authDomain: "casino-6de4f.firebaseapp.com",
    databaseURL: "https://casino-6de4f-default-rtdb.firebaseio.com",
    projectId: "casino-6de4f",
    storageBucket: "casino-6de4f.appspot.com",
    messagingSenderId: "46852261275",
    appId: "1:46852261275:web:e1df4dde8f5eac24484d3e"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos de Firebase
const db = firebase.firestore(); // O usa firebase.database() si estás utilizando Realtime Database

// Función para guardar un comentario
function saveComment(name, comment) {
    // Agrega el comentario a la colección 'comments'
    db.collection('comments').add({
        name: name,
        comment: comment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // Marca de tiempo del servidor
    })
    .then(() => {
        console.log("Comentario guardado con éxito");
        // Puedes limpiar el formulario después de guardar el comentario si es necesario
    })
    .catch((error) => {
        console.error("Error al guardar el comentario: ", error);
    });
}

// Función para manejar el envío del formulario
function handleSubmit(event) {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    // Guarda el comentario en Firebase
    saveComment(name, comment);

    // Limpia los campos del formulario
    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
}

// Añadir un evento de escucha para el envío del formulario
document.getElementById('commentForm').addEventListener('submit', handleSubmit);
