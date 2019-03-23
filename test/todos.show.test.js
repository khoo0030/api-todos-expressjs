process.env.NODE_ENV = "test";

let app = require('../index');
const httpStatus = require('http-status-codes');
const {Todo} = require('../models');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const path = '/api/v1/todos';

let todo;

describe('/get show todos', () => {
  before(async function () {
    todo = await Todo.create({title: 'hello1'});
  });

  after(async function () {
    await Todo.destroy({truncate: true});
    app.stop();
  });

  it('should get a todo', function (done) {
    // given a todo created earlier
    // when we call the endpoint to get the todo
    chai.request(app)
    .get(`${path}/${todo.id}`)
    .end((err, res) => {
      // we expect a 200 http response
      assert.equal(res.status, httpStatus.OK);

      // we expect to get back the todo
      let data = res.body;
      assert.equal(data.id, todo.id);
    });

    done();
  });
});
