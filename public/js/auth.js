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

export const logout = async () => {
    try {
        await axios({
            method: 'POST',
            url: '/api/v1/users/logout'
        })
        location.assign('/login')
    }
    catch (err) {
        displayAlert(err.response.data.message)
    }
}

export const register = async (username, password) => {
    const inviteToken = location.pathname.split('/')[2]
    try {
        await axios({
            method: 'POST',
            url: `/api/v1/users/register/${inviteToken}`,
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