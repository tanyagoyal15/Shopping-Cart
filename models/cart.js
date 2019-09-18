module.exports = function Cart(oldCart) {
	this.items = oldCart.items || {}; // if there is no old cart(initially)then we take an empty array in the beginning
	this.totalQty = oldCart.totalQty || 0; 
	this.totalPrice = oldCart.totalPrice || 0; 

	this.add = function(item, id) { // to add new items to cart
		var storedItem = this.items[id];  
		if(!storedItem) {  
			storedItem = this.items[id] = {item: item, qty : 0 , price: 0}; 
		} 
		storedItem.qty++; 
		storedItem.price = storedItem.item.price * storedItem.qty; 
		this.totalQty++; 
		this.totalPrice += storedItem.item.price; 
	}

	this.incrementByOne = function (id) {
		this.items[id].qty++;
		this.items[id].price += this.items[id].item.price;
		this.totalQty++;
		this.totalPrice += this.items[id].item.price;
	};

	this.reduceByOne = function(id) {
		this.items[id].qty--;
		this.items[id].price -= this.items[id].item.price;
		this.totalQty--;
		this.totalPrice -= this.items[id].item.price;

		if(this.items[id].qty <= 0) {
			delete this.items[id];
		}
	};

	this.removeItem = function(id) {
		this.totalQty -= this.items[id].qty;
		this.totalPrice -= this.items[id].price;
		delete this.items[id];
	}

	this.generateArray = function() { // it will give cart items as array
		var arr = []; 
		for(var id in this.items) { 
			arr.push(this.items[id]); 
		}
		return arr;
	};
};