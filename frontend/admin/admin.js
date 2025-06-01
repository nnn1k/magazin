import {makeRequest} from '/frontend/func_js/utils.js';

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

function getAllOrders(){
    const jsonData = {
  "orders": [
    {
      "id": 4,
      "user_id": 1,
      "created_at": "2025-04-14T02:21:58.053678",
      "updated_at": "2025-04-14T02:21:58.053678",
      "products": [
        {
          "id": 2,
          "name": "Футболка ЦПС базовая",
          "price": 1200,
          "category": "tshirts",
          "image": "https://4kraski.ru/assets/images/products/17518/118.13.1.jpg",
          "description": "Базовая футболка с логотипом ЦПС. Изготовлена из 100% хлопка, приятная к телу. Подходит для повседневной носки и занятий спортом."
        },
        {
          "id": 3,
          "name": "Штаны ЦПС спортивные",
          "price": 1800,
          "category": "pants",
          "image": "https://avatars.mds.yandex.net/get-mpic/5234525/img_id228623520267602878.jpeg/orig",
          "description": "Спортивные штаны с логотипом ЦПС. Удобные и практичные, с карманами на молнии. Идеально подходят для занятий спортом и повседневной носки."
        },
        {
          "id": 4,
          "name": "Кроссовки ЦПС",
          "price": 3500,
          "category": "shoes",
          "image": "https://avatars.mds.yandex.net/get-mpic/7689172/img_id5504037524428388527.jpeg/9",
          "description": "Стильные и удобные кроссовки с логотипом ЦПС. Легкие и практичные, подходят для повседневной носки и занятий спортом."
        }
      ],
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "string",
        "photo_url": "",
        "is_admin": true,
        "created_at": "2025-04-13T22:37:47.930198",
        "updated_at": "2025-04-13T22:37:47.930198"
      }
    },
    {
      "id": 5,
      "user_id": 1,
      "created_at": "2025-04-14T02:24:40.957760",
      "updated_at": "2025-04-14T02:24:40.957760",
      "products": [
        {
          "id": 2,
          "name": "Футболка ЦПС базовая",
          "price": 1200,
          "category": "tshirts",
          "image": "https://4kraski.ru/assets/images/products/17518/118.13.1.jpg",
          "description": "Базовая футболка с логотипом ЦПС. Изготовлена из 100% хлопка, приятная к телу. Подходит для повседневной носки и занятий спортом."
        },
        {
          "id": 3,
          "name": "Штаны ЦПС спортивные",
          "price": 1800,
          "category": "pants",
          "image": "https://avatars.mds.yandex.net/get-mpic/5234525/img_id228623520267602878.jpeg/orig",
          "description": "Спортивные штаны с логотипом ЦПС. Удобные и практичные, с карманами на молнии. Идеально подходят для занятий спортом и повседневной носки."
        },
        {
          "id": 4,
          "name": "Кроссовки ЦПС",
          "price": 3500,
          "category": "shoes",
          "image": "https://avatars.mds.yandex.net/get-mpic/7689172/img_id5504037524428388527.jpeg/9",
          "description": "Стильные и удобные кроссовки с логотипом ЦПС. Легкие и практичные, подходят для повседневной носки и занятий спортом."
        }
      ],
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "string",
        "photo_url": "",
        "is_admin": true,
        "created_at": "2025-04-13T22:37:47.930198",
        "updated_at": "2025-04-13T22:37:47.930198"
      }
    },
    {
      "id": 6,
      "user_id": 1,
      "created_at": "2025-04-14T03:08:10.709086",
      "updated_at": "2025-04-14T03:08:10.709086",
      "products": [
        {
          "id": 6,
          "name": "Кепка ЦПС",
          "price": 800,
          "category": "accessories",
          "image": "https://www.adverti.ru/media/catalog/product/1/3/130899.jpg",
          "description": "Стильная кепка с логотипом ЦПС. Регулируемый размер, подходит для повседневной носки."
        }
      ],
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "string",
        "photo_url": "",
        "is_admin": true,
        "created_at": "2025-04-13T22:37:47.930198",
        "updated_at": "2025-04-13T22:37:47.930198"
      }
    },
    {
      "id": 7,
      "user_id": 1,
      "created_at": "2025-04-14T03:43:33.054961",
      "updated_at": "2025-04-14T03:43:33.054961",
      "products": [
        {
          "id": 5,
          "name": "Куртка ЦПС зимняя",
          "price": 4500,
          "category": "outerwear",
          "image": "https://спецодежда28.рф/upload/iblock/c7e/qyvwa0mvrfralu110upd0kpkyp9s13e0/70b10e50_ec3b_11e7_ba1c_5254007963b8_993424ea_9825_11eb_6493_52540007e369.resize1.jpg",
          "description": "Зимняя куртка с логотипом ЦПС. Теплая и практичная, с капюшоном и множеством карманов. Идеально подходит для холодной погоды."
        },
        {
          "id": 6,
          "name": "Кепка ЦПС",
          "price": 800,
          "category": "accessories",
          "image": "https://www.adverti.ru/media/catalog/product/1/3/130899.jpg",
          "description": "Стильная кепка с логотипом ЦПС. Регулируемый размер, подходит для повседневной носки."
        },
        {
          "id": 7,
          "name": "Худи ЦПС оверсайз",
          "price": 2800,
          "category": "hoodies",
          "image": "https://avatars.mds.yandex.net/i?id=576c57312de405e235c52a60010f2b37b5ee4e4d-12624456-images-thumbs&n=13",
          "description": "Худи оверсайз с логотипом ЦПС. Свободный крой, удобные карманы. Идеально подходит для создания модного образа."
        },
        {
          "id": 8,
          "name": "Футболка ЦПС с принтом",
          "price": 1500,
          "category": "tshirts",
          "image": "https://4kraski.ru/assets/images/products/17518/118.13.1.jpg",
          "description": "Футболка с уникальным принтом ЦПС. Изготовлена из высококачественного хлопка, приятная к телу. Яркий дизайн выделит вас из толпы."
        }
      ],
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "string",
        "photo_url": "",
        "is_admin": true,
        "created_at": "2025-04-13T22:37:47.930198",
        "updated_at": "2025-04-13T22:37:47.930198"
      }
    },
    {
      "id": 8,
      "user_id": 1,
      "created_at": "2025-04-14T03:43:55.465854",
      "updated_at": "2025-04-14T03:43:55.465854",
      "products": [],
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "string",
        "photo_url": "",
        "is_admin": true,
        "created_at": "2025-04-13T22:37:47.930198",
        "updated_at": "2025-04-13T22:37:47.930198"
      }
    },
    {
      "id": 9,
      "user_id": 2,
      "created_at": "2025-04-14T11:22:02.517622",
      "updated_at": "2025-04-14T11:22:02.517622",
      "products": [
        {
          "id": 5,
          "name": "Куртка ЦПС зимняя",
          "price": 4500,
          "category": "outerwear",
          "image": "https://спецодежда28.рф/upload/iblock/c7e/qyvwa0mvrfralu110upd0kpkyp9s13e0/70b10e50_ec3b_11e7_ba1c_5254007963b8_993424ea_9825_11eb_6493_52540007e369.resize1.jpg",
          "description": "Зимняя куртка с логотипом ЦПС. Теплая и практичная, с капюшоном и множеством карманов. Идеально подходит для холодной погоды."
        }
      ],
      "user": {
        "id": 2,
        "email": "dfrhoj@gmail.ru",
        "name": "Жанна",
        "photo_url": "",
        "is_admin": false,
        "created_at": "2025-04-14T11:20:34.421546",
        "updated_at": "2025-04-14T11:20:34.421546"
      }
    },
    {
      "id": 10,
      "user_id": 1,
      "created_at": "2025-05-15T00:13:06.609658",
      "updated_at": "2025-05-15T00:13:06.609658",
      "products": [
        {
          "id": 9,
          "name": "Джинсы ЦПС",
          "price": 2200,
          "category": "pants",
          "image": "https://media.baamboozle.com/uploads/images/625458/1643206724_89329.jpeg",
          "description": "Стильные джинсы с логотипом ЦПС. Удобный крой, высококачественный деним. Подходят для повседневной носки."
        }
      ],
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "string",
        "photo_url": "",
        "is_admin": true,
        "created_at": "2025-04-13T22:37:47.930198",
        "updated_at": "2025-04-13T22:37:47.930198"
      }
    },
    {
      "id": 11,
      "user_id": 1,
      "created_at": "2025-05-29T04:01:49.611945",
      "updated_at": "2025-05-29T04:01:49.611945",
      "products": [
        {
          "id": 4,
          "name": "Кроссовки ЦПС",
          "price": 3500,
          "category": "shoes",
          "image": "https://avatars.mds.yandex.net/get-mpic/7689172/img_id5504037524428388527.jpeg/9",
          "description": "Стильные и удобные кроссовки с логотипом ЦПС. Легкие и практичные, подходят для повседневной носки и занятий спортом."
        }
      ],
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "string",
        "photo_url": "",
        "is_admin": true,
        "created_at": "2025-04-13T22:37:47.930198",
        "updated_at": "2025-04-13T22:37:47.930198"
      }
    },
    {
      "id": 12,
      "user_id": 4,
      "created_at": "2025-05-31T17:29:42.865072",
      "updated_at": "2025-05-31T17:29:42.865072",
      "products": [
        {
          "id": 1,
          "name": "Худи ЦПС классическое",
          "price": 2500,
          "category": "hoodies",
          "image": "https://www.adverti.ru/media/catalog/product/1/2/127845.jpg",
          "description": "Классическое худи с логотипом ЦПС. Изготовлено из высококачественного хлопка, обеспечивает комфорт и тепло. Идеально подходит для повседневной носки."
        }
      ],
      "user": {
        "id": 4,
        "email": "user_1@example.com",
        "name": "Олег",
        "photo_url": "",
        "is_admin": false,
        "created_at": "2025-05-31T17:16:09.359339",
        "updated_at": "2025-05-31T17:16:09.359339"
      }
    }
  ]
}; // ваш JSON
    const ordersHtml = renderOrders(jsonData);
    const main_block = document.getElementById('account-content')
    main_block.appendChild(ordersHtml)
}




window.logout = logout;