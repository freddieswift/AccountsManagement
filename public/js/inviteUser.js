import { displayAlert } from "./alert.js"

export const inviteUser = async (email) => {
    try {
        await axios({
            method: 'POST',
            url: '/api/v1/users/invite',
            data: {
                email
            }
        })
        location.reload()
    }
    catch (err) {
        displayAlert(err.response.data.message)
    }
}