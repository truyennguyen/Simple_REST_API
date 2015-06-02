'use strict';

var Book = require('../models/Book');
var bodyparser = require('body-parser');

module.exports = function(router){
	router.use(bodyparser.json());

	//Get all books
	router.get('/books', function(req, res){
		Book.find({}, function(err, data){
			if(err){
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json(data);
		});
	});

	//get books by id
	router.get("/books/:id", function(req, res) {
		Book.findById(req.params.id, function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: "internal server error"});
			}
			res.json(data);
		});
	});

	router.post('/books', function(req, res){
		var newBook = new Book(req.body);
		newBook.save(function(err, data){
			if(err){
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json(data);
		});
	});

	//update the book by id
	router.put('/books/:id', function(req, res){
		Book.findById(req.params.id, function(err, data){
			if(err){
				console.log(err);
				return res.status(500).json({msg: "internal server error"});
			}

			data.name = req.body.name;
			data.author = req.body.author;
			data.price = req.body.price;
			data.timeStamp = Date.now;
			data.save(function(err){
				if(err){
					console.log(err);
					return res.status(500).json({msg: "internal server error"});
				}
				res.json({msg:"The book with id " req.params.id + " is replaced!"});
			})
		});
	});

	router.delete('/books/:id', function(req, res){
		Book.remove({'_id': req.params.id}, function(err, data){
			if(err){
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json({msg: 'success'});
		});
	});
};