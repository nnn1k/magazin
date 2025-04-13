import {makeRequest} from '/frontend/func_js/utils.js';

async function logout() {
        const postResponse = await makeRequest({
            method: 'POST',
            url: '/api/auth/logout',
        })
        if (postResponse) {
            window.location.href = "http://127.0.0.1:8000"
        }
}

window.logout = logout;

