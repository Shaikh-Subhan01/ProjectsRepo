$(document).ready(function() {
    var addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    var productNameElements = document.querySelectorAll('.productName');
    var cartOrderAmtElements = document.querySelectorAll('.productPrice');
    var cartAlert = document.querySelector('.cart-alert');


    addToCartBtns.forEach(function(addToCartBtn, cartIndex){

        addToCartBtn.addEventListener('click', (event) => {
            event.preventDefault();
        cartAlert.classList.add('active');
        setTimeout(function() {
        cartAlert.classList.remove('active');
          }, 1800);
        var productName =(productNameElements[cartIndex].textContent);
        var cartOrderAmtText = cartOrderAmtElements[cartIndex].textContent;

        var convert = cartOrderAmtText.match(/\d+/);
        var cartOrderAmt = convert ? parseInt(convert[0], 10) : null;
    //   var cartOrderAmt = parseInt(cartOrderAmtText) || 0; 
        
        
        var newOrder = new Object();
        newOrder.name = productName
        newOrder.amount = cartOrderAmt

        var cartItems = JSON.parse(localStorage.getItem("CartItems")) || [];

        cartItems.push(newOrder);

        localStorage.setItem("CartItems", JSON.stringify(cartItems))

  displayCartItems();

    })
})
});


// EMPTY CART
var emptyCart = document.getElementById('empty-cart');
emptyCart.addEventListener('click', () => {
    var confirmEmpty = confirm('Are you sure you want to empty the cart?');
    if (confirmEmpty) {
        localStorage.removeItem("CartItems");
        displayCartItems();
    }
});

// DISPLAYING ITEMS IN CART
function displayCartItems() {
    // Get the cart items from localStorage
    var cartItems = JSON.parse(localStorage.getItem("CartItems")) || [];

    // Get the container element
    var container = document.getElementById('cart-items');
    var totalAmountElement = document.getElementById('total-amount');
    var totalAmount = 0;

    // Clear the container first
    container.innerHTML = '';

    if (cartItems.length === 0) {
        container.innerHTML = '<img style="opacity: 0.5; margin-top: 100px;" src="https://foreverliving.gr/static/img/cartEmpty.png" alt="Cart is empty">';
        totalAmountElement.style.display = 'none';
    } else {
        // Iterate over the cart items and create HTML for each item
        cartItems.forEach(function(item) {
            var itemHtml = `
            <div class="cart-item d-flex justify-content-between px-2">
            <span>${item.name}</span>
            <span>${item.amount.toFixed(2)}</span></div><hr>`;
            container.insertAdjacentHTML('beforeend', itemHtml);
            totalAmount += item.amount;
        });

        // Display the total amount
        totalAmountElement.innerHTML = `<span>Total:</span><span class="float-end">$${totalAmount.toFixed(2)}</span>`;
        totalAmountElement.style.display = 'block';
    }

    // Add click event listener to 'place-order' button if not already added
    var placeOrderButton = document.getElementById('place-order');
    if (totalAmount==0) {
        placeOrderButton.addEventListener('click', () => {
            document.getElementById('order-card').innerHTML = `<div class="bg-white p-5 fw-3 fs-5" id="order-card-content">
            <div class="btn btn-lg d-block float-end" id="close-order-card">OK</div>
            Your total is <span class="text-danger fw-3 fs-5">$${totalAmount.toFixed(2)}</span> <br>Please fill the cart</div>`;
            document.getElementById('order-card').style.display = 'block'
            closeOrderCard();
          });
        }
        else{
            placeOrderButton.addEventListener('click', () => {
                document.getElementById('order-card').innerHTML = `<div class="bg-white p-5 fw-3 fs-5 text-center" id="order-card-content">
                
                <div class="text-center pb-5"> <svg class="logo1" width="104" height="43" viewBox="0 0 208 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.932 84.384L20.1 82.704H20.268C20.996 83.3387 21.8173 83.8333 22.732 84.188C23.6467 84.5427 24.552 84.72 25.448 84.72C26.7173 84.72 27.744 84.3747 28.528 83.684C29.312 82.9747 29.704 82.032 29.704 80.856C29.704 80.2027 29.5547 79.596 29.256 79.036C28.976 78.476 28.5 77.9067 27.828 77.328C27.1747 76.7493 26.2693 76.124 25.112 75.452C24.3093 74.9853 23.544 74.5 22.816 73.996C22.088 73.4733 21.4907 72.876 21.024 72.204C20.5573 71.5133 20.324 70.692 20.324 69.74C20.324 68.3213 20.8373 67.1827 21.864 66.324C22.8907 65.4467 24.244 65.008 25.924 65.008C26.6707 65.008 27.4733 65.092 28.332 65.26C29.1907 65.4093 29.8533 65.6053 30.32 65.848L30.18 67.416H30.012C28.948 66.2587 27.5853 65.68 25.924 65.68C24.7293 65.68 23.768 65.988 23.04 66.604C22.312 67.2013 21.948 68.0133 21.948 69.04C21.948 69.8053 22.144 70.468 22.536 71.028C22.9467 71.5693 23.4693 72.064 24.104 72.512C24.7387 72.9413 25.42 73.3613 26.148 73.772C26.988 74.2573 27.8 74.7707 28.584 75.312C29.3867 75.8533 30.04 76.5067 30.544 77.272C31.0667 78.0187 31.328 78.9613 31.328 80.1C31.328 81.1453 31.0853 82.0693 30.6 82.872C30.1147 83.656 29.424 84.272 28.528 84.72C27.6507 85.168 26.624 85.392 25.448 85.392C24.7013 85.392 23.824 85.2987 22.816 85.112C21.808 84.9253 20.8467 84.6827 19.932 84.384ZM55.7763 85V65.96C55.4963 65.96 54.9176 66.016 54.0403 66.128L48.5523 66.828V65.4H64.9043V66.828L59.4163 66.128C58.5389 66.016 57.9603 65.96 57.6803 65.96V85H55.7763ZM88.6525 85V76.712L81.7085 65.4H83.8365L90.0805 75.648H90.2485L95.2325 65.4H97.3605L90.6685 76.32V85H88.6525ZM116.734 65.4H118.638V84.44C118.992 84.44 119.552 84.384 120.318 84.272L124.966 83.572V85H116.734V65.4ZM144.64 85V65.4H153.18V66.772L148.28 66.128C147.421 66.016 146.843 65.96 146.544 65.96V74.5C146.787 74.5 147.365 74.472 148.28 74.416L152.872 74.136V75.424L148.28 75.144C147.365 75.088 146.787 75.06 146.544 75.06V84.44C146.88 84.44 147.468 84.384 148.308 84.272L153.264 83.628V85H144.64ZM174.132 65.4H177.884C179.863 65.4 181.394 65.82 182.476 66.66C183.578 67.4813 184.128 68.6387 184.128 70.132C184.128 71.2893 183.783 72.2507 183.092 73.016C182.42 73.7813 181.44 74.2947 180.152 74.556V74.724C181.384 74.9667 182.392 75.5453 183.176 76.46C183.96 77.3747 184.548 78.504 184.94 79.848C185.295 81.08 185.64 82.0413 185.976 82.732C186.331 83.404 186.714 83.8893 187.124 84.188C187.554 84.4867 188.058 84.7013 188.636 84.832V85H187.488C186.667 85 185.986 84.8507 185.444 84.552C184.922 84.2533 184.474 83.7493 184.1 83.04C183.727 82.3307 183.372 81.3507 183.036 80.1C182.495 78.1773 181.776 76.8147 180.88 76.012C179.984 75.2093 178.892 74.808 177.604 74.808H177.436V74.304H177.604C180.61 74.304 182.112 72.9227 182.112 70.16C182.112 67.4347 180.703 66.072 177.884 66.072H176.036V85H174.132V65.4Z" fill="#2F2E2E"/>
                <path d="M15.32 59V14.2H19.672V34.936H46.552V14.2H50.904V59H46.552V36.472H19.672V59H15.32ZM61.17 36.6C61.17 33.3147 61.746 30.264 62.898 27.448C64.0927 24.5893 65.7353 22.1147 67.826 20.024C69.9593 17.8907 72.434 16.248 75.25 15.096C78.1087 13.9013 81.1807 13.304 84.466 13.304C87.7513 13.304 90.802 13.9013 93.618 15.096C96.4767 16.248 98.9513 17.8907 101.042 20.024C103.175 22.1147 104.818 24.5893 105.97 27.448C107.165 30.264 107.762 33.3147 107.762 36.6C107.762 39.8853 107.165 42.9573 105.97 45.816C104.818 48.632 103.175 51.1067 101.042 53.24C98.9513 55.3307 96.4767 56.9733 93.618 58.168C90.802 59.32 87.7513 59.896 84.466 59.896C81.1807 59.896 78.1087 59.32 75.25 58.168C72.434 56.9733 69.9593 55.3307 67.826 53.24C65.7353 51.1067 64.0927 48.632 62.898 45.816C61.746 42.9573 61.17 39.8853 61.17 36.6ZM66.034 36.6C66.034 40.952 66.802 44.7707 68.338 48.056C69.874 51.2987 72.0287 53.8373 74.802 55.672C77.5753 57.464 80.7967 58.36 84.466 58.36C88.1353 58.36 91.3567 57.464 94.13 55.672C96.9033 53.8373 99.058 51.2773 100.594 47.992C102.13 44.7067 102.898 40.9093 102.898 36.6C102.898 32.2907 102.13 28.5147 100.594 25.272C99.058 21.9867 96.9033 19.4267 94.13 17.592C91.3567 15.7573 88.1353 14.84 84.466 14.84C80.7967 14.84 77.5753 15.7573 74.802 17.592C72.0713 19.384 69.9167 21.9227 68.338 25.208C66.802 28.4507 66.034 32.248 66.034 36.6ZM160.159 14.2V59H155.806V17.912H155.423L139.934 47.608H137.951L120.35 21.432H119.966L121.374 59H117.022L118.622 13.304H119.902L140.062 43.256H140.447L155.55 14.2H160.159ZM173.595 59V14.2H193.115V17.336L181.915 15.864C179.952 15.608 178.63 15.48 177.947 15.48V35C178.502 35 179.824 34.936 181.915 34.808L192.411 34.168V37.112L181.915 36.472C179.824 36.344 178.502 36.28 177.947 36.28V57.72C178.715 57.72 180.059 57.592 181.979 57.336L193.307 55.864V59H173.595Z" fill="#2F2E2E"/>
                <path d="M17 75H1V35H10.5" stroke="#2F2E2E" stroke-linecap="round"/>
                <path d="M191 75H207V35H197.5" stroke="#2F2E2E" stroke-linecap="round"/>
            </svg></div>
                Your total is <span class="text-success fw-3 fs-5">$${totalAmount.toFixed(2)}</span> <br>Order has been placed!
                <div class="btn btn-lg d-block float-center mt-5 text-white" id="close-order-card">OK</div></div>`;
                document.getElementById('order-card').style.display = 'block'
                closeOrderCard();
              });
            //   placeOrderButton.setAttribute('data-event-added', 'true');
        }
        closeOrderCard();
}

// Function to close the order card
function closeOrderCard() {
    var closeBtn = document.getElementById('close-order-card');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.getElementById('order-card').style.display = 'none';
        });
    }
}

// Call the function to display the cart items when the page loads
displayCartItems();
closeOrderCard();