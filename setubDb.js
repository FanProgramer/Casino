const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data.db');

exports.addComment = (userName, comment) => {
  const db = new sqlite3.Database(dbPath);

  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO comments (user_name, comment) VALUES (?, ?)',
      [userName, comment],
      function(err) {
        if (err) {
          reject({ statusCode: 500, body: 'Error inserting comment' });
        } else {
          db.close();
          resolve({ statusCode: 200, body: 'Comment added successfully' });
        }
      }
    );
  });
};
