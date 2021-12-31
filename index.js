const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')



app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan((':method :url :status :res[content-length] - :response-time ms :body')))

morgan.token('body', (req, res) => {
  return [
    JSON.stringify(req.body)
  ]
})


app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})
app.get('/api/info', (req, res) => {
  const date = new Date()
  const length = persons.length
  res.send(`Phonebook has info for ${length} people <br><br>${date}`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  res.send(person)
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    important: body.important || false,
    date: new Date(),
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})