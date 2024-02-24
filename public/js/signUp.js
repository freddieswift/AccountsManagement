const message = document.querySelector('.formMessage')

export const signUp = async (email, username, password) => {
    try {
        await axios({
            method: 'POST',
            url: '/api/v1/users/',
            data: {
                email,
                username,
                password
            }
        })
        location.assign('/createCompany')
    }
    catch (err) {
        message.style.display = 'block'
        message.innerHTML = err.response.data.message
    }
}