const  axios = require('axios');
const chai = require('chai');
const { assert } = require('chai');

const { expect } = chai;

describe ('Test DELETE request', async() => {

    //Arrange
    const apiCall = axios.create({
        baseURL: "http://localhost:8080",
    });
    const dummy = {name:'dummyDelete', author:'dummyAuthorDelete'};

    it('DELETE services remove the book from the store', async() => {
        //Act
        const response = await apiCall.post('/books',dummy);
        apiCall.delete('/books/' + response.data.id).then( () => {
            const responseGet = apiCall.get('/books');
            responseGet.data.map((book)=>{
                //Assert
                expect(book.id).to.not.equal(response.data.id);
            });
        });
    });

});