export const login = async (username, password) => {
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
        location.assign('/')
    }
    catch (err) {
        console.log(err.response.data)
    }
}