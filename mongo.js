const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

if (process.argv.length === 4) {
    console.log('give number for person')
    process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.00s32.mongodb.net/Numbers?retryWrites=true&w=majority`

mongoose.connect(url)



const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date,
    important: Boolean,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: personName,
    number: personNumber,
    date: new Date(),
    important: true,
})

if (process.argv.length == 3) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close
        process.exit(1)

    })
} else {
    person.save().then(response => {
        console.log(`added ${personName} number ${personNumber} to phonebook`)
        mongoose.connection.close()
    })
}

