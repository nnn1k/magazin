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
    renderProducts()
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

        alert(`Оформление заказа:\n${productName}\nРазмер: ${size}\nКоличество: ${quantity}`);
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


