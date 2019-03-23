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

describe('/delete destroy todos', () => {
  before(async function () {
    todo = await Todo.create({title: 'hello1'});
  });

  after(async function () {
    await Todo.destroy({truncate: true});
    app.stop();
  });

  it('should delete a todo', function (done) {
    // given a todo created earlier
    // when we call the endpoint to delete the todo
    chai.request(app)
    .delete(`${path}/${todo.id}`)
    .end(async (err, res) => {
      // we expect a 200 http response
      assert.equal(res.status, httpStatus.OK);

      // we expect to get back the todo
      let data = res.body;
      assert.equal(data.id, todo.id);

      // we expect the todo to be deleted
      const deletedTodo = await Todo.findByPk(todo.id);
      assert.equal(null, deletedTodo);
    });

    done();
  });

  it('should 404 when todo does not exist', function (done) {
    // given a todo created earlier
    // when we call the endpoint to delete a todo which does not exist
    chai.request(app)
    .get(`${path}/${todo.id + 1}`)
    .end((err, res) => {
      // we expect a 404 http response
      assert.equal(res.status, httpStatus.NOT_FOUND);
    });

    done();
  });
});
