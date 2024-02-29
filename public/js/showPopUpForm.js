export const togglePopUpForm = (form) => {
    if (form.classList.contains('showPopUpForm')) form.classList.remove('showPopUpForm')
    else form.classList.add('showPopUpForm')

}