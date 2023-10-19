const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const navigation = document.getElementById('navigation');
const darkOverlay = document.getElementById('dark-overlay');
const closeLightBoxBtn = document.getElementById('close-light-box-btn');
const lightbox = document.getElementById('light-box');
const productImgSelectors = document.querySelectorAll('.product-selector img');
const lightboxMainImages = document.querySelectorAll('#light-box .main-img>img');
const lightboxImgSelectors = document.querySelectorAll('.light-box-selector img');
const nextImgBtns = document.querySelectorAll('.next-btn');
const previousImgBtns = document.querySelectorAll('.previous-btn');
const productMainImages = document.querySelectorAll('.product .main-img>img');
const decreaseQtyBtn = document.querySelector('.decrease-qty');
const increaseQtyBtn = document.querySelector('.increase-qty');
const productQty = document.querySelector('.qty');
const cartItemsContainer = document.getElementById('cart-items');
const checkoutBtn = document.getElementById("checkout-btn");
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const cartBadge = document.getElementById('cart-badge');
const emptyMessage = document.getElementById('empty-message');

/**********NAVIGATION LOGIC*********/

/******* CART LOGIC*********/


/*===== CART HIDDEN =====*/
/* Validate if constant exists */
if(cartClose){
    cartClose.addEventListener('click', () =>{
        cart.classList.remove('show-cart')
    })
}
decreaseQtyBtn.addEventListener('click', ()=>{
    if(productQty.value > 0){
        productQty.value = --productQty.value;
    }
})
increaseQtyBtn.addEventListener('click', ()=>{
    productQty.value = ++productQty.value;
})


/*LIGHTBOX & IMAGE SLIDER LOGIC */
closeLightBoxBtn.addEventListener('click', ()=>{
    lightbox.classList.remove('show');
})
productMainImages.forEach(productMainImage => {
    productMainImage.addEventListener('click', (e)=>{
        if(innerWidth >= 778){
            lightbox.classList.add('show');
            imageSlider(e, lightboxMainImages, lightboxImgSelectors)
        }
        
    })
})

window.addEventListener('resize', ()=>{
    if(innerWidth <= 778){
        lightbox.classList.remove('show');
    }
})
lightboxImgSelectors.forEach(imgSelector=> {
    imgSelector.addEventListener('click', (e)=>{
        imageSlider(e, lightboxMainImages, lightboxImgSelectors);
    })
})
productImgSelectors.forEach(productImgSelector => {
    productImgSelector.addEventListener('click', (e)=>{
        imageSlider(e, productMainImages, productImgSelectors);
    })
})
previousImgBtns.forEach(previousImgBtn => {
    previousImgBtn.addEventListener('click', ()=>{
        counter--;
        carouselBtnFunction();
    });
})
nextImgBtns.forEach(nextImgBtn => {
    nextImgBtn.addEventListener('click', ()=>{
        counter++
        carouselBtnFunction();
    })
})


/************FUNCTIONS****************/
let counter = 0;
function carouselBtnFunction(){
    if(counter === productMainImages.length){
        counter = 0;
    }
    if(counter < 0){
        counter = productMainImages.length - 1;
    }
    if(innerWidth <= 778){
        productMainImages.forEach(productMainImage =>{
            productMainImage.style.transform = `translateX(-${counter * 100}%)`;
        })
    }
    else{
        lightboxMainImages.forEach(lightboxMainImage => {
            lightboxMainImage.style.transform = `translateX(-${counter * 100}%)`;
        })
        selectedImgStyleFunction(counter, lightboxImgSelectors);
    }
}
function imageSlider(e, mainImages, imgSelectors){
    const imgSelectorId = e.currentTarget.dataset.id;
    mainImages.forEach(mainImage =>{
        const translateValue = (imgSelectorId) * 100;
        mainImage.style.transform = `translate(-${translateValue}%)`;
    })
    counter = imgSelectorId;
    selectedImgStyleFunction(imgSelectorId, imgSelectors);
}

function addToCart(){
    const productDescription = document.querySelector('.product-description').textContent;
    const price = document.querySelector('.product-price').textContent.slice(1);
    const qty = productQty.value;

    cartBadge.innerHTML = qty;
    cartBadge.style.display = 'block';
    cartItemsContainer.innerHTML = `<div class="cart-item">
    <div class="cart-item-img-container">
        <img src="image/image-product-1-thumbnail.jpg" alt="">
    </div>
    <div class="cart-item-info">
      <p class="cart-item-description">${productDescription}</p>
      <p class="cart-item-price-info">
        <span class="cart-item-price">$${price}</span> 
        x 
        <span class="cart-item-quantity">${qty}</span>
        <span class="cart-item-total">$${qty*price}</span>
      </p>
    </div>
    <div class="delete-item-btn">
      <img src="image/icon-delete.svg" alt="">
    </div>
    </div>`
    checkoutBtn.style.display = 'block';
    const deleteItemBtn = document.querySelector('.delete-item-btn');
    deleteItemBtn.addEventListener('click', (e)=>{
        deleteCartItem(e);
    })
}
