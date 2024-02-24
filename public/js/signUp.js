import { displayAlert } from "./alert.js"

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
        displayAlert(err.response.data.message)
    }
}