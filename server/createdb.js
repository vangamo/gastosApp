const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('mydatabase.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

db.serialize(() => {
  // Queries scheduled here will be serialized.
  db.run(
    `CREATE TABLE "categories" (
      "id"	INTEGER NOT NULL UNIQUE,
      "name"	INTEGER NOT NULL UNIQUE,
      "periodic"	INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY("id" AUTOINCREMENT)
    );`)
  .run(
    `CREATE TABLE "expenses" (
      "concept"	TEXT NOT NULL,
      "amount"	REAL NOT NULL,
      "date"	TEXT NOT NULL,
      "timestamp"	INTEGER,
      "category"	TEXT,
      "category_id"	INTEGER,
      FOREIGN KEY("category_id") REFERENCES "categories"("id") ON UPDATE CASCADE ON DELETE NO ACTION );`);
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
