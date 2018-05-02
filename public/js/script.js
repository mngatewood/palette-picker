const onLoad = async () => {
  refreshPalette();
  const projects = await fetchProjects();
  console.log(projects)
  await createProjectDiv(projects);
}

const randomNumber = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
}

const refreshPalette = () => {
  const colorOne = ('#' + randomNumber() + '0').substring(0, 7);
  const colorTwo = ('#' + randomNumber() + '0').substring(0, 7);
  const colorThree = ('#' + randomNumber() + '0').substring(0, 7);
  const colorFour = ('#' + randomNumber() + '0').substring(0, 7);
  const colorFive = ('#' + randomNumber() + '0').substring(0, 7);
  
  $('#header-palette-one').css('background-color', colorOne);
  $('#header-palette-two').css('background-color', colorTwo);
  $('#header-palette-three').css('background-color', colorThree);
  $('#header-palette-four').css('background-color', colorFour);
  $('#header-palette-five').css('background-color', colorFive);
  
  $('#header-palette-one span').text(colorOne);
  $('#header-palette-two span').text(colorTwo);
  $('#header-palette-three span').text(colorThree);
  $('#header-palette-four span').text(colorFour);
  $('#header-palette-five span').text(colorFive);
}

fetchProjects = async () => {
  url = 'http://localhost:3000/api/v1/projects/';
  try {
    const response = await fetch(url);
    const projects = await response.json();
    console.log(projects);
    return projects;
  } catch (error) {
    throw Error("Error retrieving recipes: " + error.message);
  }
}

const createProjectDiv = (projects) => {
  $.each(projects, (index, project) => {
    const newArticle = $(`
      <article id="${project.id}">
        <h2 >${project.id}</h2>
      </article>
    `);
    console.log(project.id);
    $('#main-existing-projects-container').append(newArticle);

    $.each(project.palettes, (index, palette) => {
      console.log(palette.colorOne)
      const paletteSelector = project.id
      const newPalette = $(`
          <h3>${palette.id}</h3>
            <ul>
              <li>${palette.colorOne}</li>
              <li>${palette.colorTwo}</li>
              <li>${palette.colorThree}</li>
              <li>${palette.colorFour}</li>
              <li>${palette.colorFive}</li>
            </ul>
      `)

      $("#" + paletteSelector).append(newPalette);
    })


  });
}

$('#main-button-refresh').click( () => {
  refreshPalette();
});

$('.lock-button').click( (event) => {
  $(event.target).toggleClass("selected");
});
