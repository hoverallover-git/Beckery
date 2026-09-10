const products = [
  {id:'blueberry-lemon',name:'Blueberry Lemon Layer Cake',price:42,icon:'🎂',desc:'Bright lemon cake, blueberry filling, and soft vanilla frosting.'},
  {id:'snickerdoodle',name:'Snickerdoodle Cookie',price:4,icon:'🍪',desc:'Soft-centered, cinnamon-sugar coated, and aggressively nostalgic.'},
  {id:'scratch-dumplings',name:'Scratch Dumplings',price:14,icon:'🥟',desc:'Handmade from scratch: tender, cozy, and unapologetically savory.'},
  {id:'becknana',name:'Becknana Bread',price:12,icon:'🍌',desc:'A banana loaf with the exact right amount of caramelized edge.'},
  {id:'beck-of-day',name:'Beck of the Day',price:9,icon:'✨',desc:'Whatever Becky felt like making today. A tiny edible plot twist.'}
];
let cart = JSON.parse(localStorage.getItem('beckery-cart') || '[]');
const $ = s => document.querySelector(s);
function money(n){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n)}
function renderProducts(){
  $('#productGrid').innerHTML = products.map(p=>`<button class="product" data-id="${p.id}" aria-label="Add ${p.name} to bag"><div class="product-art">${p.icon}</div><div class="product-copy"><h3>${p.name}</h3><p>${p.desc}</p><div class="price-row"><span>${money(p.price)}</span><span class="plus">+</span></div></div></button>`).join('');
  document.querySelectorAll('.product').forEach(el=>el.addEventListener('click',()=>add(el.dataset.id)));
}
function add(id){cart.push(id);save();openCart()}
function removeAt(i){cart.splice(i,1);save()}
function save(){localStorage.setItem('beckery-cart',JSON.stringify(cart));renderCart()}
function renderCart(){
  $('#cartCount').textContent=cart.length;
  if(!cart.length){$('#cartItems').innerHTML='<p class="empty">Your bag is waiting for something good.</p>';$('#cartTotal').textContent=money(0);return}
  $('#cartItems').innerHTML=cart.map((id,i)=>{const p=products.find(x=>x.id===id);return `<div class="cart-item"><div><h4>${p.name}</h4><small>${money(p.price)}</small></div><button class="remove" data-i="${i}">remove</button></div>`}).join('');
  document.querySelectorAll('.remove').forEach(el=>el.addEventListener('click',()=>removeAt(Number(el.dataset.i))));
  $('#cartTotal').textContent=money(cart.reduce((n,id)=>n+products.find(p=>p.id===id).price,0));
}
function openCart(){$('#cart').classList.add('open');$('#scrim').classList.add('show');$('#cart').setAttribute('aria-hidden','false')}
function closeCart(){$('#cart').classList.remove('open');$('#scrim').classList.remove('show');$('#cart').setAttribute('aria-hidden','true')}
$('#cartButton').addEventListener('click',openCart);$('#closeCart').addEventListener('click',closeCart);$('#scrim').addEventListener('click',closeCart);
$('#checkoutButton').addEventListener('click',()=>alert('Beckery demo checkout — no payment has been collected.'));
renderProducts();renderCart();
