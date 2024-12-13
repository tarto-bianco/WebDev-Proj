// let username = document.getElementById("username").value
// let password = document.getElementById("password").value 
// let firstName = document.getElementById("firstName").value 
// let lastName = document.getElementById("lastName").value 
// let email = document.getElementById("email").value 

// const user = {

//     username: document.getElementById("username").value,
//     password: document.getElementById("password").value,
//     firstName: document.getElementById("firstName").value,
//     lastName: document.getElementById("lastName").value,
//     email: document.getElementById("email").value,

// }

let loginForm = document.getElementById("loginForm")
if(loginForm) loginForm.addEventListener('submit', login)

function login(e) {
  e.preventDefault()

  const user = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  }

  console.log(user)
}


let registerForm = document.getElementById("registerform")
if(registerForm) registerForm.addEventListener('submit', register)

function register(e) {

    e.preventDefault()

    const user = {

        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        email: document.getElementById("email").value,
    
    }

    console.log(user)
}

