const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/gastos/', (req, res) => {
    res.json( [{id:0, concept:"Mememe"},{id:1, concept:"Blublubu"}] )
})

app.post('/api/gastos/', (req, res) => {
    res.json( {status:'ok'} )
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})