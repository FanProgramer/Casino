// save-comment.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

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

            const dbPath = path.join(__dirname, 'comments.db');
            const db = new sqlite3.Database(dbPath);

            db.serialize(() => {
                db.run("CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, comment TEXT)");
                const stmt = db.prepare("INSERT INTO comments (name, comment) VALUES (?, ?)");
                stmt.run(userName, userComment);
                stmt.finalize();
            });

            db.close();

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Comentario guardado exitosamente' })
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
