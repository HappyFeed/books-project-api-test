const  axios = require('axios');
const chai = require('chai');
const { assert } = require('chai');

const { expect } = chai;

describe ('Test POST request', async() => {

    //Arrange
    const apiCall = axios.create({
        baseURL: "http://localhost:8080",
    });
    const dummy = {name:'dummyTitle', author:'dummyAuthor'};

    it('POST services creates a book', async() => {
        //Act
        const response = await apiCall.post('/books',dummy);

        //Assert
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('id');
        assert.equal(response.data.name, dummy.name);
        assert.equal(response.data.author, dummy.author);

        apiCall.delete('/books/' + response.data.id);

    });

    it('POST services may not creates a empty book', async() => {
        //Act
        const response = await apiCall.post('/books',{});

        //Assert
        expect(response.status).to.equal(400);
        apiCall.delete('/books/' + response.data.id);
    });

    it('POST services may not creates a book with name field empty', async() => {
        //Act
        const response = await apiCall.post('/books',{name:'', author:'AuthorNameEmpty'});
        
        //Assert
        expect(response.status).to.equal(400);
        apiCall.delete('/books/' + response.data.id);
    });

    it('POST services may not creates a book with author field empty', async() => {
        //Act
        const response = await apiCall.post('/books',{name:'NameAuthorEmpty', author:''});
        
        //Assert
        expect(response.status).to.equal(400);
        apiCall.delete('/books/' + response.data.id);
    });

    it('POST services may not creates a book with incomplete data', async() => {
        //Act
        const response = await apiCall.post('/books',{author:'AuthorNameNull'});
        
        //Assert
        expect(response.status).to.equal(400);
        apiCall.delete('/books/' + response.data.id);
    });


});