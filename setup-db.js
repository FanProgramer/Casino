// setup-db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./comments.db');

db.serialize(() => {
    // Crea la tabla si no existe
    db.run(`
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userName TEXT NOT NULL,
            userComment TEXT NOT NULL
        )
    `);
});

db.close();
