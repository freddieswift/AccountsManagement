import { displayAlert } from "./alert.js"

export const addYear = async (yearName) => {
    try {
        await axios({
            method: 'POST',
            url: '/api/v1/year',
            data: {
                name: yearName
            }
        })
        location.reload()
    }
    catch (err) {
        displayAlert(err.response.data.message)
    }
}