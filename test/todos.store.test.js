process.env.NODE_ENV = "test";

let app = require('../index');
const httpStatus = require('http-status-codes');
const {Todo} = require('../models');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const path = '/api/v1/todos';

describe('/post store todos', () => {
  before(async function () {
  });

  after(async function () {
    await Todo.destroy({truncate: true});
    app.stop();
  });

  it('should store a todo', function (done) {
    // when we call the endpoint to store a todo
    chai.request(app)
    .post(path)
    .send({
      title: 'hello'
    })
    .end((err, res) => {
      // we expect a 201 http response
      assert.equal(res.status, httpStatus.CREATED);

      // we expect to get back the todo with title 'hello'
      let data = res.body;
      assert.equal(data.title, 'hello');
    });

    done();
  });
});
