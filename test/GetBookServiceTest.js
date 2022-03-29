const  axios = require('axios');
const chai = require('chai');
const { assert } = require('chai');

const { expect } = chai;

describe ('Test GET request', async() => {

    //Arrange
    const apiCall = axios.create({
        baseURL: "https://a-books.herokuapp.com",
    });

    it('GET services complete the service correct', async() => {
        //Act
        const response = await apiCall.get('/books');

        //Assert
        expect(response.status).to.equal(200);
    });

    it('GET services should not return empty information', async() => {
        //Act
        const response = await apiCall.get('/books');

        //Assert
        expect(response.data).to.not.be.empty;
    });

    it('GET services should return all the books', async() => {
        //Act
        const responseGet1 = await apiCall.get('/books');
        const response = await apiCall.post('/books',{name:'NameGet', author:'AuthorGet'});
        const responseGet2 = await apiCall.get('/books');
    
        //Assert
        assert.isTrue(responseGet2.data.length > responseGet1.data.length);

        apiCall.delete('/books/' + response.data.id);
    });


});