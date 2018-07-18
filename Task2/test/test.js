var should = require('chai').should(),
    supertest = require('supertest'),
    app =require('../app');
//supertest(app) = supertest('http://localhost:5000');

const incorrectUserCredentials = {"user":{"email":"asasdadasq@b.com", "password":"asd3243sadasda"}};
const blankEmail = {"user":{"password":"asd3243sadasda"}};
const blankPassword = {"user":{"email":"asasdadasq@b.com"}};
const signUpUserCredentials = {"user":{"email":"q5esfdf5@b.com", "password":"asdsagfdgfqweqdasda"}}; //change everytime after running tests

describe('Testing User Api',function(){
    it('Testing signup - +ve', function(done){
        try
        {
            supertest(app).post('/user/signup')
            .send(signUpUserCredentials)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.user.should.have.property('userId');
                res.body.user.should.have.property('email');
                res.body.user.should.have.property('token');
                done();
                });
        }
        catch(error)
        {
            done(error);
        }
    });

    it('Testing login - +ve', function(done){
        supertest(app).post('/user/login')
        .send(signUpUserCredentials)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
        if (err) return done(err);
        res.body.user.should.have.property('email');
        done();
        });
    });

    it('Testing login - -ve', function(done){
        supertest(app).post('/user/login')
        .send(incorrectUserCredentials)
        .expect(400)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('Testing login - -ve blank-email', function(done){
        supertest(app).post('/user/login')
        .send(blankEmail)
        .expect(422)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('Testing login - -ve blank-password', function(done){
        supertest(app).post('/user/login')
        .send(blankPassword)
        .expect(422)
        .expect('Content-Type', /json/)
        .end(done);
    });

    

    it('Testing signup - -ve blank-email', function(done){
        supertest(app).post('/user/signup')
        .send(blankEmail)
        .expect(400)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('Testing signup - -ve blank-password', function(done){
        supertest(app).post('/user/signup')
        .send(blankPassword)
        .expect(400)
        .expect('Content-Type', /json/)
        .end(done);
    });
});