require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data.db');

exports.handler = async (event) => {
  const { comment } = JSON.parse(event.body);
  const db = new sqlite3.Database(dbPath);

  return new Promise((resolve, reject) => {
    db.run('INSERT INTO comments (comment) VALUES (?)', [comment], function (err) {
      if (err) {
        reject({ statusCode: 500, body: 'Error inserting comment' });
      }
      db.close();
      resolve({ statusCode: 200, body: 'Comment saved successfully' });
    });
  });
};


