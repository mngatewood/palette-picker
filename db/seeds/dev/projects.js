
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('palettes').del()
    .then (() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          name: 'project 1'
        }, 'id')
        .then(project => {
          return knex('palettes').insert([
            {
              name: 'palette 1',
              color_1: "#111111",
              color_2: '#222222',
              color_3: '#333333',
              color_4: '#444444',
              color_5: '#555555',
              project_id: project[0]
            },
            {
              name: 'palette 2',
              color_1: '#555555',
              color_2: '#666666',
              color_3: '#777777',
              color_4: '#888888',
              color_5: '#999999',
              project_id: project[0]
            }
          ])
        })
        .then(() => console.log('Project 1: Seeding complete!'))
        .catch(error => console.log('Error seeding data: ${error}'))
      ])
    })
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          name: 'project 2'
        }, 'id')
        .then(project => {
          return knex('palettes').insert([
            {
              name: 'palette 3',
              color_1: '#121212',
              color_2: '#232323',
              color_3: '#343434',
              color_4: '#454545',
              color_5: '#565656',
              project_id: project[0]
            },
            {
              name: 'palette 4',
              color_1: '#676767',
              color_2: '#787878',
              color_3: '#898989',
              color_4: '#909090',
              color_5: '#010101',
              project_id: project[0]
            }
          ])
        })
        .then(() => console.log('Project 2: Seeding complete!'))
        .catch(error => console.log('Error seeding data: ${error}'))
      ])
    })
    .catch (error => console.log('Error seeding data: ${error}'))
};
