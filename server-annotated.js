const express = require('express'); //import express
const app = express(); //declare variable for using express methods
const bodyParser = require('body-parser');  //import bodyParser to parse request/response

app.use(bodyParser.json());  //method to use bodyParser
app.use(express.static('public'));  //method to route static files such as html, css, images, etc.

const environment = process.env.NODE_ENV || 'development';  //declare current environment; development if no NODE_ENV
const configuration = require('./knexfile.js')[environment];  //import knex configuration for declared environment
const database = require('knex')(configuration);  //declare variable to use knex with current configuration/environment

app.set('port', process.env.PORT || 3000) //set port based on environment; default to port 3000

// PROJECTS

app.get('/api/v1/projects', (request, response) => {  //GET fetch at route
  database('projects').select()  //select all from projects table
    .then((projects) => {  //resolve; callback function
      response.status(200).json(projects)  //respond with status code 200 and fetched projects
    })
    .catch((error) => {  //catch error
      response.status(500).json(error) //respond with status code 500 and error object if caught
    })
})

app.get('/api/v1/projects/:id', (request, response) => {  //GET fetch at route
  database('projects').where('id', request.params.id).select()  //select record projects where id = passed parameter 
    .then((projects) => { //resolve; callback function
      if (projects.length) { //if response returns a record
        response.status(200).json(projects[0])  //then respond with status code 200 and the fetched project
      } else { //otherwise...
        response.status(404).json({ //...return a status code of 400 and...
          error: `Could not find project id "${request.params.id}` //...this error message
        })
      }
    })
    .catch((error) => { //catch error
      response.status(500).json(error)  //respond with status code 500 and error object if caught
    })
})

app.post('/api/v1/projects', (request, response) => { // POST fetch at route
  const name = request.body.name; //declare variable for body.name

  if(!name) { //if there's a name in the request body
    return response //respond with...
      .status(422) //...status code 422 and...
      .send({ error: 'Please enter a project name.' }); //...this error message
  }

  database('projects').where('name', name).select() //select all from projects where name = passed parameter
    .then(result => { //resolve; callback function
      if (result.length) { return response.status(409)  //if response returns a record, then respond with a status code of 409 and...
      .send({ error: 'Error: Please enter a unique project name.'}) //...this error message
      } else { //otherwise...
        database('projects').insert({ name }, 'id') //create an id and insert new record (id, name) into projects 
          .then(project => { //resolve, callback function
            response.status(201).json({ id: project[0] }) //respond with status code 201 and the id
          })
      }
    })
    .catch(error => { //catch error
      response.status(500).json({ error }); //respond with status code 500 and error object if caught
    })

});

// PALETTES

app.get('/api/v1/palettes', (request, response) => { //GET fetch at route
  database('palettes').select() //select all from palettes
    .then((palettes) => { //resolve; callback function
      response.status(200).json(palettes) //respond with status code 200 and fetched palettes
    })
    .catch((error) => { //catch error
      response.status(500).json(error) //respond with status code 500 and error object if caught
    })
})

app.get('/api/v1/palettes/:id', (request, response) => { //GET fetch from route
  database('palettes').where('id', request.params.id).select() //select record from palettes where id = passed parameter
    .then((palettes) => { //resolve; callback function
      if (palettes.length) { //if response contains a record
        response.status(200).json(palettes[0]) //respond with status code 200 and fetched palette
      } else { //otherwise...
        response.status(404).json({ //...respond with status code 404 and...
          error: `Could not find palette id "${request.params.id}` //...this error message
        })
      }
    })
    .catch((error) => { //catch error
      response.status(500).json(error) //respond with status code 500 and error object if caught
    })
})

app.post('/api/v1/palettes', (request, response) => {  //POST fetch at route
  const { name, color_1, color_2, color_3, color_4, color_5, project_id } = request.body; //destructure  request body
  const project = request.body; //declare variable for request body

  if (!name) { //if request body is missing name property
    return response.status(422) //then respond with status code 422 and...
      .send({ error: 'Error: Please enter a palette name.' }); //...this error message
  } else if (!project_id) { //otherwise, if request body is missing project_id
    return response.status(400) //then respond with status code 400 and...
      .send({ error: 'Error: Please select a project to save this palette.' }) //...this error message
  } else { //otherwise...
    for (let requiredParameter of ['color_1', 'color_2', 'color_3', 'color_4', 'color_5']) { //iterate over each color property
      if (!project[requiredParameter]) { //if any of the color properties are missing
        return response.status(500) //then respond with status code 500
      }
    }
    database('palettes').insert(request.body, 'id') //add palette object as a new record in palettes
      .then(palette => { //resolve; callback function
        response.status(201).json({ id: palette[0] }) //respond with status code 201 and id
      })
      .catch(error => { //catch error
        response.status(500).json({ error }); //respond with status code 500 and the error object
      })
  }
});

app.delete('/api/v1/palettes/:id', (request, response) => { //DELETE fetch at route
  const { id } = request.params; //destructure parameters (id)

  database('palettes').where('id', id).del() //delete record from palettes where id = passed parameter
    .then(result => { //resolve; callback function
      if (result) { //if the record exists in palettes table
        return response //respond with...
          .status(200) //status code 200 and...
          .json({ result: `Palette ${id} deleted successfully.` }) //...this confirmation message
      } else { //otherwise
        return response //respond with...
          .status(404) //status code 404 and...
          .send({ error: `Palette ${id} not found.` }) //...this error message
      }
    })
    .catch(error => { //catch error
      response.status(500).json({ error }) //respond with status code 500 and error object if caught
    })
})

app.listen(app.get('port'), () => { //listen on whatever port is being used for the given environment
  console.log('Palette-picker running on localhost:3000'); //console.log a confirmation message
});

module.exports = app; //export server for importing in test