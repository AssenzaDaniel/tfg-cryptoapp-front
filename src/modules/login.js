/* eslint-disable no-undef */

export function getUserData(response) {
    const responsePayload = window.atob(response.credential.split('.')[1])

    return JSON.parse(responsePayload)
}

export function handleGoogleLogin(callback) {
    google.accounts.id.initialize({
        client_id: '582817307575-qv7bdvjmd84r1vjnb8gj4p5k5gm7ara6.apps.googleusercontent.com',
        ux_mode: 'popup',
        callback
    })

    google.accounts.id.prompt()
}