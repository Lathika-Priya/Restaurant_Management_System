document.addEventListener('DOMContentLoaded', () => {
    // Get the cart data from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Function to render cart items
    function renderCartItems() {
        // Clear the cart container first
        cartContainer.innerHTML = '';

        // If cart is empty, show a message
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            totalPriceElement.textContent = '0';
            return;
        }

        let totalPrice = 0;

        // Loop through the cart items and create the HTML for each
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                        <p>$${item.price} x ${item.quantity}</p>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button class="increase-btn" data-id="${item.id}">+</button>
                    <button class="decrease-btn" data-id="${item.id}">-</button>
                    <button class="remove-btn" data-id="${item.id}">Remove</button>
                </div>
            `;

            // Update total price
            totalPrice += item.price * item.quantity;

            // Append item to cart container
            cartContainer.appendChild(itemElement);
        });

        // Update the total price in the cart summary
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    // Event listeners for increase, decrease, and remove buttons
    cartContainer.addEventListener('click', (e) => {
        const target = e.target;
        const itemId = target.getAttribute('data-id');

        if (target.classList.contains('increase-btn')) {
            // Increase item quantity
            updateItemQuantity(itemId, 1);
        } else if (target.classList.contains('decrease-btn')) {
            // Decrease item quantity
            updateItemQuantity(itemId, -1);
        } else if (target.classList.contains('remove-btn')) {
            // Remove item from cart
            removeItemFromCart(itemId);
        }
    });

    // Function to update item quantity
    function updateItemQuantity(id, delta) {
        const itemIndex = cart.findIndex(item => item.id === id);
        if (itemIndex >= 0) {
            // Update quantity and ensure it doesn't go below 1
            cart[itemIndex].quantity = Math.max(1, cart[itemIndex].quantity + delta);

            // Save updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems(); // Re-render cart items
        }
    }

    // Function to remove item from cart
    function removeItemFromCart(id) {
        cart = cart.filter(item => item.id !== id);

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems(); // Re-render cart items
    }

    // Initial render of cart items
    renderCartItems();
    console.log(localStorage.getItem('cart'));
});