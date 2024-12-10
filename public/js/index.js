import { login, logout, register } from './auth.js'
import { createCompany } from './createCompany.js'
import { signUp } from './signUp.js'
import { togglePopUpForm } from './showPopUpForm.js'
import { addYear } from './addYear.js'
import { addPart, deletePart, updatePart } from './part.js'
import { inviteUser, deleteInvite, resendInvite } from './inviteUser.js'

const loginForm = document.querySelector('.loginForm')
const createCompanyForm = document.querySelector('.createCompanyForm')
const registerForm = document.querySelector('.registerForm')
const signupForm = document.querySelector('.signupForm')
const logoutButton = document.querySelector('.logoutButton')
const addYearButton = document.querySelector('.addYearButton')
const inviteUserButton = document.querySelector('.inviteUserButton')
const invitationCards = document.getElementsByClassName('invitationCard')
const yearRows = document.getElementsByClassName('yearRow')
const partRows = document.getElementsByClassName('partRow')
const addPartButton = document.querySelector('.addPartButton')

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

if (registerForm) {
    registerForm.addEventListener('submit', e => {
        e.preventDefault()
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        register(username, password)
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

if (addPartButton) {
    const addPartForm = document.getElementById('addPartForm')
    addPartButton.addEventListener('click', e => {
        togglePopUpForm(addPartForm)
    })
    const cancelButton = addPartForm.getElementsByClassName('cancelButton')
    cancelButton[0].addEventListener('click', e => {
        togglePopUpForm(addPartForm)
    })
    addPartForm.addEventListener('submit', e => {
        e.preventDefault()
        const partNumber = document.getElementById('partNumber').value
        const description = document.getElementById('description').value
        const location = document.getElementById('location').value
        const quantity = document.getElementById('quantity').value
        addPart({
            partNumber,
            description,
            location,
            quantity
        })
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

if (invitationCards.length > 0) {
    for (let invitationCard of invitationCards) {
        const deleteInviteButton = invitationCard.querySelector('.deleteInviteButton')
        const resendInviteButton = invitationCard.querySelector('.resendInviteButton')
        deleteInviteButton.addEventListener('click', e => {
            deleteInvite(invitationCard.id)
        })
        resendInviteButton.addEventListener('click', e => {
            resendInvite(invitationCard.id)
        })
    }
}

if (yearRows) {
    for (let yearRow of yearRows) {
        yearRow.onclick = function () {
            location.href = `/year/${yearRow.id}`
        }
    }
}

if (partRows) {
    const editPartForm = document.getElementById('editPartForm')
    for (let partRow of partRows) {
        partRow.onclick = function (e) {
            togglePopUpForm(editPartForm)

            let partDataArray = Array.from(partRow.childNodes).map(d => d.innerText)

            const partNumberInput = document.getElementById('partNumberEdit')
            const descriptionInput = document.getElementById('descriptionEdit')
            const locationInput = document.getElementById('locationEdit')
            const quantityInput = document.getElementById('quantityEdit')

            partNumberInput.value = partDataArray[0]
            descriptionInput.value = partDataArray[1]
            locationInput.value = partDataArray[2]
            quantityInput.value = partDataArray[3]

            const deleteButton = editPartForm.getElementsByClassName('deleteButton')
            deleteButton[0].addEventListener('click', e => {
                deletePart(partRow.id)
            })

            const saveButton = editPartForm.getElementsByClassName('saveButton')
            saveButton[0].addEventListener('click', e => {
                const part = {
                    partNumber: partNumberInput.value,
                    description: descriptionInput.value,
                    location: locationInput.value,
                    quantity: quantityInput.value
                }

                updatePart(partRow.id, part)
            })
        }
    }

    const cancelButton = editPartForm.getElementsByClassName('cancelButton')
    cancelButton[0].addEventListener('click', e => {
        togglePopUpForm(editPartForm)
    })
}
