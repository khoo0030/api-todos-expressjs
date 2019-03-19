process.env.NODE_ENV = "test";

let app = require('../../../../index');
const {Todo} = require('../../../../models');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const path = '/api/v1/todos';

let todo;

describe('/DELETE destroy todos', () => {
  before(async function () {
    try {
      todo = await Todo.create({title: 'hello1'});
    } catch (e) {
      console.log(e)
    }
  });

  after(async function () {
    await Todo.destroy({truncate: true});
    app.close();
  });

  it('it should delete a todo', function (done) {
    // given a todo created earlier
    // when we call the endpoint to delete the todo
    chai.request(app)
    .delete(`${path}/${todo.id}`)
    .end(async (err, res) => {
      // we expect a 200 http response
      assert.equal(res.status, 200);

      // we expect to get back the todo
      let data = res.body;
      assert.equal(data.id, todo.id);

      // we expect the todo to be deleted
      // const deletedTodo = await Todo.findByPk(todo.id);
    });

    done();
  });
});
