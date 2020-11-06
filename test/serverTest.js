const request = require('supertest');
const server = require('../index');


describe('API tests', ()=>{
    let api;
    //This is our test data.
    let testFood = {
        "name": "Pizza",
        "size": "large",
        "price": 10
    };

    let dupFood = {name : "ChocolateCake", size : "large", price : 15};

    before(()=>{
        //We start the server here.
        api = server.listen(5000, ()=> console.log('\nTesting server has started\n'));
    })

    after(done => {
        //We need to close the server here after test
        console.log('\nTesting server has been closed\n');
        api.close(done);
    })

    /*Tests:
    1. check status of server is 200 with root '/'.
    2. check server GET '/foods'.
    3. check server POST test data '/foods'.
    4. check page does not exist '/notFood' status 404.
    5. check menu does not have duplicate food of same size '/food'.
    */

    it('responds server status 200 with /', done =>{
        request(api)
            .get('/')
            .expect(200, done);
    });

    it('responds to get /foods', done =>{
        request(api)
            .get('/foods')
            .expect(200, done);
    });

    it('responds to post /foods', done=>{
        request(api)
            .post('/foods')
            .send(testFood)
            .expect({id: 5, ...testFood})
            .expect(201, done);
    });

    it('404 everything else', done=>{
        request(api)
            .get('/bob')
            .expect(404, done);
    });

    it('does not take duplicate food with same size', done=>{
        request(api)
            .post('/foods')
            .send(dupFood)
            .expect('Food alread exists in the menu')
            .expect(400, done);
    });
})