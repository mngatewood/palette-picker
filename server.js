const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// console.log(process.env);

// app.use(urlLogger, timeLogger);
app.use(bodyParser.json());
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
  console.log(name)

  if(!name) {
    return response
      .status(422)
      .send({ error: 'Please enter a project name.' });
  }

  database('projects').where('name', name).select()
    .then(result => {
      if (result.length) { return response.status(409)
      .send({ error: 'Error: Please enter a unique project name.'})
      } else {
        database('projects').insert({ name }, 'id')
          .then(project => {
            response.status(201).json({ id: project[0] })
          })
      }
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

app.post('/api/v1/palettes', (request, response) => {
  const { name, color_1, color_2, color_3, color_4, color_5, project_id } = request.body;

  if (!name) {
    return response
      .status(422)
      .send({
        error:
          `Expected format: { name: <String> }. You're missing the "name" property.`
      });
  }

  database('palettes').insert( request.body, 'id')
    .then( palette => {
      response.status(201).json({ id: palette[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    })

});


app.delete('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;

  database('palettes').where('id', id).del()
    .then(result => {
      if (result) {
        return response
          .status(200)
          .json({ result: `Palette ${id} deleted successfully.` })
      } else {
        return response
          .status(404)
          .send({ error: `Palette ${id} not found.` })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.listen(3000, () => {
  console.log('Palette-picker running on localhost:3000');
});

module.exports = app;