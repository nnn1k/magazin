import {apiUrl, makeRequest} from '/frontend/func_js/utils.js';

document.addEventListener('DOMContentLoaded', function () {
    getMe()
    getAllOrders()
    getAllProducts()
})


async function logout() {
    const postResponse = await makeRequest({
        method: 'POST',
        url: '/api/auth/logout',
    })
    if (postResponse) {
        window.location.href = apiUrl
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

async function getAllOrders() {
    const getResponse = await makeRequest({
        method: 'GET',
        url: '/api/orders/admin',
    })
    const ordersHtml = renderOrders(getResponse);
    const main_block = document.getElementById('account-content')
    main_block.appendChild(ordersHtml)
}

async function getAllProducts() {
    const getResponse = await makeRequest({
        method: 'GET',
        url: '/api/products',
    })
    console.log(getResponse)
    renderProductsTable(getResponse);
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

function deleteProduct(product_id) {
    const deleteResponse = makeRequest({
        method: 'DELETE',
        url: `/api/products/${product_id}`,
    })
    location.reload();
}

let productIdForEdit = 0

function editProduct(productIdForEdit) {
    const name = document.getElementById("product-name_1").value
    const price = document.getElementById("product-price_1").value
    const category = document.getElementById("product-category_1").value
    const description = document.getElementById("product-description_1").value

    console.log(name)
    console.log(price)
    console.log(category)
    console.log(description)

    const putResponse = makeRequest({
        method: 'PUT',
        url: `/api/products/${productIdForEdit}`,
        data: {
            name,
            price,
            category,
            description
        }
    })
    location.reload();
}


const editBtn = document.getElementById(`add-product-btn_1`);
editBtn.addEventListener('click', () => {
        editProduct(productIdForEdit)
    });

async function postProduct() {
    const name = document.getElementById("product-name").value
    const price = document.getElementById("product-price").value
    const category = document.getElementById("product-category").value
    const description = document.getElementById("product-description").value
    const file = document.querySelector('#product-image').files[0]
    console.log(file)

    const formData = new FormData();


    // Добавляем файл с правильным именем поля
    formData.append('file', file);

    try {
        const response = await fetch(apiUrl + `/api/products/?name=${name}&price=${price}&category=${category}&description=${description}`, {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            console.log(response)
            location.reload();
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



function openEditModal(id) {
    productIdForEdit = id
    console.log(productIdForEdit)
    const editProductBtn = document.getElementById(`edit-btn-${id}`);
    const editProductModal = document.getElementById('add-product-modal_1');



    editProductBtn.addEventListener('click', () => {
        editProductModal.classList.add('active');
    });

    // Закрытие модального окна при клике вне его
    editProductModal.addEventListener('click', (e) => {
        if (e.target === editProductModal) {
            editProductModal.classList.remove('active');
        }
    });
}

function renderProductsTable(productsData) {

    if (!productsData || !productsData.products || !Array.isArray(productsData.products)) {
        console.error('Invalid products data');
        return;
    }

    // 2. Находим таблицу (tbody) куда будем вставлять товары
    const tbody = document.querySelector('tbody');
    if (!tbody) {
        console.error('Table body (tbody) not found in DOM');
        return;
    }

    // 3. Очищаем таблицу перед добавлением новых данных
    tbody.innerHTML = '';

    // 4. Перебираем все продукты и создаем строки таблицы
    productsData.products.forEach(product => {
        // Форматируем цену в рубли

        const formattedPrice = new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        }).format(product.price);

        // Обрабатываем изображение
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>#${product.id}</td>
      <td><img src="${product.image}" alt="${product.name}" class="product-image" "></td>
      <td>${product.name}</td>
      <td>${formattedPrice}</td>
      <td>${translateCategory(product.category)}</td>
      <td>
        <div class="product-actions">
          <button class="action-btn edit-btn" id='edit-btn-${product.id}' onclick="openEditModal(${product.id})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete-btn" data-product-id="${product.id}" onclick="deleteProduct(${product.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    `;

        // Добавляем строку в таблицу
        tbody.appendChild(row);
    });


    function translateCategory(category) {
        const categories = {
            'hoodies': 'Худи',
            'tshirts': 'Футболки',
            'pants': 'Штаны/Джинсы',
            'shoes': 'Обувь',
            'outerwear': 'Верхняя одежда',
            'accessories': 'Аксессуары'
        };
        return categories[category] || category;
    }
}


window.postProduct = postProduct
window.logout = logout
window.deleteProduct = deleteProduct
window.openEditModal = openEditModal
window.editProduct = editProduct