const  axios = require('axios');
const chai = require('chai');
const { assert } = require('chai');

const { expect } = chai;

describe ('Test POST request', async() => {

    const apiCall = axios.create({
        baseURL: "http://localhost:8080",
    });

    const dummy = {name:'dummyTitle', author:'dummyAuthor'};

    it('POST services creates a book', async() => {
        
        const response = await apiCall.post('/books',dummy);
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('id');
        assert.equal(response.data.name, dummy.name);
        assert.equal(response.data.author, dummy.author);

        apiCall.delete('/books/' + response.data.id);

    });

    it('POST services may not creates a empty book', async() => {
        
        const response = await apiCall.post('/books',{});
        expect(response.status).to.equal(400);

        apiCall.delete('/books/' + response.data.id);
    });

    it('POST services may not creates a book with name field empty', async() => {
        
        const response = await apiCall.post('/books',{name:'', author:'AuthorNameEmpty'});
        expect(response.status).to.equal(400);

        apiCall.delete('/books/' + response.data.id);
    });

    it('POST services may not creates a book with author field empty', async() => {
        
        const response = await apiCall.post('/books',{name:'NameAuthorEmpty', author:''});
        expect(response.status).to.equal(400);

        apiCall.delete('/books/' + response.data.id);
    });

    it('POST services may not creates a book with incomplete data', async() => {
        
        const response = await apiCall.post('/books',{author:'AuthorNameNull'});
        expect(response.status).to.equal(400);

        apiCall.delete('/books/' + response.data.id);
    });


});