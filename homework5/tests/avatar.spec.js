const request = require('supertest');
const app = require('../app')
const path = require('path')
require('../bin/server')
describe('Patch /api/users/avatars', () => {
    it('no valid token', (done) => {
        request(app)
            .patch('/api/users/avatars')
            .expect(401, done);
    });
    it('is done', (done) => {
        request(app)
            .patch('/api/users/avatars')
            .set({
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmE4YWJmZjRkMWFlYjVlYTQ0ZjA2MSIsImlhdCI6MTYzNDM3NDc5Nn0.nyyKogdo915DAwKdAxwNQFhtTcrbR8UDq7OLlOQWkIc',
                'Content-Type': 'multipart/form-data'
            })
            .attach('avatar', path.resolve(__dirname, '../temp/616a8abff4d1aeb5ea44f061.jpg'))
            .expect(201)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body.data.result).toHaveProperty('email' , 'subscription' , 'avatarUrl' , '_id');
                return done();
            });
    });
});
