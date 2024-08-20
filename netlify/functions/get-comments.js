exports.handler = async () => {
  const db = new sqlite3.Database(dbPath);
  let comments = [];

  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM comments', (err, rows) => {
      if (err) {
        reject({ statusCode: 500, body: 'Error querying database' });
      }
      comments = rows;
      db.close();
      resolve({
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' // Permitir solicitudes desde cualquier origen
        },
        body: JSON.stringify(comments)
      });
    });
  });
};
