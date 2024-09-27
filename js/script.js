// Product Class
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// Shopping Cart Item Class
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    // Method to calculate total price of the item
    totalPrice() {
        return this.product.price * this.quantity;
    }
}

// Shopping Cart Class
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    // Method to add items to the cart
    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
    }

    // Method to remove items from the cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    // Method to get the total price of items in the cart
    getTotal() {
        return this.items.reduce((total, item) => total + item.totalPrice(), 0);
    }

    // Method to display cart items
    displayItems() {


        // Update total price display
        const totalPriceElement = document.querySelector('.total');
        totalPriceElement.innerText = `${this.getTotal()} $`;
    }
}

// Instantiate Products
const basket = new Product(1, 'Baskets', 100);
const socks = new Product(2, 'Socks', 20);
const bag = new Product(3, 'Bag', 50);

// Instantiate Shopping Cart
const shoppingCart = new ShoppingCart();

// Event Listeners for Adding Products
document.querySelectorAll('.fa-plus-circle').forEach((button, index) => {
    button.addEventListener('click', () => {
        let quantitySpan = button.nextElementSibling;
        let currentQuantity = parseInt(quantitySpan.textContent) || 0;
        currentQuantity += 1;
        quantitySpan.textContent = currentQuantity;

        switch (index) {
            case 0: shoppingCart.addItem(basket, 1); break; // Baskets
            case 1: shoppingCart.addItem(socks, 1); break; // Socks
            case 2: shoppingCart.addItem(bag, 1); break;   // Bag
        }
        shoppingCart.displayItems();
    });
});

// Event Listeners for Decreasing Quantity
document.querySelectorAll('.fa-minus-circle').forEach((button, index) => {
    button.addEventListener('click', () => {
        let quantitySpan = button.previousElementSibling;
        let currentQuantity = parseInt(quantitySpan.textContent) || 0;
        if (currentQuantity > 0) {
            currentQuantity -= 1;
            quantitySpan.textContent = currentQuantity;

            switch (index) {
                case 0: shoppingCart.removeItem(basket.id); break; // Baskets
                case 1: shoppingCart.removeItem(socks.id); break; // Socks
                case 2: shoppingCart.removeItem(bag.id); break;   // Bag
            }
            shoppingCart.displayItems();
        }
    });
});

// Event Delegation for Removing Items
document.querySelector('.list-products').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
        const productId = parseInt(event.target.dataset.id);
        shoppingCart.removeItem(productId);
        shoppingCart.displayItems();
    }
});
