const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan((':method :url :status :res[content-length] - :response-time ms :body')))

morgan.token('body', (req, res) => {
    return [
        JSON.stringify(req.body)
    ]
})
let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    }

]



app.get('/api/persons', (req, res) => {
    res.json(persons)
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
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()

})

app.post('/api/persons/', (req, res) => {
    const body = req.body
    const names = persons.map(person => person.name)



    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }
    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    }
    if (names.includes(body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }


    const newPerson = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 1000)
    }
    persons = persons.concat(newPerson)
    res.json(newPerson)


})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})