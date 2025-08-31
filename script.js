// Global state
let restaurants = [];
let currentRestaurant = null;
let cart = [];

// Sample data for demo
const sampleRestaurants = [
    {
        id: 1,
        name: "Tula's Restaurant",
        cuisine: "North Indian",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
        foodItems: [
            {
                id: 7,
                name: "Chole Samose",
                price: 120,
                description: "Crispy samosas served with spicy chickpea curry",
                image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop",
                category: "Appetizer"
            },
            {
                id: 8,
                name: "Chole Bhature",
                price: 180,
                description: "Fluffy deep-fried bread with spiced chickpea curry",
                image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=300&h=200&fit=crop",
                category: "Main Course"
            },
            {
                id: 9,
                name: "Samose",
                price: 60,
                description: "Golden crispy triangular pastries with spiced potato filling",
                image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop",
                category: "Snacks"
            },
            {
                id: 10,
                name: "Honey Chilli Potato",
                price: 160,
                description: "Crispy potato cubes tossed in sweet and spicy honey chilli sauce",
                image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=300&h=200&fit=crop",
                category: "Appetizer"
            },
            {
                id: 11,
                name: "Noodles",
                price: 140,
                description: "Stir-fried noodles with fresh vegetables and aromatic spices",
                image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop",
                category: "Main Course"
            },
            {
                id: 12,
                name: "Momos",
                price: 100,
                description: "Steamed dumplings filled with seasoned vegetables or chicken",
                image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=300&h=200&fit=crop",
                category: "Snacks"
            }
        ]
    },
    {
        id: 2,
        name: "Spice Garden",
        cuisine: "Indian",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
        foodItems: [
            {
                id: 1,
                name: "Butter Chicken",
                price: 350,
                description: "Creamy tomato-based curry with tender chicken pieces",
                image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=300&h=200&fit=crop",
                category: "Main Course"
            },
            {
                id: 2,
                name: "Biryani",
                price: 280,
                description: "Fragrant basmati rice with spiced meat and vegetables",
                image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=300&h=200&fit=crop",
                category: "Main Course"
            }
        ]
    },
    {
        id: 3,
        name: "Pasta Palace",
        cuisine: "Italian",
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
        foodItems: [
            {
                id: 3,
                name: "Margherita Pizza",
                price: 450,
                description: "Classic pizza with fresh mozzarella, tomatoes, and basil",
                image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
                category: "Main Course"
            },
            {
                id: 4,
                name: "Carbonara Pasta",
                price: 380,
                description: "Creamy pasta with bacon, eggs, and parmesan cheese",
                image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop",
                category: "Main Course"
            }
        ]
    },
    {
        id: 4,
        name: "Dragon Wok",
        cuisine: "Chinese",
        rating: 4.0,
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
        foodItems: [
            {
                id: 5,
                name: "Kung Pao Chicken",
                price: 320,
                description: "Spicy stir-fried chicken with peanuts and vegetables",
                image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=200&fit=crop",
                category: "Main Course"
            },
            {
                id: 6,
                name: "Fried Rice",
                price: 250,
                description: "Wok-fried rice with vegetables and choice of protein",
                image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop",
                category: "Main Course"
            }
        ]
    },
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    restaurants = [...sampleRestaurants];
    renderRestaurants();
    updateCartCount();
    
    // Add event listeners
    document.getElementById('restaurant-form').addEventListener('change', updateCurrentRestaurant);
    document.getElementById('food-form').addEventListener('submit', addFoodItem);
    document.getElementById('search-input').addEventListener('input', searchRestaurants);
});

// Navigation functions
function showUserView() {
    document.getElementById('user-view').classList.add('active');
    document.getElementById('restaurant-view').classList.remove('active');
    document.getElementById('user-nav').classList.add('active');
    document.getElementById('restaurant-nav').classList.remove('active');
    renderRestaurants();
}

function showRestaurantView() {
    document.getElementById('user-view').classList.remove('active');
    document.getElementById('restaurant-view').classList.add('active');
    document.getElementById('user-nav').classList.remove('active');
    document.getElementById('restaurant-nav').classList.add('active');
    renderMenuItems();
}

// Restaurant functions
function renderRestaurants() {
    const grid = document.getElementById('restaurants-grid');
    grid.innerHTML = '';
    
    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        card.onclick = () => openRestaurantModal(restaurant);
        
        card.innerHTML = `
            <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-image" onerror="this.src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'">
            <div class="restaurant-info">
                <div class="restaurant-name">${restaurant.name}</div>
                <div class="restaurant-cuisine">${restaurant.cuisine}</div>
                <div class="restaurant-rating">
                    <i class="fas fa-star"></i>
                    ${restaurant.rating}
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function openRestaurantModal(restaurant) {
    currentRestaurant = restaurant;
    document.getElementById('modal-restaurant-name').textContent = restaurant.name;
    
    const grid = document.getElementById('food-items-grid');
    grid.innerHTML = '';
    
    restaurant.foodItems.forEach(item => {
        const foodCard = document.createElement('div');
        foodCard.className = 'food-item';
        
        foodCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="food-image" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop'">
            <div class="food-name">${item.name}</div>
            <div class="food-description">${item.description}</div>
            <div class="food-price">₹${item.price}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${restaurant.id}, ${item.id})">
                Add to Cart
            </button>
        `;
        
        grid.appendChild(foodCard);
    });
    
    document.getElementById('restaurant-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('restaurant-modal').classList.remove('active');
}

function searchRestaurants() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = sampleRestaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.cuisine.toLowerCase().includes(query) ||
        restaurant.foodItems.some(item => 
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        )
    );
    
    restaurants = filtered;
    renderRestaurants();
}

// Restaurant dashboard functions
function updateCurrentRestaurant() {
    const name = document.getElementById('restaurant-name').value;
    const cuisine = document.getElementById('restaurant-cuisine').value;
    const rating = document.getElementById('restaurant-rating').value;
    const image = document.getElementById('restaurant-image').value;
    
    if (name && cuisine && rating) {
        // Find existing restaurant or create new one
        let restaurant = restaurants.find(r => r.name === name);
        if (!restaurant) {
            restaurant = {
                id: restaurants.length + 1,
                name: name,
                cuisine: cuisine,
                rating: parseFloat(rating),
                image: image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
                foodItems: []
            };
            restaurants.push(restaurant);
        } else {
            restaurant.cuisine = cuisine;
            restaurant.rating = parseFloat(rating);
            if (image) restaurant.image = image;
        }
        
        currentRestaurant = restaurant;
        renderMenuItems();
    }
}

function addFoodItem(e) {
    e.preventDefault();
    
    const name = document.getElementById('food-name').value;
    const price = document.getElementById('food-price').value;
    const category = document.getElementById('food-category').value;
    const image = document.getElementById('food-image').value;
    const description = document.getElementById('food-description').value;
    
    if (!name || !price || !category || !description) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (!currentRestaurant) {
        alert('Please fill in restaurant information first');
        return;
    }
    
    const foodItem = {
        id: Date.now(),
        name: name,
        price: parseInt(price),
        category: category,
        image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
        description: description
    };
    
    currentRestaurant.foodItems.push(foodItem);
    
    // Clear form
    document.getElementById('food-form').reset();
    
    // Update display
    renderMenuItems();
    
    // Show success message
    alert('Food item added successfully!');
}

function renderMenuItems() {
    const container = document.getElementById('menu-items');
    container.innerHTML = '';
    
    if (!currentRestaurant || currentRestaurant.foodItems.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">No menu items yet. Add some food items to get started!</p>';
        return;
    }
    
    currentRestaurant.foodItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        
        menuItem.innerHTML = `
            <button class="delete-btn" onclick="deleteFoodItem(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
            <img src="${item.image}" alt="${item.name}" class="menu-item-image" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop'">
            <div class="menu-item-name">${item.name}</div>
            <div class="menu-item-description">${item.description}</div>
            <div class="menu-item-price">₹${item.price}</div>
        `;
        
        container.appendChild(menuItem);
    });
}

function deleteFoodItem(itemId) {
    if (confirm('Are you sure you want to delete this item?')) {
        currentRestaurant.foodItems = currentRestaurant.foodItems.filter(item => item.id !== itemId);
        renderMenuItems();
    }
}

// Cart functions
function addToCart(restaurantId, itemId) {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    const item = restaurant.foodItems.find(i => i.id === itemId);
    
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            restaurantName: restaurant.name,
            quantity: 1
        });
    }
    
    updateCartCount();
    renderCartItems();
    
    // Show brief success feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Added!';
    btn.style.background = '#28a745';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '#e23744';
    }, 1000);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    renderCartItems();
}

function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartCount();
            renderCartItems();
        }
    }
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <p>Add some delicious items!</p>
            </div>
        `;
        document.getElementById('cart-total').textContent = '0';
        return;
    }
    
    container.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop'">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
        `;
        
        container.appendChild(cartItem);
    });
    
    document.getElementById('cart-total').textContent = total;
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (sidebar.classList.contains('active')) {
        renderCartItems();
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('restaurant-modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        if (document.getElementById('cart-sidebar').classList.contains('active')) {
            toggleCart();
        }
    }
});

// Add some demo data on load
window.addEventListener('load', function() {
    // Auto-fill restaurant form with demo data
    setTimeout(() => {
        if (restaurants.length === 3) { // Only if we have sample data
            document.getElementById('restaurant-name').value = 'Cafe Delight';
            document.getElementById('restaurant-cuisine').value = 'American';
            document.getElementById('restaurant-rating').value = '4.2';
            document.getElementById('restaurant-image').value = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop';
            updateCurrentRestaurant();
        }
    }, 1000);
});
