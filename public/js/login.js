import { displayAlert } from "./alert.js"

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
        displayAlert(err.response.data.message)
    }
}