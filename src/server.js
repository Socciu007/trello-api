import express from "express"

const app = express()

const host = 'localhost'
const port = 5005

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port, host, () => {
  console.log(`Hello Tien, Starting server on port ${port}`)
})