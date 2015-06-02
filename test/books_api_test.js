'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/Books_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

var Book = require('../models/Book');

describe('Books REST api tests', function() {
  before(function(done){
    var newBook = new Book({name: "Learn JavaScript", author: "Nathan R", price: "100", timeStamp: Date.now});
    newBook.save(function(err, data){
      if(err)
        throw err;
      this.newBook = data;
      done();
    }.bind(this));
  });


  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to make a Book in a beforeEach block', function() {
    expect(this.testBook.BookBody).to.eql('test Book');
    expect(this.testBook).to.have.property('_id');
  });

  it("should response to POST request", function(done){
    chai.request("localhost:3000")
      .post("/api/books")
      .send({name: "Learn Full Stack", author: "Dave G"})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.name).to.eql("Learn Full Stack");
        expect(res.body.author).to.eql("Dave G");
        done();
      });
  });

  it("should get an array of books", function(done){
    chai.request("localhost:3000")
      .get("/api/books")
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql("object");
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it("should replace existing file", function(done){
    var id = this.newBook._id;
    chai.request("localhost:3000")
      .put("/api/books" + id)
      .send({name: "Learn At CodeFellows", author: "Granssci G"})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql("The book with id " id + " is replaced!");
        done();
      });
  });

  it("should delete a book", function(done){
    var id = this.newBook._id;
    chai.request("localhost:3000")
      .delete("/api/books" + id)
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql("success");
        done();
      });
  });
});