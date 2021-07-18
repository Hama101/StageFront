let btnSingIn = document.querySelector("#toggle-1");
let logIn = document.querySelector(".login")
let btnSingUp = document.querySelector("#toggle-2");
let signUp = document.querySelector(".singup")
let btnSingUpTwo = document.querySelector("#toggle-3");
let btnSingInTwo = document.querySelector("#toggle-4");

btnSingIn.addEventListener("click", function () {
    if (signUp.classList.contains("d-none")) {
        signUp.classList.remove("d-none")
        logIn.classList.add("d-none")
    }
})
btnSingInTwo.addEventListener("click", function () {
    if (signUp.classList.contains("d-none")) {
        signUp.classList.remove("d-none")
        logIn.classList.add("d-none")
    }
})
btnSingUp.addEventListener("click", function () {
    if (logIn.classList.contains("d-none")) {
        logIn.classList.remove("d-none")
        signUp.classList.add("d-none")
    }
})
btnSingUpTwo.addEventListener("click", function () {
    if (logIn.classList.contains("d-none")) {
        logIn.classList.remove("d-none")
        signUp.classList.add("d-none")
    }
})
