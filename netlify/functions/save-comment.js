// functions/save-comment.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        try {
            const { userComment, userName } = JSON.parse(event.body);
            const filePath = path.join(__dirname, 'comments.json');
            
            // Leer comentarios existentes
            let comments = [];
            if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath);
                comments = JSON.parse(data);
            }
            
            // Añadir el nuevo comentario
            comments.push({ userName, userComment });
            
            // Guardar comentarios
            fs.writeFileSync(filePath, JSON.stringify(comments));
            
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Comment saved successfully' })
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Internal server error' })
            };
        }
    }
    
    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' })
    };
};
