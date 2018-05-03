const onLoad = async () => {
  refreshPalette();
  await renderProjectContainer();
}

const renderProjectContainer = async () => {
  await emptyProjectContainer();
  const projects = await fetchProjects();
  await renderProjects(projects);
  const palettes = await fetchPalettes();
  await renderPalettes(palettes);
  await getProjectOptions(projects);
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
        <img src="/css/delete-button.svg" alt="delete button" id="${palette.id}" class="delete-palette-button" />
      </div>
    `)
    $("#project-" + palette.project_id).append(newPalette);
  })
};

const emptyProjectContainer = () => {
  $('#main-existing-projects-container').empty();
}

const getProjectOptions = (projects) => {
  $.each(projects, (index, project) => {
    const option = $(`
    <option id="${project.id}">${project.name}</option>
    `)
    $('#save-palette-project').append(option);
  })
}

const getPalette = (event) => {
  event.preventDefault();
  const name = $('#save-palette-name').val();
  const color_1 = $('#header-palette-1 span').text();
  const color_2 = $('#header-palette-2 span').text();
  const color_3 = $('#header-palette-3 span').text();
  const color_4 = $('#header-palette-4 span').text();
  const color_5 = $('#header-palette-5 span').text();
  const project_id = $('#save-palette-project').children(":selected").attr("id");
  return { name, color_1, color_2, color_3, color_4, color_5, project_id };
}

const postPalette = async (palette) => {
  try {
    url = 'http://localhost:3000/api/v1/palettes/';
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(palette)
    });
  } catch (error) {
    throw Error("Error saving palette: " + error.message);
  }
}

const deletePalette = async (id) => {
  const initialFetch = await fetch(`/api/v1/palettes/${id}`, {
    method: 'DELETE'
  })
  $(`#palette-${id}`).remove();
}

const toggleLock = () => {
  const button = event.target
  $(button).parent().toggleClass('locked')
  $(button).toggleClass('selected');
}

$('#main-button-refresh').click( () => {
  refreshPalette();
});

$('.lock-button').click((event) => {
  toggleLock();
});

$('#save-palette-submit').click( async (event) => {
  const palette = getPalette(event);
  await postPalette(palette);
  await renderProjectContainer();
});

$('#create-project-submit').click((event) => {
  event.preventDefault();
  getProjectOptions();
})

$('body').on('click', '.delete-palette-button', (event) => {
  deletePalette(event.target.id);
})
