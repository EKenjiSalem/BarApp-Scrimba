import { menuArray } from './data.js';

let totalPrice = 0;

function renderMenu(menu) {
    menu.forEach(item => {
        const div = document.querySelector(`.${item.name}`);
        if (div) {
            div.innerHTML = `
                <div class="item-container">
                    <h5>${item.emoji}</h5>
                    <div class="details">
                        <p class="drink-name">${item.name.charAt(0).toUpperCase() + item.name.slice(1)}</p>
                        <p>Ingredients: ${item.ingredients.join(', ')}</p>
                        <p>Price: $${item.price}</p>
                    </div>
                    <div class="adds">
                        <img src="Images/add-icon.png" class="add-icon"/>
                    </div>
                </div>
            `;
            const img = div.querySelector('.add-icon');
            if (img) {
                img.addEventListener('click', () => {
                    const orderSection = document.getElementById('order-section');
                    orderSection.style.display = 'block';

                        let orderTitle = document.querySelector('.orders');
                        if (!orderTitle) {
                            orderTitle = document.createElement('h2');
                            orderTitle.classList.add('orders');
                            orderTitle.textContent = 'Your Orders';
                            orderSection.insertBefore(orderTitle, orderSection.firstChild);
                        }

                    let orderDetailsContainer = document.getElementById('order-details-container');
                    if (!orderDetailsContainer) {
                        orderDetailsContainer = document.createElement('div');
                        orderDetailsContainer.id = 'order-details-container';
                        orderSection.appendChild(orderDetailsContainer);
                    }

                    const orderDetails = document.createElement('div');
                    orderDetails.classList.add('order-item');
                    orderDetails.innerHTML = `
                        <div class="order-header">
                            <p>${item.name.charAt(0).toUpperCase() + item.name.slice(1)}</p>
                            <button class="remove-order-button">Remove</button>
                        </div>
                        <p class="order-price">$${item.price}</p>
                    `;
                    orderDetailsContainer.appendChild(orderDetails);

                    const removeButton = orderDetails.querySelector('.remove-order-button');
                    removeButton.addEventListener('click', () => {
                        orderDetailsContainer.removeChild(orderDetails);
                        totalPrice -= item.price;
                        updateTotalPrice();
                    });

                    totalPrice += item.price;
                    updateTotalPrice();
                });
            }
        }
    });
}

            function updateTotalPrice() {
                let totalPriceElement = document.getElementById('totals-container');
                    if (!totalPriceElement) {
                    totalPriceElement = document.createElement('div');
                    totalPriceElement.id = 'totals-container';
                    document.getElementById('order-section').appendChild(totalPriceElement);
                    } else {
                    document.getElementById('order-section').appendChild(totalPriceElement);
                   }

            totalPriceElement.innerHTML = `
              <div class="drinks-container">
                <p class="totals">Totals:</p>
                <p class="price">$${totalPrice}</p>
              </div>
              <div class="btn-container"> 
                <button id="order-btn">Complete Order</button>
              </div>
            `;

            const orderBtn = document.getElementById('order-btn');
            orderBtn.addEventListener('click', () => {
            document.getElementById('modal').style.display = 'block';
        });
       }

        const closeModalBtn = document.getElementById('modal-close-btn');
            closeModalBtn.addEventListener('click', () => {
              document.getElementById('modal').style.display = 'none';
    });

        const payButton = document.querySelector('.modal-btn button');
        payButton.addEventListener('click', (e) => {
        e.preventDefault();
        const fullNameInput = document.querySelector('input[name="fullName"]');
        const cardNumberInput = document.querySelector('input[name="numbers"]');
        const cvvInput = document.querySelector('input[name="cvv"]');

        const fullName = fullNameInput.value;
        const cardNumber = cardNumberInput.value;
        const cvv = cvvInput.value;

        if (!fullName || !cardNumber || !cvv) {
            alert('Please enter your name, card number, and CVV.');
        return;
    }

          document.getElementById('modal').style.display = 'none';

          const orderSection = document.getElementById('order-section');
          orderSection.innerHTML = `<h2 class="message">Thanks ${fullName}, your order will be out momentarily!</h2>`;
    });

        renderMenu(menuArray);
