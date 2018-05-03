const onLoad = async () => {
  refreshPalette();
  const projects = await fetchProjects();
  await renderProjects(projects);
  const palettes = await fetchPalettes();
  await renderPalettes(palettes);
}

const randomNumber = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
}

const refreshPalette = () => {
  for (let i = 1; i <= 5; i++) {
    if (!$(`#header-palette-${i}`).hasClass('locked')) {
      let color = ('#' + randomNumber() + '0').substring(0, 7);
      $(`#header-palette-${i}`).css('background-color', color);
      $(`#header-palette-${i} span`).text(color);
    }
  }
}

const fetchProjects = async () => {
  url = 'http://localhost:3000/api/v1/projects/';
  try {
    const response = await fetch(url);
    const projects = await response.json();
    return projects;
  } catch (error) {
    throw Error("Error retrieving projects: " + error.message);
  }
}

const fetchPalettes = async () => {
  url = 'http://localhost:3000/api/v1/palettes/';
  try {
    const response = await fetch(url);
    const palettes = await response.json();
    return palettes;
  } catch (error) {
    throw Error("Error retrieving palettes: " + error.message);
  }
}

const renderProjects = (projects) => {
  $.each(projects, (index, project) => {
    const newArticle = $(`
      <article id="project-${project.id}">
        <h2 >${project.name}</h2>
      </article>
    `);
    $('#main-existing-projects-container').append(newArticle);
  });
};

const renderPalettes = (palettes) => {
  $.each(palettes, (index, palette) => {
    const newPalette = $(`
      <div id="palette-${palette.id}" class="project-palette-container">
        <h3>${palette.name}</h3>
        <div class="project-color-box" style="background-color:${palette.color_1}"></div>
        <div class="project-color-box" style="background-color:${palette.color_2}"></div>
        <div class="project-color-box" style="background-color:${palette.color_3}"></div>
        <div class="project-color-box" style="background-color:${palette.color_4}"></div>
        <div class="project-color-box" style="background-color:${palette.color_5}"></div>
        <img src="/css/delete-button.svg" />
      </div>
    `)
    $("#project-" + palette.project_id).append(newPalette);
  })
};


$('#main-button-refresh').click( () => {
  refreshPalette();
});

$('.lock-button').click( (event) => {
  const button = event.target
  $(button).parent().toggleClass('locked')
  $(button).toggleClass('selected');
});
