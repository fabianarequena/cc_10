// Task 1 - Creating a Product Class
// This class represents a product with properties: name, ID, price, and stock
// It has methods to get product details and update stock when an order is placed

class Product {
    constructor(name, id, price, stock) {
        if (price < 0 || stock < 0) {
            throw new Error("Price and stock must be non-negative values.");
        }
        this.name = name;
        this.id = id;
        this.price = price;
        this.stock = stock;
    }

    // Returns product details as a formatted string
    getDetails() {
        return `Product: ${this.name}, ID: ${this.id}, Price: $${this.price}, Stock: ${this.stock}`;
    }

    // Updates stock after an order is placed
    updateStock(quantity) {
        if (quantity > this.stock) {
            console.log("Not enough stock available.");
            return;
        }
        this.stock -= quantity;
    }
}

// Test Cases for Task 1
const prod1 = new Product("Laptop", 101, 1200, 10);
console.log(prod1.getDetails()); 
// Expected output: "Product: Laptop, ID: 101, Price: $1200, Stock: 10"

prod1.updateStock(3);
console.log(prod1.getDetails()); 
// Expected output: "Product: Laptop, ID: 101, Price: $1200, Stock: 7"


// Task 2 - Creating an Order Class
// This class represents an order with order ID, product, quantity, and total price.
// It checks stock before placing an order and updates the product's stock accordingly.

class Order {
    constructor(orderId, product, quantity) {
        if (quantity < 0) {
            throw new Error("Quantity must be a non-negative value.");
        }
        if (product.stock < quantity) {
            console.log("Order cannot be placed due to insufficient stock.");
            return;
        }
        this.orderId = orderId;
        this.product = product;
        this.quantity = quantity;
        this.totalPrice = product.price * quantity;
        product.updateStock(quantity);
    }

    // Returns order details as a formatted string
    getOrderDetails() {
        return `Order ID: ${this.orderId}, Product: ${this.product.name}, Quantity: ${this.quantity}, Total Price: $${this.totalPrice}`;
    }
}

// Test Cases for Task 2
const order1 = new Order(501, prod1, 2);
console.log(order1.getOrderDetails()); 
// Expected output: "Order ID: 501, Product: Laptop, Quantity: 2, Total Price: $2400"

console.log(prod1.getDetails()); 
// Expected output: "Product: Laptop, ID: 101, Price: $1200, Stock: 5" (Stock reduced)


// Task 3 - Creating an Inventory Class
// This class manages a collection of products and allows adding new products to the inventory.
// It also provides a method to list all products in inventory.

class Inventory {
    constructor() {
        this.products = [];
        this.orders = [];
    }

    // Adds a new product to the inventory
    addProduct(product) {
        this.products.push(product);
    }

    // Lists all products in the inventory
    listProducts() {
        this.products.forEach(product => console.log(product.getDetails()));
    }
}

// Test Cases for Task 3
const inventory = new Inventory();
inventory.addProduct(prod1);
inventory.listProducts();
// Expected output: "Product: Laptop, ID: 101, Price: $1200, Stock: 5"


// Task 4 - Implementing Order Management
// Added functionality to place orders, ensuring stock is available before processing.
// Also lists all orders placed so far.

Inventory.prototype.placeOrder = function(orderId, product, quantity) {
    if (quantity < 0) {
        console.log("Quantity must be a non-negative value.");
        return;
    }
    if (product.stock >= quantity) {
        const order = new Order(orderId, product, quantity);
        if (order.orderId) this.orders.push(order);
    } else {
        console.log("Insufficient stock to place order.");
    }
};

Inventory.prototype.listOrders = function() {
    this.orders.forEach(order => console.log(order.getOrderDetails()));
};

// Test Cases for Task 4
inventory.placeOrder(601, prod1, 2);
inventory.listOrders();
// Expected output: "Order ID: 601, Product: Laptop, Quantity: 2, Total Price: $2400"
console.log(prod1.getDetails());

