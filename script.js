let cart = [];

const productContainer = document.getElementById("products");

products.forEach(p=>{
productContainer.innerHTML += `
<div class="product">
<img src="${p.image}" width="100%">
<h3>${p.name}</h3>
<p>₦${p.price}</p>
<button onclick="addToCart(${p.id})">Add to Cart</button>
</div>`;
});

function addToCart(id){
const item = products.find(p=>p.id===id);
cart.push(item);
document.getElementById("cart-count").innerText = cart.length;
renderCart();
}

function renderCart(){
let cartItems = document.getElementById("cart-items");
let total = 0;

cartItems.innerHTML = "";

cart.forEach(item=>{
total += item.price;
cartItems.innerHTML += `<p>${item.name} - ₦${item.price}</p>`;
});

document.getElementById("total").innerText = total;
}

function openCart(){
document.getElementById("cart").classList.add("active");
}

function closeCart(){
document.getElementById("cart").classList.remove("active");
}

function payWithPaystack(){
let total = cart.reduce((sum,item)=>sum+item.price,0);

let handler = PaystackPop.setup({
key: "YOUR_PUBLIC_KEY",
email: "customer@email.com",
amount: total * 100,
currency: "NGN",
callback: function(response){
alert("Payment successful!");
},
onClose: function(){
alert("Transaction cancelled");
}
});

handler.openIframe();
}