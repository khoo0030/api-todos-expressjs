process.env.NODE_ENV = "test";

const {Todo} = require('../models');

const chai = require('chai');
const chaiHttp = require('chai-http');

let app = require('../index');

const should = chai.should();

chai.use(chaiHttp);

describe('/GET todos', () => {
  before(function (done) {

    Todo.create({
      title: 'hello',
    }).then((done) => {
      // console.log(done);
    }).catch((error) => {
      console.log(error);
    });
    done();
  });

  after(function (done) {
    app.close();
    done();
  });

  it('it should get todos', function (done) {
    chai.request(app)
    .get('/')
    .end((err, res) => {
      // console.log(res.body);
      res.should.have.status(200);
      done();
    });
  });
});
