const login = async (username, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                username,
                password
            }
        })
        console.log(res)
    }
    catch (err) {
        console.log(err.response.data)
    }
}

document.querySelector('.loginForm').addEventListener('submit', e => {
    e.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    login(username, password)
})