var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('Testing Basic Api',function(){
    it('Testing first get', function(done){
        api.get('/').expect(200).expect('Content-Type', /json/).expect({status: 'success'},done);
    });

    var postObj = {data: 'heheheh'};
    
    it('Testing second get-1', function(done){
        api.get('/data').expect(400,done);
    });
    it('Testing Post--Negative-1',function(done)
    {
       api.post('/data').send().set('Accept', 'application/json').expect(400,done);
    });

    it('Testing Post--Negative-2',function(done)
    {
       api.post('/data').send({data:1}).set('Accept', 'application/json').expect(400,done);
    });

    it('Testing Post--Negative-3',function(done)
    {
       api.post('/data').send({data:{"asd":"asdasd"}}).set('Accept', 'application/json').expect(400,done);
    });

    it('Testing Post',function(done)
    {
       api.post('/data').send(postObj).set('Accept', 'application/json').expect(200).expect(postObj,done);
    });

    it('Testing Post--Negative-3-4',function(done)
    {
       api.post('/data').send({data:{"asd":"asdasd"}}).set('Accept', 'application/json').expect(400,done);
    });

    

    it('Testing second get', function(done){
        api.get('/data').expect(200).expect('Content-Type', /json/).expect(postObj,done);
    });
});