// Task 1 - Product Class
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

const prod1 = new Product("Laptop", 101, 1200, 10);
console.log(prod1.getDetails());
prod1.updateStock(3);
console.log(prod1.getDetails());