const Joi = require ('joi');
const express = require('express')
const app = express()

app.use(express.json())

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
]

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with the given ID was not found.')
    res.send(course)
})

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course)
  res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if(!course) return res.status(404).send('The course with the given ID was not found.')
  
  const { error } = validateCourse(req.body)
  if(error) {
    return res.status(400).send(error.details[0].message)
  }

  course.name = req.body.name
  res.send(course)
})

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if(!course) return res.status(404).send('The course with the given ID was not found.')
  
  const index = courses.indexOf(course)
  courses.splice(index, 1)

  res.send(course)
})

function validateCourse(course){
  const schema = {
    name: Joi.string().min(3).required()
  }

  return Joi.ValidationError(course, schema)
}



const port = process.env.PORT || 3000
app.listen(3000, () => console.log('Listening on port ${port}...'))

/*
https://www.youtube.com/watch?v=pKd0Rpw7O48 57:00

set PORT=5000
nodemon expressExample.js

*/

/*
 function expressExamples() {
  
  // app.use(express.json());

  // app.use(function(req, res, next) {

  //   res.header("Access-Control-Allow-Origin", "*");
  
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  //   next();
  
  //   });
  
  // app.use(express.json());
}


*/ 