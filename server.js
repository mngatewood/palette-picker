const express = require('express');
const app = express();

// console.log(process.env);

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile.js')[environment];
const database = require('knex')(configuration);

// app.use(urlLogger, timeLogger);
app.use(express.static('public'));

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

// app.get('/api/v1/projects', (request, response) => {
//   const projects = app.locals.projects;

//   if(projects) {
//     response.status(200).json(projects);
//   } else {
//     response.status(404).send("Sorry can't find that!")
//   }
// });

// app.post('/api/v1/projects', (request, response) => {
//   const projects = app.locals.projects;
//   const {project} = request.body;

//   projects.push({project})
//   response.status(201).json({ project });
// });


app.locals.projects = [
  {
    "id": "projectOne",
    "palettes": [
      {
        "id": "paletteOne",
        "colorOne": "#111111",
        "colorTwo": "#222222",
        "colorThree": "#333333",
        "colorFour": "#444444",
        "colorFive": "#555555"
      },
      {
        "id": "paletteTwo",
        "colorOne": "#666666",
        "colorTwo": "#777777",
        "colorThree": "#888888",
        "colorFour": "#999999",
        "colorFive": "#000000"
      },
    ]
  },
  {
    "id": "projectTwo",
    "palettes": [
      {
        "id": "paletteThree",
        "colorOne": "#121212",
        "colorTwo": "#232323",
        "colorThree": "#343434",
        "colorFour": "#454545",
        "colorFive": "#565656"
      },
      {
        "id": "paletteFour",
        "colorOne": "#676767",
        "colorTwo": "#787878",
        "colorThree": "#898989",
        "colorFour": "#909090",
        "colorFive": "#010101"
      },
    ]
  }
]



app.listen(3000, () => {
  console.log('Palette-picker running on localhost:3000');
});

