const message = document.querySelector('.formMessage')

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
        console.log(err)
        message.style.display = 'block'
        message.innerHTML = err.response.data.message
    }
}