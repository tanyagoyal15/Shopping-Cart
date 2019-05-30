var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping');

var products = [
	new Product({
		imagePath: 'images/pic1.jpg',
		title: 'Chinese Laundry Queen',
		description: 'Price',
		price: 30
	}),
	new Product({
		imagePath: 'images/pic2.jpg',
		title: 'Italian Shoemakers Bade Sandals',
		description: 'Price',
		price: 40
	}),
	new Product({
		imagePath: 'images/pic3.jpg',
		title: 'Solanz Ellie Wedge Sandals',
		description: 'Price',
		price: 25
	}),
	new Product({
		imagePath: 'images/pic4.jpg',
		title: 'Vintage 7 Eight Kristen Wedge Sandals',
		description: 'Price',
		price: 30
	}),
	new Product({
		imagePath: 'images/pic5.jpg',
		title: ' Y-Not Herald Wedge Sandals',
		description: 'Price',
		price: 45
	}),
	new Product({
		imagePath: 'images/pic6.jpg',
		title: 'Makalu Lucila Strappy Wedge Sandals',
		description: 'Price',
		price: 40
	})
	];

	var done =0; 
	for(var i = 0; i < products.length; i++) {
		products[i].save(function(err, result) {
			done++;
			if(done === products.length) {
				exit();
			}
		});
	}

function exit() {
	mongoose.disconnect();
}