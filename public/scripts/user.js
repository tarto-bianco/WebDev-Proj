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


function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  
  let loginForm = document.getElementById("loginForm")
  if (loginForm) loginForm.addEventListener('submit', login)
  
  function login(e) {
    e.preventDefault()
  
    const user = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    }
  
    fetchData('/user/login', user, 'POST')
    .then(data => {
      if (!data.message) {
        setCurrentUser(data)
        window.location.href = 'main.html'
      } else {
        let errorSection = document.querySelector("#login-form .error")
        errorSection.innerText = data.message
      }
    })
    .catch(err => {
      let errorSection = document.querySelector("#login-form .error")
      errorSection.innerText = err.message
    });
  }
  
  let registerForm = document.getElementById("registerForm")
  if (registerForm) registerForm.addEventListener('submit', register)
  
  function register(e) {
    e.preventDefault()
  
    const user = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      firstName: document.getElementById("fname").value,
      lastName: document.getElementById("lname").value,
      email: document.getElementById("email").value,
    }
  
    fetchData('/user/register', user, 'POST')
    .then(data => {
      if (!data.message) {
        setCurrentUser(data)
        window.location.href = 'main.html'
      } else {
        let errorSection = document.querySelector("#register-form .error")
        errorSection.innerText = data.message
      }
    })
    .catch(err => {
      let errorSection = document.querySelector("#register-form .error")
      errorSection.innerText = err.message
    });
  }
  
  function fetchData(url, data, method) {
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
  }