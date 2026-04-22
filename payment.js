// ========== DATA PRODUK LENGKAP (SESUAI MENU) ==========
const productsData = [
    // SPREAD 1: BREADS
    { id: 1, name: 'Salt Bread', price: 12000, category: 'Breads', icon: '🥖' },
    { id: 2, name: 'Coffee Bun', price: 15000, category: 'Breads', icon: '🥖' },
    { id: 3, name: 'Croissant', price: 18000, category: 'Breads', icon: '🥐' },
    
    // SPREAD 2: COOKIES
    { id: 4, name: 'Oreo', price: 10000, category: 'Cookies', icon: '🍪' },
    { id: 5, name: 'Lotus', price: 12000, category: 'Cookies', icon: '🍪' },
    { id: 6, name: 'Smores', price: 14000, category: 'Cookies', icon: '🍪' },
    { id: 7, name: 'Choco Chip', price: 11000, category: 'Cookies', icon: '🍪' },
    { id: 8, name: 'Matcha', price: 13000, category: 'Cookies', icon: '🍪' },
    
    // SPREAD 3: CHEESECAKE
    { id: 9, name: 'Chocolate Cheesecake', price: 28000, category: 'Cheesecake', icon: '🍰' },
    { id: 10, name: 'Strawberry Cheesecake', price: 28000, category: 'Cheesecake', icon: '🍰' },
    { id: 11, name: 'Lotus Cheesecake', price: 30000, category: 'Cheesecake', icon: '🍰' },
    
    // SPREAD 4: CUPCAKES
    { id: 12, name: 'Oreo Cupcake', price: 16000, category: 'Cupcakes', icon: '🧁' },
    { id: 13, name: 'Lotus Cupcake', price: 18000, category: 'Cupcakes', icon: '🧁' },
    { id: 14, name: 'Matcha Cupcake', price: 19000, category: 'Cupcakes', icon: '🧁' },
    { id: 15, name: 'Lemon Cupcake', price: 17000, category: 'Cupcakes', icon: '🧁' },
    
    // SPREAD 5: CAKES & SNACKS
    { id: 16, name: 'Brownies', price: 18000, category: 'Cakes & Snacks', icon: '🍫' },
    { id: 17, name: 'Cinnamon Rolls', price: 22000, category: 'Cakes & Snacks', icon: '🍩' },
    { id: 18, name: 'Croffle', price: 20000, category: 'Cakes & Snacks', icon: '🧇' },
    { id: 19, name: 'Tiramisu', price: 32000, category: 'Cakes & Snacks', icon: '🍰' },
    { id: 20, name: 'Churros', price: 15000, category: 'Cakes & Snacks', icon: '🍩' },
    { id: 21, name: 'Muffins', price: 14000, category: 'Cakes & Snacks', icon: '🧁' },
    { id: 22, name: 'Pretzels', price: 16000, category: 'Cakes & Snacks', icon: '🥨' },
    
    // SPREAD 6: COFFEE
    { id: 23, name: 'Matcha Latte', price: 24000, category: 'Coffee', icon: '🍵' },
    { id: 24, name: 'Americano', price: 20000, category: 'Coffee', icon: '☕' },
    { id: 25, name: 'Espresso', price: 22000, category: 'Coffee', icon: '☕' },
    { id: 26, name: 'Mocha Frappuccino', price: 28000, category: 'Coffee', icon: '☕' },
    { id: 27, name: 'Cappuccino', price: 25000, category: 'Coffee', icon: '☕' },
    
    // SPREAD 7: HOT DRINKS
    { id: 28, name: 'Hot Chocolate', price: 23000, category: 'Hot Drinks', icon: '🍫' },
    { id: 29, name: 'Caramel Macchiato', price: 27000, category: 'Hot Drinks', icon: '☕' },
    { id: 30, name: 'Air Mineral', price: 5000, category: 'Hot Drinks', icon: '💧' },
    
    // SPREAD 8: TEA & SHAKES
    { id: 31, name: 'Milk Tea', price: 22000, category: 'Tea & Shakes', icon: '🧋' },
    { id: 32, name: 'Mint Choco Shake', price: 30000, category: 'Tea & Shakes', icon: '🥤' },
    { id: 33, name: 'Chocolate Shake', price: 30000, category: 'Tea & Shakes', icon: '🥤' },
    { id: 34, name: 'Strawberry Shake', price: 30000, category: 'Tea & Shakes', icon: '🥤' },
    { id: 35, name: 'Vanilla Shake', price: 28000, category: 'Tea & Shakes', icon: '🥤' }
];

// ========== LOAD CART FROM localStorage ==========
let cart = JSON.parse(localStorage.getItem('bakeryCart')) || [];

// ========== PROMO CODES ==========
const promoCodes = {
    'BAKERY10': { discount: 0.1, message: '10% discount applied!' },
    'WELCOME20': { discount: 0.2, message: '20% welcome discount!' },
    'FREESHIP': { discount: 0.05, message: '5% discount applied!' }
};

let activePromo = null;
let discountAmount = 0;
let currentCategory = 'all';
let searchQuery = '';

// ========== SAVE CART ==========
function saveCart() {
    localStorage.setItem('bakeryCart', JSON.stringify(cart));
}

// ========== ESCAPE HTML ==========
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ========== FORMAT RUPIAH ==========
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID').format(angka);
}

// ========== SHOW TOAST ==========
function showToast(message, type) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast) return;
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    if (type === 'error') {
        toast.style.background = '#dc3545';
    } else if (type === 'info') {
        toast.style.background = '#17a2b8';
    } else {
        toast.style.background = '#28a745';
    }
    
    setTimeout(function() {
        toast.classList.remove('show');
        toast.style.background = '#28a745';
    }, 3000);
}

// ========== ADD TO CART ==========
function addToCart(productName, productPrice) {
    var existingItem = null;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === productName) {
            existingItem = cart[i];
            break;
        }
    }
    
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            qty: 1
        });
    }
    
    saveCart();
    updateCartDisplay();
    showToast(productName + ' added to cart!', 'success');
}

// ========== UPDATE CART DISPLAY ==========
function updateCartDisplay() {
    const container = document.getElementById('cartItemsContainer');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const discountEl = document.getElementById('discount');
    const discountRow = document.getElementById('discountRow');
    const totalEl = document.getElementById('total');
    const payBtn = document.getElementById('payButton');
    const payButtonSpan = payBtn ? payBtn.querySelector('span') : null;

    if (!cart || cart.length === 0) {
        if (container) {
            container.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-cart"></i><p>Your cart is empty</p><p style="font-size: 0.8rem; margin-top: 10px;">Click on products below to add</p></div>';
        }
        if (subtotalEl) subtotalEl.textContent = 'Rp 0';
        if (taxEl) taxEl.textContent = 'Rp 0';
        if (totalEl) totalEl.textContent = 'Rp 0';
        if (payBtn) payBtn.disabled = true;
        if (payButtonSpan) payButtonSpan.textContent = 'Cart Empty';
        discountAmount = 0;
        if (discountRow) discountRow.style.display = 'none';
        return;
    }

    let subtotal = 0;
    if (container) container.innerHTML = '';

    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var itemTotal = item.qty * item.price;
        subtotal += itemTotal;

        var cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = '<div class="item-info"><span class="item-name">' + escapeHtml(item.name) + '</span><span class="item-price">@ Rp ' + formatRupiah(item.price) + '</span></div><div class="item-quantity"><button class="qty-btn" onclick="changeQty(' + i + ', -1)">-</button><span class="item-qty">' + item.qty + '</span><button class="qty-btn" onclick="changeQty(' + i + ', 1)">+</button></div><div class="item-total">Rp ' + formatRupiah(itemTotal) + '</div><div class="remove-item" onclick="removeItem(' + i + ')"><i class="fas fa-trash"></i></div>';
        container.appendChild(cartItem);
    }

    var tax = subtotal * 0.1;
    
    if (activePromo) {
        discountAmount = subtotal * activePromo.discount;
        if (discountRow) discountRow.style.display = 'flex';
        if (discountEl) discountEl.textContent = 'Rp ' + formatRupiah(discountAmount);
    } else {
        discountAmount = 0;
        if (discountRow) discountRow.style.display = 'none';
    }
    
    var total = subtotal + tax - discountAmount;

    if (subtotalEl) subtotalEl.textContent = 'Rp ' + formatRupiah(subtotal);
    if (taxEl) taxEl.textContent = 'Rp ' + formatRupiah(tax);
    if (totalEl) totalEl.textContent = 'Rp ' + formatRupiah(total);

    if (payBtn) {
        payBtn.disabled = false;
        if (payButtonSpan) payButtonSpan.textContent = 'Pay Rp ' + formatRupiah(total);
    }
}

// ========== CHANGE QUANTITY ==========
function changeQty(index, delta) {
    if (cart[index]) {
        cart[index].qty += delta;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
        saveCart();
        updateCartDisplay();
    }
}

// ========== REMOVE ITEM ==========
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
    showToast('Item removed from cart', 'info');
}

// ========== CLEAR CART ==========
function clearCart() {
    if (confirm('Are you sure you want to clear your entire cart?')) {
        cart = [];
        activePromo = null;
        discountAmount = 0;
        saveCart();
        updateCartDisplay();
        var promoInput = document.getElementById('promoCode');
        if (promoInput) promoInput.value = '';
        var promoMessage = document.getElementById('promoMessage');
        if (promoMessage) promoMessage.innerHTML = '';
        showToast('Cart cleared', 'info');
    }
}

// ========== RENDER PRODUCT GRID ==========
function renderProductGrid() {
    var gridContainer = document.getElementById('productGrid');
    if (!gridContainer) return;
    
    var filteredProducts = productsData.filter(function(product) {
        var matchCategory = (currentCategory === 'all' || product.category === currentCategory);
        var matchSearch = (searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchCategory && matchSearch;
    });
    
    if (filteredProducts.length === 0) {
        gridContainer.innerHTML = '<div style="text-align: center; padding: 40px; color: #999;"><i class="fas fa-search" style="font-size: 40px; margin-bottom: 10px;"></i><p>No products found</p><p style="font-size: 0.8rem;">Try another keyword or category</p></div>';
        return;
    }
    
    gridContainer.innerHTML = '';
    for (var i = 0; i < filteredProducts.length; i++) {
        var product = filteredProducts[i];
        var productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('onclick', 'addToCart("' + product.name + '", ' + product.price + ')');
        productCard.innerHTML = '<div class="product-name">' + product.icon + ' ' + escapeHtml(product.name) + '</div><div class="product-price">Rp ' + formatRupiah(product.price) + '</div><div class="product-category">' + product.category + '</div>';
        gridContainer.appendChild(productCard);
    }
}

// ========== UPDATE SEARCH SUGGESTIONS ==========
function updateSearchSuggestions() {
    var searchInput = document.getElementById('productSearch');
    var suggestionsDiv = document.getElementById('searchSuggestions');
    
    if (!searchInput || !suggestionsDiv) return;
    
    var query = searchInput.value.toLowerCase();
    
    if (query.length === 0) {
        suggestionsDiv.classList.remove('show');
        return;
    }
    
    var matches = productsData.filter(function(product) {
        return product.name.toLowerCase().includes(query);
    }).slice(0, 8);
    
    if (matches.length === 0) {
        suggestionsDiv.classList.remove('show');
        return;
    }
    
    suggestionsDiv.innerHTML = '';
    for (var i = 0; i < matches.length; i++) {
        var match = matches[i];
        var suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.innerHTML = '<span class="suggestion-name">' + match.icon + ' ' + escapeHtml(match.name) + '</span><span class="suggestion-price">Rp ' + formatRupiah(match.price) + '</span>';
        suggestionItem.onclick = (function(product) {
            return function() {
                document.getElementById('productSearch').value = product.name;
                suggestionsDiv.classList.remove('show');
                addToCart(product.name, product.price);
            };
        })(match);
        suggestionsDiv.appendChild(suggestionItem);
    }
    suggestionsDiv.classList.add('show');
}

// ========== ADD MANUAL PRODUCT ==========
function addManualProduct() {
    var searchInput = document.getElementById('productSearch');
    var productName = searchInput.value.trim();
    
    if (!productName) {
        showToast('Please enter a product name!', 'error');
        return;
    }
    
    // Cari produk yang cocok
    var foundProduct = null;
    for (var i = 0; i < productsData.length; i++) {
        if (productsData[i].name.toLowerCase() === productName.toLowerCase()) {
            foundProduct = productsData[i];
            break;
        }
    }
    
    // Cari produk yang mirip (contains)
    if (!foundProduct) {
        for (var i = 0; i < productsData.length; i++) {
            if (productsData[i].name.toLowerCase().includes(productName.toLowerCase())) {
                foundProduct = productsData[i];
                break;
            }
        }
    }
    
    if (foundProduct) {
        addToCart(foundProduct.name, foundProduct.price);
        searchInput.value = '';
    } else {
        // Jika tidak ditemukan, minta input manual harga
        var manualPrice = prompt('Product "' + productName + '" not found. Enter price for this product (Rp):');
        if (manualPrice && !isNaN(parseInt(manualPrice))) {
            var price = parseInt(manualPrice);
            // Tambahkan ke keranjang langsung
            var existingItem = null;
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].name === productName) {
                    existingItem = cart[i];
                    break;
                }
            }
            if (existingItem) {
                existingItem.qty += 1;
            } else {
                cart.push({ name: productName, price: price, qty: 1 });
            }
            saveCart();
            updateCartDisplay();
            showToast('"' + productName + '" added to cart!', 'success');
            searchInput.value = '';
        } else {
            showToast('Product not found and price not entered!', 'error');
        }
    }
}

// ========== SET CATEGORY ==========
function setCategory(category) {
    currentCategory = category;


    
    
    var filterBtns = document.querySelectorAll('.filter-btn');
    for (var i = 0; i < filterBtns.length; i++) {
        if (filterBtns[i].dataset.category === category) {
            filterBtns[i].classList.add('active');
        } else {
            filterBtns[i].classList.remove('active');
        }
    }
    
    renderProductGrid();
}

// ========== GENERATE RECEIPT ==========
function generateReceipt(data) {
    var receiptDiv = document.getElementById('receiptContent');
    if (!receiptDiv) return;
    
    var now = new Date();
    var dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    var timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    
    var itemsHtml = '';
    for (var i = 0; i < data.items.length; i++) {
        var item = data.items[i];
        itemsHtml += '<div class="receipt-row"><span>' + escapeHtml(item.name) + ' x' + item.qty + '</span><span>Rp ' + formatRupiah(item.qty * item.price) + '</span></div>';
    }
    
    var discountHtml = '';
    if (data.discount > 0) {
        discountHtml = '<div class="receipt-row"><span>Discount</span><span style="color: #28a745;">-Rp ' + formatRupiah(data.discount) + '</span></div>';
    }
    
    var changeHtml = '';
    if (data.change) {
        changeHtml = '<div class="receipt-row"><span>Change</span><span>Rp ' + formatRupiah(data.change) + '</span></div>';
    }
    
    receiptDiv.innerHTML = '<div style="text-align: center;"><p><strong>STRUK PEMBAYARAN</strong></p><p>' + dateStr + '</p><p>' + timeStr + '</p><p><strong>' + data.orderNumber + '</strong></p></div><div class="receipt-divider"></div><div class="receipt-row"><span><strong>Customer:</strong></span><span>' + escapeHtml(data.customerName) + '</span></div><div class="receipt-row"><span><strong>Phone:</strong></span><span>' + escapeHtml(data.customerPhone) + '</span></div><div class="receipt-divider"></div>' + itemsHtml + '<div class="receipt-divider"></div><div class="receipt-row"><span>Subtotal</span><span>Rp ' + formatRupiah(data.subtotal) + '</span></div><div class="receipt-row"><span>Tax (10%)</span><span>Rp ' + formatRupiah(data.tax) + '</span></div>' + discountHtml + '<div class="receipt-row receipt-total"><span><strong>TOTAL</strong></span><span><strong>Rp ' + formatRupiah(data.total) + '</strong></span></div><div class="receipt-row"><span>Payment Method</span><span>' + data.paymentMethod + '</span></div>' + changeHtml;
}

// ========== PROCESS PAYMENT ==========
function processPayment() {
    if (!cart || cart.length === 0) {
        showToast('Cart is empty!', 'error');
        return false;
    }
    
    var customerName = document.getElementById('customerName') ? document.getElementById('customerName').value : '';
    var customerEmail = document.getElementById('customerEmail') ? document.getElementById('customerEmail').value : '';
    var customerPhone = document.getElementById('customerPhone') ? document.getElementById('customerPhone').value : '';
    
    if (!customerName || !customerPhone) {
        showToast('Please fill in name and phone number!', 'error');
        return false;
    }
    
    var activeMethod = document.querySelector('.method-card.active');
    var method = activeMethod ? activeMethod.dataset.method : 'card';
    
    var totalText = document.getElementById('total') ? document.getElementById('total').textContent : 'Rp 0';
    var total = parseInt(totalText.replace(/[^0-9]/g, '')) || 0;
    
    var paymentMethod = '';
    var change = 0;
    
    if (method === 'card') {
        var cardNum = document.getElementById('cardNumber') ? document.getElementById('cardNumber').value : '';
        if (!cardNum || cardNum.replace(/\s/g, '').length < 16) {
            showToast('Please enter valid card number!', 'error');
            return false;
        }
        paymentMethod = 'Credit Card';
    } else if (method === 'ewallet') {
        var ewalletPhone = document.getElementById('ewalletPhone') ? document.getElementById('ewalletPhone').value : '';
        if (!ewalletPhone) {
            showToast('Please enter registered phone number!', 'error');
            return false;
        }
        var selectedEwallet = document.querySelector('input[name="ewallet"]:checked');
        var ewalletType = selectedEwallet ? selectedEwallet.value : 'E-Wallet';
        paymentMethod = ewalletType;
    } else if (method === 'cash') {
        var cashAmount = parseInt(document.getElementById('cashAmount') ? document.getElementById('cashAmount').value : 0) || 0;
        if (cashAmount < total) {
            showToast('Insufficient cash! Need Rp ' + formatRupiah(total), 'error');
            return false;
        }
        change = cashAmount - total;
        paymentMethod = 'Cash';
    } else if (method === 'qris') {
        paymentMethod = 'QRIS';
    } else {
        paymentMethod = 'Other';
    }
    
    var subtotal = 0;
    for (var i = 0; i < cart.length; i++) {
        subtotal += cart[i].qty * cart[i].price;
    }
    var tax = subtotal * 0.1;
    var discount = discountAmount;
    var finalTotal = subtotal + tax - discount;
    
    var now = new Date();
    var orderNumber = 'ORD-' + now.getFullYear() + (now.getMonth()+1).toString().padStart(2,'0') + now.getDate().toString().padStart(2,'0') + '-' + Math.floor(Math.random() * 10000).toString().padStart(4,'0');
    
    var receiptData = {
        orderNumber: orderNumber,
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone,
        items: cart.slice(),
        subtotal: subtotal,
        tax: tax,
        discount: discount,
        total: finalTotal,
        paymentMethod: paymentMethod,
        change: change,
        date: now
    };
    
    generateReceipt(receiptData);
    
    var modal = document.getElementById('receiptModal');
    if (modal) modal.classList.add('active');
    
    cart = [];
    activePromo = null;
    discountAmount = 0;
    saveCart();
    updateCartDisplay();
    
    var form = document.getElementById('paymentForm');
    if (form) form.reset();
    
    var promoInput = document.getElementById('promoCode');
    if (promoInput) promoInput.value = '';
    var promoMessage = document.getElementById('promoMessage');
    if (promoMessage) promoMessage.innerHTML = '';
    
    showToast('Payment successful! Receipt generated.', 'success');
    
    return true;
}

// ========== CLOSE MODAL ==========
function closeModal() {
    var modal = document.getElementById('receiptModal');
    if (modal) modal.classList.remove('active');
}

// ========== FORMAT FUNCTIONS ==========
function formatCardNumber(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || '';
    var parts = [];
    for (var i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
        return parts.join(' ');
    } else {
        return value;
    }
}

function formatExpiry(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
        return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
    }
    return v;
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', function() {
    renderProductGrid();
    updateCartDisplay();
    
    // Clear cart button
    var clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            clearCart();
        });
    }
    
    // Search input events
    var searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchQuery = this.value;
            renderProductGrid();
            updateSearchSuggestions();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('searchSuggestions').classList.remove('show');
                addManualProduct();
            }
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            var suggestions = document.getElementById('searchSuggestions');
            if (suggestions && !searchInput.contains(e.target) && !suggestions.contains(e.target)) {
                suggestions.classList.remove('show');
            }
        });
    }
    
    // Add product button
    var addBtn = document.getElementById('addProductBtn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            addManualProduct();
        });
    }
    
    // Category filter buttons
    var filterBtns = document.querySelectorAll('.filter-btn');
    for (var i = 0; i < filterBtns.length; i++) {
        filterBtns[i].addEventListener('click', function() {
            setCategory(this.dataset.category);
        });
    }
    
    // Apply promo button
    var applyPromoBtn = document.getElementById('applyPromoBtn');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', function() {
            var promoInput = document.getElementById('promoCode');
            var promoCode = promoInput ? promoInput.value.trim().toUpperCase() : '';
            var promoMessage = document.getElementById('promoMessage');
            
            if (!promoCode) {
                if (promoMessage) {
                    promoMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter a promo code';
                    promoMessage.className = 'promo-message error';
                }
                return;
            }
            
            if (promoCodes[promoCode]) {
                activePromo = promoCodes[promoCode];
                if (promoMessage) {
                    promoMessage.innerHTML = '<i class="fas fa-check-circle"></i> ' + activePromo.message;
                    promoMessage.className = 'promo-message success';
                }
                updateCartDisplay();
                showToast('Promo applied! ' + activePromo.message, 'success');
            } else {
                if (promoMessage) {
                    promoMessage.innerHTML = '<i class="fas fa-times-circle"></i> Invalid promo code';
                    promoMessage.className = 'promo-message error';
                }
                activePromo = null;
                updateCartDisplay();
            }
        });
    }
    
    // Payment form submit
    var paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processPayment();
        });
    }
    
    // Payment method switch
    var methodBtns = document.querySelectorAll('.method-card');
    var cardDetails = document.getElementById('cardDetails');
    var ewalletDetails = document.getElementById('ewalletDetails');
    var cashDetails = document.getElementById('cashDetails');
    var qrisDetails = document.getElementById('qrisDetails');
    
    for (var i = 0; i < methodBtns.length; i++) {
        methodBtns[i].addEventListener('click', function() {
            for (var j = 0; j < methodBtns.length; j++) {
                methodBtns[j].classList.remove('active');
            }
            this.classList.add('active');
            
            var method = this.dataset.method;
            if (cardDetails) cardDetails.classList.remove('active');
            if (ewalletDetails) ewalletDetails.classList.remove('active');
            if (cashDetails) cashDetails.classList.remove('active');
            if (qrisDetails) qrisDetails.classList.remove('active');
            
            if (method === 'card' && cardDetails) cardDetails.classList.add('active');
            else if (method === 'ewallet' && ewalletDetails) ewalletDetails.classList.add('active');
            else if (method === 'cash' && cashDetails) cashDetails.classList.add('active');
            else if (method === 'qris' && qrisDetails) qrisDetails.classList.add('active');
        });
    }
    
    // Card number formatting
    var cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            e.target.value = formatCardNumber(e.target.value);
        });
    }
    
    // Expiry date formatting
    var expiryDate = document.getElementById('expiryDate');
    if (expiryDate) {
        expiryDate.addEventListener('input', function(e) {
            e.target.value = formatExpiry(e.target.value);
        });
    }
    
    // Cash amount calculation
    var cashAmount = document.getElementById('cashAmount');
    if (cashAmount) {
        cashAmount.addEventListener('input', function() {
            var totalText = document.getElementById('total') ? document.getElementById('total').textContent : 'Rp 0';
            var total = parseInt(totalText.replace(/[^0-9]/g, '')) || 0;
            var cash = parseInt(cashAmount.value) || 0;
            var change = cash - total;
            var changeDisplay = document.getElementById('changeDisplay');
            
            if (changeDisplay) {
                if (cash >= total && cash > 0) {
                    changeDisplay.innerHTML = '<i class="fas fa-money-bill-wave"></i> Change: Rp ' + formatRupiah(change);
                    changeDisplay.className = 'change-display positive';
                } else if (cash > 0 && cash < total) {
                    changeDisplay.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Shortage: Rp ' + formatRupiah(total - cash);
                    changeDisplay.className = 'change-display negative';
                } else {
                    changeDisplay.innerHTML = '';
                    changeDisplay.className = 'change-display';
                }
            }
        });
    }
    
    // Close modal on outside click
    window.onclick = function(event) {
        var modal = document.getElementById('receiptModal');
        if (event.target === modal) {
            closeModal();
        }
    };
});

// Make functions global for onclick handlers
window.addToCart = addToCart;
window.changeQty = changeQty;
window.removeItem = removeItem;
window.closeModal = closeModal;
window.setCategory = setCategory;