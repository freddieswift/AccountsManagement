const alert = document.querySelector('.alert')

export const displayAlert = (message) => {
    alert.innerHTML = message
    alert.classList.add('active')
    setTimeout(() => {
        alert.classList.remove('active')
    }, 5000)
}