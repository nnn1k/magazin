import {apiUrl, makeRequest} from '/frontend/func_js/utils.js';

document.addEventListener('DOMContentLoaded', function () {
    getMe()
    getAllOrders()
})


async function logout() {
    const postResponse = await makeRequest({
        method: 'POST',
        url: '/api/auth/logout',
    })
    if (postResponse) {
        window.location.href = "http://127.0.0.1:8000"
    }
}

async function getMe() {
    const getResponse = await makeRequest({
        method: 'GET',
        url: '/api/users/me',
    })
    let userGreeting = document.getElementById('user-greeting')
    userGreeting.textContent = `Добро пожаловать, ${getResponse.user.name}`
    let userName = document.getElementById('user-name')
    userName.textContent = getResponse.user.name
    let userMail = document.getElementById('user-email')
    userMail.textContent = getResponse.user.email
}

async function getAllOrders(){
    const getResponse = await makeRequest ({
        method: 'GET',
        url: '/api/orders/admin',
    })
    console.log(getResponse)
    const ordersHtml = renderOrders(getResponse);
    const main_block = document.getElementById('account-content')
    main_block.appendChild(ordersHtml)
}

function renderOrders(jsonData) {
  // Создаем основную секцию
  const ordersSection = document.createElement('div');
  ordersSection.className = 'content-section';
  ordersSection.id = 'orders';

  // Добавляем заголовок секции
  ordersSection.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">Управление заказами</h2>
      <div>
     
      </div>
    </div>
  `;

  // Обрабатываем каждый заказ
  jsonData.orders.forEach(order => {
    // Пропускаем заказы без товаров
    if (order.products.length === 0) return;

    // Создаем карточку заказа
    const orderCard = document.createElement('div');
    orderCard.className = 'order-card';

    // Форматируем дату
    const orderDate = new Date(order.created_at);
    const formattedDate = `${orderDate.getDate().toString().padStart(2, '0')}.${(orderDate.getMonth() + 1).toString().padStart(2, '0')}.${orderDate.getFullYear()}`;

    // Заголовок заказа
    orderCard.innerHTML = `
      <div class="order-header">
        <div>
          <span class="order-number">Заказ #${order.id}</span>
          <span class="order-date">от ${formattedDate}</span>
        </div>
        <span class="order-status status-shipped">Обработан</span>
      </div>
    `;

    // Секция с товарами
    const orderItems = document.createElement('div');
    orderItems.className = 'order-items';

    // Добавляем каждый товар
    order.products.forEach(product => {
      const orderItem = document.createElement('div');
      orderItem.className = 'order-item';
      orderItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="item-image">
        <div class="item-details">
          <h4 class="item-name">${product.name}</h4>
          <div class="item-price">${product.price} ₽</div>
          <div class="item-quantity">Количество: 1</div>
        </div>
      `;
      orderItems.appendChild(orderItem);
    });

    // Подсчет общей суммы
    const total = order.products.reduce((sum, product) => sum + product.price, 0);

    // Футер заказа
    orderCard.innerHTML += `
      <div class="order-footer">
        <div class="order-total">
          Итого: <span class="order-total-value">${total} ₽</span>
        </div>
      </div>
    `;

    // Вставляем товары перед футером
    orderCard.insertBefore(orderItems, orderCard.lastChild);

    // Добавляем карточку в секцию
    ordersSection.appendChild(orderCard);
  });

  return ordersSection;
}

async function postProduct(){
    const name = document.getElementById("product-name").value
    const price  = document.getElementById("product-price").value
    const category  = document.getElementById("product-category").value
    const description = document.getElementById("product-description").value
    const file = document.querySelector('#product-image').files[0]
    console.log(file)

     const formData = new FormData();

    // Добавляем данные продукта как JSON

    // Добавляем файл с правильным именем поля
    formData.append('file', file);

    try {
    const response = await fetch(`http://127.0.0.1:8000/api/products/?name=${name}&price=${price}&category=${category}&description=${description}`, {
      method: 'POST',
      body:formData
    });
    if (response.ok){
          console.log(response)
      }

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при создании продукта:', error);
    throw error;
  }

}


window.postProduct = postProduct
window.logout = logout;