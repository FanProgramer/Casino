// get-comments.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./comments.db');

exports.handler = async function(event) {
    try {
        const comments = await new Promise((resolve, reject) => {
            db.all('SELECT userName, userComment FROM comments', [], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });

        return {
            statusCode: 200,
            body: JSON.stringify(comments)
        };
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al obtener comentarios.' })
        };
    }
};
