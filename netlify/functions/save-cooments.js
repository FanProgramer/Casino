// save-comments.js
function submitComment() {
    const comment = document.getElementById('userComment').value;
    const userName = document.getElementById('userName').innerText;

    if (comment) {
        // Guarda el comentario en Firebase
        firebase.firestore().collection('comments').add({
            name: userName,
            comment: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp() // Marca de tiempo del servidor
        })
        .then(() => {
            console.log("Comentario guardado con éxito");
            alert('Gracias por tu comentario, ' + userName + '!');

            // Opcional: Muestra el comentario en la página
            const commentDisplay = document.createElement('p');
            commentDisplay.innerText = userName + ': ' + comment;
            document.getElementById('commentsDisplay').appendChild(commentDisplay);

            // Limpia el textarea
            document.getElementById('userComment').value = '';
        })
        .catch((error) => {
            console.error("Error al guardar el comentario: ", error);
        });
    } else {
        alert('Por favor escribe un comentario antes de enviarlo.');
    }
}
