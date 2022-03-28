const agent = require('superagent');
const chai = require('chai');
const { assert } = require('chai');

const { expect } = chai;

describe ('Test POST request', async() => {

    let baseUri = 'http://localhost:8080/books';
    let dummy = {name:'test', author:'test'};

    it('POST service properly creates a new book', async() => {
        // Act
        const response = await agent.post(baseUri).send(dummy);

        //Assert
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('id');
        assert.equal(response.body.name, dummy.name);
        assert.equal(response.body.author, dummy.author);

        //delete tracks
        agent.delete(baseUri + '/' + response.body.id);
    });

});