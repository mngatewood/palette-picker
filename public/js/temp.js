$.each(project.palettes, (index, palette) => {
  console.log(palette.colorOne)
  const paletteSelector = project.id
  const newPalette = $(`
        <div id="${palette.id}>
          <h3>${palette.id}</h3>
            <ul>
              <li>${palette.colorOne}</li>
              <li>${palette.colorTwo}</li>
              <li>${palette.colorThree}</li>
              <li>${palette.colorFour}</li>
              <li>${palette.colorFive}</li>
            </ul>
        </div>
      `)

  $("#" + paletteSelector ).append("<p>Test</p>");
})
