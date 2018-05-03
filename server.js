const express = require('express');
const app = express();

// console.log(process.env);

// app.use(urlLogger, timeLogger);
app.use(express.static('public'));

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile.js')[environment];
const database = require('knex')(configuration);

// PROJECTS

// retrieve all projects from the database
app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects)
    })
    .catch((error) => {
      response.status(500).json(error)
    })
})

// retrieve a single project from the database
app.get('/api/v1/projects/:id', (request, response) => {
  //SELECT * FROM projects WHERE id=request.params.id
  database('projects').where('id', request.params.id).select()
    .then((project) => {
      response.status(200).json(project[0])
    })
    .catch((error) => {
      response.status(500).json(error)
    })
})

app.post('/api/v1/projects', (request, response) => {
  const name = request.body.name;

  if(!name) {
    return response
      .status(422)
      .send({ error: 
        `Expected format: { name: <String> }. You're missing the "name" property.`
      });
  }

  database('projects').insert( {name}, 'id')
    .then(project => {
      reponse.status(201).json({ id: project[0]})
    })
    .catch(error => {
      response.status(500).json({ error });
    })

});

// PALETTES

// retrieve all palettes from the database
app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
    .then((palettes) => {
      response.status(200).json(palettes)
    })
    .catch((error) => {
      response.status(500).json(error)
    })
})


app.listen(3000, () => {
  console.log('Palette-picker running on localhost:3000');
});

