import {makeRequest} from '/frontend/func_js/utils.js';

document.addEventListener('DOMContentLoaded', function () {
    getProductsInCart()
    console.log('123')
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

async function getProductsInCart() {
    const getResponse = await makeRequest({
        method: 'GET',
        url: '/api/carts',
    })
    renderProductInCart(getResponse.carts)

}

function renderProductInCart(cartList){
    console.log(cartList)
    const cart = document.getElementById('order-items')
    cartList.forEach(cartItem =>{
        console.log(cartItem)
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

window.logout = logout;

