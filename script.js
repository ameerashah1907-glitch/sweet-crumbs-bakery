let selectedProduct = {};

// 1. ADMIN FUNCTIONALITY
function toggleAdmin() {
    let pass = prompt("Enter Admin Password:");
    if (pass === "bakery123") {
        document.getElementById('adminPanel').style.display = "block";
        window.scrollTo(0,0);
    }
}

function addNewProductToShop() {
    const name = document.getElementById('itemName').value;
    const price = document.getElementById('itemPrice').value;
    const desc = document.getElementById('itemDesc').value;
    const img = document.getElementById('itemImg').value;

    if(!name || !price || !img) return alert("Please provide Name, Price, and Image URL.");

    const gallery = document.getElementById('productGallery');
    const newDiv = document.createElement('div');
    newDiv.className = 'card';
    newDiv.onclick = function() { openProduct(name, price, desc, img); };
    
    newDiv.innerHTML = `
        <img src="${img}">
        <div class="card-info">
            <h3>${name}</h3>
            <p class="price-tag">Rs. ${price}</p>
        </div>
    `;

    gallery.appendChild(newDiv);
    document.getElementById('adminPanel').style.display = "none";
    alert("New product added to menu!");
}

// 2. MODAL FLOW (VIEW -> CHECKOUT)
function openProduct(name, price, desc, img) {
    selectedProduct = { name, price };
    document.getElementById('modalName').innerText = name;
    document.getElementById('modalPrice').innerText = "Rs. " + price;
    document.getElementById('modalDesc').innerText = desc;
    document.getElementById('modalImg').src = img;
    
    showProduct(); // Show product info first
    document.getElementById('productModal').style.display = "block";
}

function showCheckout() {
    document.getElementById('step1').style.display = "none";
    document.getElementById('step2').style.display = "block";
}

function showProduct() {
    document.getElementById('step1').style.display = "block";
    document.getElementById('step2').style.display = "none";
}

function closeModal() {
    document.getElementById('productModal').style.display = "none";
}

// 3. WHATSAPP AUTO-MESSAGE GENERATOR
function sendWhatsAppOrder() {
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const address = document.getElementById('custAddress').value;
    const qty = document.getElementById('orderQty').value;

    if (!name || !phone || !address) {
        alert("Please fill in your Name, Phone, and Address!");
        return;
    }

    const myNumber = "923126254321"; 
    const total = selectedProduct.price * qty;
    
    // Automatically creates the message for the customer
    const message = `*🧁 NEW BAKERY ORDER* %0A` +
                    `--------------------------%0A` +
                    `*Item:* ${selectedProduct.name}%0A` +
                    `*Qty:* ${qty}%0A` +
                    `*Total Price:* Rs. ${total}%0A` +
                    `--------------------------%0A` +
                    `*CUSTOMER DETAILS:*%0A` +
                    `*Name:* ${name}%0A` +
                    `*Phone:* ${phone}%0A` +
                    `*Address:* ${address}%0A` +
                    `*Payment:* Cash on Delivery%0A` +
                    `--------------------------%0A` +
                    `Please confirm this order!`;

    // Opens WhatsApp with the message already written
    const whatsappUrl = `https://wa.me/${myNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    closeModal();
    alert("Order summary sent to WhatsApp. Please hit 'Send' in the app!");
}

// Close modal if user clicks outside
window.onclick = function(e) {
    if (e.target == document.getElementById('productModal')) closeModal();
}