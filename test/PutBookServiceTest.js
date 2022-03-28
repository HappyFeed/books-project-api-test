const  axios = require('axios');
const chai = require('chai');
const { assert } = require('chai');

const { expect } = chai;

describe ('Test PUT request', async() => {

    const apiCall = axios.create({
        baseURL: "http://localhost:8080",
    });

    const dummy = {name:'dummyPutPrueba1', author:'dummyAuthorPutPrueba1'};

    it('PUT services update the object', async() => {
        
        const response = await apiCall.post('/books',dummy);
        const responsePut = await apiCall.put('/books/'+ response.data.id, {name:"dummyPutPrueba2", author:"dummyAuthorPutPrueba2"});

        expect(response.data.name).to.not.equal(responsePut.data.name);
        expect(response.data.author).to.not.equal(responsePut.data.author);

        apiCall.delete('/books/' + response.data.id);
    });

    it('PUT services update the object instead of created a new object', async() => {
        
        const response = await apiCall.post('/books',dummy);
        const responsePut = await apiCall.put('/books/'+ response.data.id, {name:"dummyPutPrueba2", author:"dummyAuthorPutPrueba2"});

        expect(response.data.id).to.equal(responsePut.data.id);

        apiCall.delete('/books/' + response.data.id);
    });

    it('PUT services update the object with empty data', async() => {
        
        const response = await apiCall.post('/books',dummy);
        const responsePut = await apiCall.put('/books/'+ response.data.id, {name:"", author:""});

        expect(responsePut.status).to.not.equal(200);

        apiCall.delete('/books/' + response.data.id);
    });

    it('PUT services update the object with null data', async() => {
        
        const response = await apiCall.post('/books',dummy);
        const responsePut = await apiCall.put('/books/'+ response.data.id, {});

        expect(responsePut.status).to.not.equal(200);

        apiCall.delete('/books/' + response.data.id);
    });

});