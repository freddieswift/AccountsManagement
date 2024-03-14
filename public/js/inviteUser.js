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

export const deleteInvite = async (inviteID) => {
    try {
        await axios({
            method: 'DELETE',
            url: `/api/v1/users/invite/${inviteID}`
        })
        location.reload()
    }
    catch (err) {
        displayAlert(err.response.data.message)
    }
}

export const resendInvite = async (inviteID) => {
    try {
        await axios({
            method: 'POST',
            url: `/api/v1/users/invite/${inviteID}`
        })
        displayAlert('invitation email has been resent')
    }
    catch (err) {
        displayAlert(err.response.data.message)
    }
}