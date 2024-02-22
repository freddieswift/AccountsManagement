const message = document.querySelector('.message')
export const login = async (username, password) => {
    try {
        await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                username,
                password
            }
        })
        location.assign('/')
    }
    catch (err) {
        message.style.display = 'block'
        message.innerHTML = err.response.data.message
    }
}