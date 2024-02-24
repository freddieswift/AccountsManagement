import { login } from './login.js'
import { createCompany } from './createCompany.js'

const loginForm = document.querySelector('.loginForm')
const createCompanyForm = document.querySelector('.createCompanyForm')

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