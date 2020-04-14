/* eslint-disable linebreak-style */
/* eslint-disable indent */
const impactOutput = document.querySelectorAll('.impact input');
impactOutput.forEach((element) => {
    if (element.value < 1) {
        element.classList.add('danger');
    } else {
        element.classList.remove('danger');
    }
    if (element.classList.contains('money')) {
        element.value = `$${element.value}`;
    }
});
