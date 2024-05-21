const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]
const nameNew = process.argv[3]
const numberNew = process.argv[4]

const url = `mongodb+srv://nicolas:${password}@phonebook.kla0xmj.mongodb.net/phonebook?retryWrites=true&w=majority&appName=phonebook`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  "name": nameNew, 
  "number": numberNew  
})

if (!nameNew || !numberNew) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
      mongoose.connection.close()
    })
  })
} else {
  person.save().then(() => {
    console.log(`Added ${nameNew} number ${numberNew} to phonebook`)
    mongoose.connection.close()
  })
}

