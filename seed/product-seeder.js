var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('mongodb://tanya:tanya15@ds231207.mlab.com:31207/shopping');

var products = [
	new Product({
		imagePath: 'images/product-1.png',
		title: 'RUFFLE PRINT DRESS',
		description: 'Price',
		price: 700
	}),
	new Product({
		imagePath: 'images/product-2.png',
		title: 'Boho PRINTED DRESS',
		description: 'Price',
		price: 560
	}),
	new Product({
		imagePath: 'images/product-3.png',
		title: 'TWO-TONE STRIPE DRESS',
		description: 'Price',
		price: 650
	}),
	new Product({
		imagePath: 'images/product-4.png',
		title: 'Jersy Print Maxi Dress',
		description: 'Price',
		price: 800
	}),
	new Product({
		imagePath: 'images/product-5.png',
		title: 'Floral Print Crisscross Dress',
		description: 'Price',
		price: 680
	}),
	new Product({
		imagePath: 'images/product-6.png',
		title: 'Chica Animal Print Dress',
		description: 'Price',
		price: 900
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