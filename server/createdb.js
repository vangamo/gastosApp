const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('mydatabase.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

db.serialize(() => {
  // Queries scheduled here will be serialized.
  db.run(`CREATE TABLE "expenses" (
    "concept"	TEXT NOT NULL,
    "amount"	REAL NOT NULL,
    "date"	TEXT NOT NULL,
    "timestamp"	INTEGER,
    "category"	TEXT,
    "category_id"	INTEGER
  );`)
    .run(`INSERT INTO expenses(concept, amount, date, category)
          VALUES ('Mercadona', 41.95, '2020-12-28', 'Comida'),
                 ('Ahorramás', 42.25, '2021-01-02', 'Comida'),
                 ('Comisiones', 6, '2021-01-03', 'Bancos')`)
    .each(`SELECT ROWID, concept FROM expenses`, (err, row) => {
      if (err){
        throw err;
      }
      console.log(row.rowid, row.concept, row);
    });
});

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
});

/*
 - SQLite3 with NodeJS: https://www.sqlitetutorial.net/sqlite-nodejs/
 - SQLite3: https://medium.com/@codesprintpro/getting-started-sqlite3-with-nodejs-8ef387ad31c4
*/
