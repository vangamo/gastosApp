const express    = require('express')
const bodyParser = require('body-parser');
const sqlite3    = require('sqlite3').verbose();

const port = 3001

const app = express()
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/gastos/', (req, res) => {
  const db = new sqlite3.Database('mydatabase.db', (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  db.all(
    `SELECT e.ROWID AS id, e.concept, e.amount, e.date, c.name AS category
      FROM expenses AS e
      JOIN categories AS c ON (e.category_id=c.id)
      ORDER BY date DESC, id DESC`, (err, rows) => {
    if (err){
      throw err;
    }
    res.json( rows )
  });
  //res.json( [{id:0, concept:"Mememe"},{id:1, concept:"Blublubu"}] )
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
})

app.post('/api/gastos/', (req, res) => {
  const { concept, amount, category, date } = req.body
  const db = new sqlite3.Database('mydatabase.db', (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  db.serialize(() => {
    db.run(`INSERT INTO expenses(concept, amount, date, category_id)
              VALUES ($concept, $amount, $date, $category)`,
              {$concept:concept, $amount:amount, $category:category, $date:date})
      .all(
        `SELECT e.ROWID AS id, e.concept, e.amount, e.date, c.name AS category
          FROM expenses AS e
          JOIN categories AS c ON (e.category_id=c.id)
          WHERE e.ROWID = last_insert_rowid()
          ORDER BY e.date DESC, id DESC`, (err, rows) => {
      if (err){
        console.log(err);
        throw err;
      }
      res.status(200).send( {status:'ok', data:rows[0]} )
    });
  });
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
  //res.json( {status:'ok'} )
  //res.status(200).send( {status:'ok'} )
})

app.put('/api/gastos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const { concept, amount, category } = req.body
  return res.status(400).send('Not implemented')
})

app.delete('/api/gastos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const db = new sqlite3.Database('mydatabase.db', (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  db.run(
    `DELETE FROM expenses WHERE ROWID=$id`,
    { $id: id },
    (err, rows) => {
      if (err){
        console.log(err);
        throw err;
      }
      res.status(200).send( {status:'ok'} )
    });
              
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
})

app.get('/api/categories/', (req, res) => {
  const db = new sqlite3.Database('mydatabase.db', (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  db.all(`SELECT c.id, c.name, COUNT( e.rowid ) AS count
    FROM categories AS c
    LEFT JOIN expenses AS e ON (e.category_id = c.id)
    GROUP BY c.id
    ORDER BY count DESC, c.id ASC`, (err, rows) => {
    if (err){
      throw err;
    }
    res.json( rows )
  });
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})