import {apiUrl, makeRequest} from '/frontend/func_js/utils.js';

async function login() {
    const email = document.getElementById("login-email").value
    const password = document.getElementById("login-password").value
    const postResponse = await makeRequest({
        method: 'POST',
        url: '/api/auth/login',
        data: {
            email,
            password
        }
    })
    if (postResponse) {
        window.location.href = apiUrl + '/profile'
    }
}

async function registration() {
    const name = document.getElementById("register-name").value
    const email = document.getElementById("register-email").value
    const password = document.getElementById("register-password").value
    const confirm_password = document.getElementById("register-confirm-password").value
    const postResponse = await makeRequest({
        method: 'POST',
        url: '/api/auth/register',
        data: {
            name,
            email,
            password,
            confirm_password
        }
    })
    if (postResponse) {
        window.location.href = apiUrl + '/profile'
    }
}

window.login = login;
window.registration = registration;

