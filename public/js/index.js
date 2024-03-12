import { login, logout } from './login.js'
import { createCompany } from './createCompany.js'
import { signUp } from './signUp.js'
import { togglePopUpForm } from './showPopUpForm.js'
import { addYear } from './addYear.js'
import { inviteUser } from './inviteUser.js'

const loginForm = document.querySelector('.loginForm')
const createCompanyForm = document.querySelector('.createCompanyForm')
const signupForm = document.querySelector('.signupForm')
const logoutButton = document.querySelector('.logoutButton')
const addYearButton = document.querySelector('.addYearButton')
const inviteUserButton = document.querySelector('.inviteUserButton')

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

if (logoutButton) {
    logoutButton.addEventListener('click', e => {
        e.preventDefault()
        logout()
    })
}

if (addYearButton) {
    const addYearForm = document.getElementById('addYearForm')
    addYearButton.addEventListener('click', e => {
        togglePopUpForm(addYearForm)
    })
    const cancelButton = addYearForm.getElementsByClassName('cancelButton')
    cancelButton[0].addEventListener('click', e => {
        togglePopUpForm(addYearForm)
    })
    addYearForm.addEventListener('submit', e => {
        e.preventDefault()
        const yearName = document.getElementById('yearName').value
        addYear(yearName)
    })
}

if (inviteUserButton) {
    const inviteUserForm = document.getElementById('inviteUserForm')
    inviteUserButton.addEventListener('click', e => {
        togglePopUpForm(inviteUserForm)
    })
    const cancelButton = inviteUserForm.getElementsByClassName('cancelButton')
    cancelButton[0].addEventListener('click', e => {
        togglePopUpForm(inviteUserForm)
    })
    inviteUserForm.addEventListener('submit', e => {
        e.preventDefault()
        const userEmail = document.getElementById('userEmail').value
        inviteUser(userEmail)
    })
}