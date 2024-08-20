// get-comments.js
document.addEventListener('DOMContentLoaded', function() {
    const db = firebase.firestore();
    const commentsDisplay = document.getElementById('commentsDisplay');

    // Obtener y mostrar comentarios en tiempo real
    db.collection('comments').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
        commentsDisplay.innerHTML = ''; // Limpiar comentarios anteriores

        snapshot.forEach((doc) => {
            const commentData = doc.data();
            const commentElement = document.createElement('p');
            commentElement.textContent = `${commentData.name}: ${commentData.comment}`;
            commentsDisplay.appendChild(commentElement);
        });
    });
});
