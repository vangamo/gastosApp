const express    = require('express')
const bodyParser = require('body-parser');

const port = 3001

const app = express()
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/gastos/', (req, res) => {
  res.json( [{id:0, concept:"Mememe"},{id:1, concept:"Blublubu"}] )
})

app.post('/api/gastos/', (req, res) => {
  const { concept, amount, category, date } = req.body
  console.log( concept, amount, category, date )
  //res.json( {status:'ok'} )
  res.status(200).send( {status:'ok'} )
})

app.put('/api/gastos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const { concept, amount, category } = req.body
  return res.status(400).send('Not implemented')
})

app.delete('/api/gastos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return res.status(400).send('Not implemented')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})