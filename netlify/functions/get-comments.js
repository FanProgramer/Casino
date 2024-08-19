// functions/get-comments.js
exports.handler = async function(event, context) {
    try {
        // Simula datos de comentarios
        const comments = [
            { userName: 'Juan', userComment: '¡Excelente casino!' },
            { userName: 'Ana', userComment: 'Muy divertido!' }
        ];
        return {
            statusCode: 200,
            body: JSON.stringify(comments)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al obtener comentarios.' })
        };
    }
};

