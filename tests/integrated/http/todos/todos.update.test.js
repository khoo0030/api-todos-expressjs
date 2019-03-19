process.env.NODE_ENV = "test";

let app = require('../../../../index');
const {Todo} = require('../../../../models');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const path = '/api/v1/todos';

let todo;

describe('/PUT update todos', () => {
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

  it('it should update a todo', function (done) {
    // given a todo created earlier
    // when we call the endpoint to update the todo
    chai.request(app)
    .put(`${path}/${todo.id}`)
    .send({
      title: 'new title'
    })
    .end((err, res) => {
      // we expect a 200 http response
      assert.equal(res.status, 200);

      // we expect to get back the todo
      let data = res.body;
      assert.equal(data.id, todo.id);
      assert.equal(data.title, 'new title');
    });

    done();
  });
});
