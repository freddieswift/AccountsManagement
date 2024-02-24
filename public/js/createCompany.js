import { displayAlert } from "./alert.js"

export const createCompany = async (name) => {
    try {
        await axios({
            method: 'POST',
            url: '/api/v1/company',
            data: {
                name
            }
        })
        location.assign('/')
    }
    catch (err) {
        displayAlert(err.response.data.message)
    }
}