exports.handler = async (event) => {
  const { comment, userName } = JSON.parse(event.body);
  const db = new sqlite3.Database(dbPath);

  return new Promise((resolve, reject) => {
    db.run('INSERT INTO comments (user_name, comment) VALUES (?, ?)', [userName, comment], function (err) {
      if (err) {
        reject({ statusCode: 500, body: 'Error inserting comment' });
      }
      db.close();
      resolve({
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' // Permitir solicitudes desde cualquier origen
        },
        body: 'Comment saved successfully'
      });
    });
  });
};
