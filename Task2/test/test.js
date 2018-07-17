var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest('http://localhost:5000');

const correctUserCredentials = {"user":{"email":"asq@b.com", "password":"asdsadasda"}};
const incorrectUserCredentials = {"user":{"email":"asasdadasq@b.com", "password":"asd3243sadasda"}};
const blankEmail = {"user":{"password":"asd3243sadasda"}};
const blankPassword = {"user":{"email":"asasdadasq@b.com"}};
const signUpUserCredentials = {"user":{"email":"q55@b.com", "password":"asdsagfdgfqweqdasda"}}; //change everytime after running tests

describe('Testing User Api',function(){
    it('Testing login - +ve', function(done){
        api.post('/user/login')
        .send(correctUserCredentials)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
        if (err) return done(err);
        res.body.user.should.have.property('email');
        done();
        });
    });

    it('Testing login - -ve', function(done){
        api.post('/user/login')
        .send(incorrectUserCredentials)
        .expect(400)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('Testing login - -ve blank-email', function(done){
        api.post('/user/login')
        .send(blankEmail)
        .expect(422)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('Testing login - -ve blank-password', function(done){
        api.post('/user/login')
        .send(blankPassword)
        .expect(422)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('Testing signup - +ve', function(done){
        api.post('/user/signup')
        .send(signUpUserCredentials)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            if (err) return done(err);
            console.log(res);
            res.body.user.should.have.property('userId');
            res.body.user.should.have.property('email');
            res.body.user.should.have.property('token');
            done();
            });
    });

    it('Testing signup - -ve blank-email', function(done){
        api.post('/user/signup')
        .send(blankEmail)
        .expect(400)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('Testing signup - -ve blank-password', function(done){
        api.post('/user/signup')
        .send(blankPassword)
        .expect(400)
        .expect('Content-Type', /json/)
        .end(done);
    });
});