// save-comment.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./comments.db');

exports.handler = async function(event) {
    if (event.httpMethod === 'POST') {
        try {
            const data = JSON.parse(event.body);
            const { userComment, userName } = data;

            if (!userComment || !userName) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Faltan datos' })
                };
            }

            // Guarda el comentario en la base de datos
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO comments (userName, userComment) VALUES (?, ?)',
                    [userName, userComment],
                    function(err) {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                    }
                );
            });

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Comment saved successfully' })
            };
        } catch (error) {
            console.error('Error al guardar comentario:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error al guardar comentario' })
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Método no permitido' })
        };
    }
};
