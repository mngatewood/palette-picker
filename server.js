const express = require('express');
const app = express();

// app.use(urlLogger, timeLogger);
app.use(express.static('public'))

app.get('/', (request, response) => {
  response.send('hello world');
});

// app.use((request, response) => {
//   response.status(404).send("Sorry can't find that!")
// })

app.listen(3000, () => {
  console.log('Palette-picker running on localhost:3000');
});

