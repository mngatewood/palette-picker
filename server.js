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

app.locals.projects = [
  {
    "id": "project-1",
    "palettes": [
      {
        "id": "palette-1",
        "color-1": "#111111",
        "color-2": "#222222",
        "color-3": "#333333",
        "color-4": "#444444",
        "color-5": "#555555"
      },
      {
        "id": "palette-2",
        "color-1": "#666666",
        "color-2": "#777777",
        "color-3": "#888888",
        "color-4": "#999999",
        "color-5": "#000000"
      },
    ]
  },
  {
    "id": "project-2",
    "palettes": [
      {
        "id": "palette-3",
        "color-1": "#121212",
        "color-2": "#232323",
        "color-3": "#343434",
        "color-4": "#454545",
        "color-5": "#565656"
      },
      {
        "id": "palette-4",
        "color-1": "#676767",
        "color-2": "#787878",
        "color-3": "#898989",
        "color-4": "#909090",
        "color-5": "#010101"
      },
    ]
  }
]

app.listen(3000, () => {
  console.log('Palette-picker running on localhost:3000');
});

