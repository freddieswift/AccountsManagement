import { login } from './login.js'
import { createCompany } from './createCompany.js'
import { signUp } from './signUp.js'

const loginForm = document.querySelector('.loginForm')
const createCompanyForm = document.querySelector('.createCompanyForm')
const signupForm = document.querySelector('.signupForm')

if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault()
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        login(username, password)
    })
}

if (createCompanyForm) {
    createCompanyForm.addEventListener('submit', e => {
        e.preventDefault()
        const name = document.getElementById('name').value
        createCompany(name)
    })
}

if (signupForm) {
    signupForm.addEventListener('submit', e => {
        e.preventDefault()
        const email = document.getElementById('email').value
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        signUp(email, username, password)
    })
}