const chai = require('chai');
const should = chai.should();
const server = require('../server');
const chaiHttp = require('chai-http');
const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Projects', () => {

  beforeEach((done) => {
    database.migrate.rollback()
      .then( () => {
        database.migrate.latest()
        .then ( () => {
          return database.seed.run()
            .then( () => {
              done();
            })
        })
    })
  })

  it('should GET all projects', (done) => {
    chai.request(server)
      .get('/api/v1/projects')
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(200);
        response.body.should.be.an('array');
        response.body.length.should.equal(2);
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('name');
        response.body[0].id.should.equal(1)
        response.body[0].name.should.equal('project 1');
        response.body[1].should.have.property('id');
        response.body[1].should.have.property('name');
        response.body[1].id.should.equal(2);
        response.body[1].name.should.equal('project 2');
        done();
      })
  })

  it('should get a single project', (done) => {
    chai.request(server)
      .get('/api/v1/projects/1')
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(200);
        response.should.be.an('object');
        response.body.should.have.property('id');
        response.body.should.have.property('name');
        response.body.id.should.equal(1);
        response.body.name.should.equal('project 1');
        done();
      })
  })

  it('should throw an error if GET project does not exist', (done) => {
    chai.request(server)
      .get('/api/v1/projects/999')
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(404);
        response.should.be.an('object');
        response.body.error.should.equal("Could not find project id \"999")
        done();
      })
  })

  it('should POST a new project', (done) => {
    chai.request(server)
      .post('/api/v1/projects')
      .send({ name: 'project 3' })
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(201);
        response.should.be.an('object');
        response.body.should.have.property('id');
        done();
      })
  })

  it('should throw an error if POST does not include name property', (done) => {
    chai.request(server)
      .post('/api/v1/projects/')
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(422);
        response.should.be.an('object');
        response.body.error.should.equal("Please enter a project name.")
        done();
      })
  })

  it('should throw an error if POST includes duplicate project name', (done) => {
    chai.request(server)
      .post('/api/v1/projects/')
      .send({ name: 'project 1' })
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(409);
        response.should.be.an('object');
        response.body.error.should.equal("Error: Please enter a unique project name.")
        done();
      })
  })

})

describe('Palettes', () => {

  beforeEach((done) => {
    database.migrate.rollback()
      .then(() => {
        database.migrate.latest()
          .then(() => {
            return database.seed.run()
              .then(() => {
                done();
              })
          })
      })
  })

  it('should GET all palettes', (done) => {
    chai.request(server)
      .get('/api/v1/palettes')
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(200);
        response.body.should.be.an('array');
        response.body.length.should.equal(4);
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('color_1');
        response.body[0].should.have.property('color_2');
        response.body[0].should.have.property('color_3');
        response.body[0].should.have.property('color_4');
        response.body[0].should.have.property('color_5');
        response.body[0].should.have.property('project_id');
        response.body[0].name.should.equal('palette 1');
        response.body[0].color_1.should.equal('#111111');
        response.body[0].color_2.should.equal('#222222');
        response.body[0].color_3.should.equal('#333333');
        response.body[0].color_4.should.equal('#444444');
        response.body[0].color_5.should.equal('#555555');
        response.body[0].project_id.should.equal(1);
        done();
      })
  })

  it('should get a single palette', (done) => {
    chai.request(server)
      .get('/api/v1/palettes/1')
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(200);
        response.should.be.an('object');
        response.body.should.have.property('id');
        response.body.should.have.property('name');
        response.body.should.have.property('color_1');
        response.body.should.have.property('color_2');
        response.body.should.have.property('color_3');
        response.body.should.have.property('color_4');
        response.body.should.have.property('color_5');
        response.body.should.have.property('project_id');
        response.body.name.should.equal('palette 1');
        response.body.color_1.should.equal('#111111');
        response.body.color_2.should.equal('#222222');
        response.body.color_3.should.equal('#333333');
        response.body.color_4.should.equal('#444444');
        response.body.color_5.should.equal('#555555');
        response.body.project_id.should.equal(1);
        done();
      })
  })

  it('should throw an error if GET palette does not exist', (done) => {
    chai.request(server)
      .get('/api/v1/palettes/999')
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(404);
        response.should.be.an('object');
        response.body.error.should.equal("Could not find palette id \"999")
        done();
      })
  })

  it('should POST a new palette', (done) => {
    chai.request(server)
      .post('/api/v1/palettes')
      .send({ 
        name: 'palette 5',
        color_1: '#666666',
        color_2: '#777777',
        color_3: '#888888',
        color_4: '#999999',
        color_5: '#000000',
        project_id: 1
      })
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(201);  // unable to fetch due to incrementing id
        response.should.be.an('object');
        response.body.should.have.property('id');  // unable to fetch due to incrementing id
        done();
      })
  })

  it('should throw an error if POST does not include name property', (done) => {
    chai.request(server)
      .post('/api/v1/palettes/')
      .send({
        color_1: '#666666',
        color_2: '#777777',
        color_3: '#888888',
        color_4: '#999999',
        color_5: '#000000',
        project_id: 1
      })
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(422);
        response.should.be.an('object');
        response.body.error.should.equal("Error: Please enter a palette name.")
        done();
      })
  })

  it('should throw an error if POST does not include project_id property', (done) => {
    chai.request(server)
      .post('/api/v1/palettes/')
      .send({
        name: 'palette 5',
        color_1: '#666666',
        color_2: '#777777',
        color_3: '#888888',
        color_4: '#999999',
        color_5: '#000000'
      })
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(400);
        response.should.be.an('object');
        response.body.error.should.equal("Error: Please select a project to save this palette.")
        done();
      })
  })

  it('should delete a palette', (done) => {
    chai.request(server)
      .delete('/api/v1/palettes/1')
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(200);
        response.should.be.an('object');
        response.body.result.should.equal('Palette 1 deleted successfully.')
        done();
      })
  })

  it('should throw an error if DELETE palette does not exist', (done) => {
    chai.request(server)
    .delete('/api/v1/palettes/999')
    .end((error, response) => {
      response.should.be.json;
      response.should.have.status(404);
      response.should.be.an('object');
      response.body.error.should.equal("Palette 999 not found.")
      done();
    })
  })
  
})