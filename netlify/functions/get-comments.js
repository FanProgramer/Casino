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

// Función para obtener y mostrar los comentarios
function getComments() {
    // Obtén la referencia a la colección 'comments'
    db.collection('comments').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
        const commentsSection = document.getElementById('commentsSection');
        commentsSection.innerHTML = ''; // Limpia la sección de comentarios

        snapshot.forEach((doc) => {
            const comment = doc.data();
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            
            commentElement.innerHTML = `
                <p><strong>${comment.name}:</strong></p>
                <p>${comment.comment}</p>
                <hr>
            `;

            commentsSection.appendChild(commentElement);
        });
    });
}

// Llama a la función para obtener y mostrar los comentarios al cargar la página
window.onload = getComments;
