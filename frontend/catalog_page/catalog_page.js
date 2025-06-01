import {makeRequest} from '/frontend/func_js/utils.js';

let products
document.addEventListener('DOMContentLoaded', function () {
    getProducts()
    init()
})

async function getProducts() {
    const getResponse = await makeRequest({
        method: 'GET',
        url: `/api/products`
    })
    products = getResponse.products
    console.log(products)
    renderProducts()
}

async function getReviews() {
    const getResponse = await makeRequest({
        method: 'GET',
        url: `/api/reviews`
    })
    renderFeedbackItems(getResponse)
}

function renderFeedbackItems(jsonData) {
  // Создаем контейнер для всех отзывов
    const mainCon = document.getElementById('feedback-list')
    mainCon.innerHTML = ''
  const feedbackContainer = document.createElement('div');
  feedbackContainer.className = 'feedback-container';

  // Обрабатываем каждый отзыв
  jsonData.reviews.forEach(review => {
    // Создаем элемент отзыва
      if (review.product_id != productId){
          console.log(productId)
          return
      }
    const feedbackItem = document.createElement('div');
    feedbackItem.className = 'feedback-item';

    // Форматируем дату
    const reviewDate = new Date(review.created_at);
    const formattedDate = `${reviewDate.getDate().toString().padStart(2, '0')}.${(reviewDate.getMonth() + 1).toString().padStart(2, '0')}.${reviewDate.getFullYear()}`;

    // Создаем звездочки рейтинга
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      const activeClass = i <= review.rating ? 'active' : '';
      starsHtml += `<i class="fas fa-star ${activeClass}">★</i>`;
    }

    // Заполняем содержимое отзыва
    feedbackItem.innerHTML = `
      <div class="feedback-item-header">
        <span class="feedback-author">${review.user.name}</span>
        <span class="feedback-date">${formattedDate}</span>
      </div>
      <div class="feedback-rating">
        ${starsHtml}
      </div>
      <p class="feedback-text">
        ${review.description || 'Пользователь не оставил комментарий'}
      </p>
    `;

    // Добавляем отзыв в контейнер
    feedbackContainer.appendChild(feedbackItem);
  });

    mainCon.appendChild(feedbackContainer)
}



async function postReview(){
    const rating = document.getElementById('feedback-rating-value').value
    const description = document.getElementById('feedback-text').value
    console.log(rating)
    console.log(description)
    const postResponse = await makeRequest({
        method: 'post',
        url: `/api/reviews/${productId}`,
        data: {
            rating,
            description
        }
    })
    if (postResponse){
        alert("Отзыв отправлен")
        location.reload();
    }
}

function renderProducts() {
    // Filter products
    let filteredProducts = products;

    // Filter by category
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === currentCategory);
    }

    // Filter by search
    if (currentSearch) {
        const searchLower = currentSearch.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower)
        );
    }

    // Filter by price
    if (currentPriceFilter !== 'all') {
        const [min, max] = currentPriceFilter.split('-');
        if (max) {
            filteredProducts = filteredProducts.filter(product =>
                product.price >= parseInt(min) && product.price <= parseInt(max)
            );
        } else {
            // For "3000+" case
            const minPrice = parseInt(min.replace('+', ''));
            filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
        }
    }

    // Sort products
    switch (currentSort) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'new':
            // For demo, we'll just reverse the array to simulate "newest first"
            filteredProducts.reverse();
            break;
        case 'popular':
        default:
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
    }

    // Clear container
    productsContainer.innerHTML = '';

    // Add products
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; padding: 2rem;">Товары не найдены. Попробуйте изменить параметры поиска.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.id = product.id;


        productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-price">${product.price} ₽</p>
                    </div>
                `;

        productsContainer.appendChild(productCard);

        // Add click event to open modal


        productCard.addEventListener('click', () => {
            openProductModal(product);
        });
    });
}


function init() {
    // Category filter
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all categories
            categoryItems.forEach(cat => cat.classList.remove('active'));

            // Add active class to clicked category
            item.classList.add('active');

            // Update current category
            currentCategory = item.dataset.category;

            // Re-render products
            renderProducts();
        });
    });

    // Modal close button
    modalClose.addEventListener('click', closeProductModal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProductModal();
        }
    });

    // Quantity controls
    decreaseQuantityBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    increaseQuantityBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });

    // Size selection
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options
            sizeOptions.forEach(opt => opt.classList.remove('selected'));

            // Add selected class to clicked option
            option.classList.add('selected');
        });
    });

    // Buy now button
    buyNowBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        const size = document.querySelector('.size-option.selected').textContent;
        const productName = modalProductTitle.textContent;
        const id = productId

        const postResponse = makeRequest({
            method: 'POST',
            url: `/api/orders/fast_buy/${id}?size=${size}&count=${quantity}`,
        })
        if (postResponse){
            console.log('ok')
            closeProductModal();
        }

        closeProductModal();
    });

    // Add to cart button
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        const size = document.querySelector('.size-option.selected').textContent;
        const productName = modalProductTitle.textContent;
        const id = productId

        const postResponse = makeRequest({
            method: 'POST',
            url: `/api/carts/${id}?size=${size}&count=${quantity}`,
        })
        if (postResponse){
            console.log('ok')
            closeProductModal();
        }
    });

    // Search
    searchBtn.addEventListener('click', () => {
        currentSearch = searchInput.value.trim();
        renderProducts();
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            currentSearch = searchInput.value.trim();
            renderProducts();
        }
    });

    // Sort
    sortBySelect.addEventListener('change', () => {
        currentSort = sortBySelect.value;
        renderProducts();
    });

    // Price filter
    filterPriceSelect.addEventListener('change', () => {
        currentPriceFilter = filterPriceSelect.value;
        renderProducts();
    });
}

window.getReviews = getReviews
window.postReview = postReview

