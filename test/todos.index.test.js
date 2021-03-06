process.env.NODE_ENV = "test";

let app = require('../index');
const httpStatus = require('http-status-codes');
const {Todo} = require('../models');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const path = '/api/v1/todos';

let todo1;
let todo2;

describe('/get index todos', () => {
  before(async function () {
    todo1 = await Todo.create({title: 'hello1'});
    todo2 = await Todo.create({title: 'hello2'});
  });

  after(async function () {
    await Todo.destroy({truncate: true});
    app.stop();
  });

  it('should get todos', function (done) {
    // given 2 todos created earlier
    // when we call the endpoint to get the todos
    chai.request(app)
    .get(path)
    .end((err, res) => {
      // we expect a 200 http response
      assert.equal(res.status, httpStatus.OK);

      // we expect to get back the 2 todos
      let data = res.body;

      assert.equal(data.length, 2);

      const todoIds = data.map(function (todo) {
        return todo.id;
      });

      assert.include(todoIds, todo1.id);
      assert.include(todoIds, todo2.id);
    });

    done();
  });
});
