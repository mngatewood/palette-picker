const express = require('express');
const app = express();

// app.use(urlLogger, timeLogger);
app.use(express.static('public'))

app.get('/api/v1/projects', (request, response) => {
  const projects = app.locals.projects;

  if(projects) {
    response.status(200).json(projects);
  } else {
    response.status(404).send("Sorry can't find that!")
  }
});

app.post('/api/v1/projects', (request, response) => {
  const projects = app.locals.projects;
  const {project} = request.body;

  projects.push({project})
  response.status(201).json({ project });
});


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

