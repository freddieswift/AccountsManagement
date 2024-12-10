import { displayAlert } from "./alert.js"

export const addPart = async (part) => {
    try {
        await axios({
            method: 'POST',
            url: '/api/v1/part',
            data: part
        })
        location.reload()
    }
    catch (err) {
        displayAlert(err.response.data.message)
    }
}

export const deletePart = async (id) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/part/${id}`
        })
        location.reload()
        displayAlert('Part successfully deleted')
    }
    catch (err) {
        displayAlert(err.response.data.message)
    }
}

export const updatePart = async (id, part) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `api/v1/part/${id}`,
            data: part
        })
        location.reload()
        displayAlert('Part successfully updated')
    }
    catch (err) {
        displayAlert(err.response.data.message)
    }
}