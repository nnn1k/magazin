import {apiUrl, makeRequest} from '/frontend/func_js/utils.js';

document.addEventListener('DOMContentLoaded', function () {
    getProductsInCart()
    getMe()
    getProductsInOrder()
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

async function allBuyFromCart() {
    const postResponse = await makeRequest({
        method: 'POST',
        url: '/api/orders/cart',
    })
    if (postResponse) {
        location.reload(true);
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

async function getProductsInCart() {
    const getResponse = await makeRequest({
        method: 'GET',
        url: '/api/carts',
    })
    renderProductInCart(getResponse.carts)
}

async function getProductsInOrder() {
    const getResponse = await makeRequest({
        method: 'GET',
        url: '/api/orders',
    })
    renderProductInOrder(getResponse.orders)
}


function renderProductInCart(cartList) {
    const cart = document.getElementById('order-items')
    if (cartList.length === 0){
        const msg = document.createElement('div')
        msg.textContent = 'Ваша корзина пока что пуста'
        cart.appendChild(msg)
        const card = document.getElementById('order-cardd')
        const footer = document.getElementById('order-footer')
        card.removeChild(footer)
        return
    }
    cartList.forEach(cartItem => {
        const item = document.createElement('div')
        item.className = 'order-item'
        const imgItem = document.createElement('img')
        imgItem.src = cartItem.product.image
        imgItem.className = 'item-image'
        const itemDetails = document.createElement('div')
        itemDetails.className = 'item-details'
        const itemName = document.createElement('div')
        itemName.textContent = cartItem.product.name
        itemName.className = 'item-name'
        const itemPrice = document.createElement('div')
        itemPrice.textContent = `${cartItem.product.price} ₽`
        itemPrice.className = 'item-price'
        const itemQuantity = document.createElement('div')
        itemQuantity.textContent = `Количество: ${cartItem.count} Размер: ${cartItem.size}`
        itemQuantity.className = 'item-quantity'
        itemDetails.appendChild(itemName)
        itemDetails.appendChild(itemPrice)
        itemDetails.appendChild(itemQuantity)
        item.appendChild(imgItem)
        item.appendChild(itemDetails)
        cart.appendChild(item)
    })
}

function renderProductInOrder(orderList) {
    const orders = document.getElementById('order-card')
    orderList.forEach(cartItem => {
        console.log(cartItem)
        const order = document.createElement('div')
        order.className = 'order-card'
        const headerOrder = document.createElement('div')
        headerOrder.className = 'order-header'
        const numberOrder = document.createElement('div')
        numberOrder.className = 'order-number'
        numberOrder.textContent = `Заказ №${cartItem.id}`
        headerOrder.appendChild(numberOrder)
        const orderItems = document.createElement('div')
        orderItems.className = 'order-items'
        cartItem.products.forEach(product => {
            const item = document.createElement('div')
            item.className = 'order-item'
            const imgItem = document.createElement('img')
            imgItem.src = product.image
            imgItem.className = 'item-image'
            const itemDetails = document.createElement('div')
            itemDetails.className = 'item-details'
            const itemName = document.createElement('div')
            itemName.textContent = product.name
            itemName.className = 'item-name'
            const itemPrice = document.createElement('div')
            itemPrice.textContent = `${product.price} ₽`
            itemPrice.className = 'item-price'
            itemDetails.appendChild(itemName)
            itemDetails.appendChild(itemPrice)
            item.appendChild(imgItem)
            item.appendChild(itemDetails)
            orderItems.appendChild(item)
        })
        order.appendChild(headerOrder)
        order.appendChild(orderItems)
        orders.appendChild(order)
    })
}

window.allBuyFromCart = allBuyFromCart;
window.logout = logout;

