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

    console.log(user);


  fetchData('/user/login', user, 'POST')
    .then(data => {
      if (!data.message) {
        setCurrentUser(data)
        window.location.href = 'main.html'
      }
    })
    .catch(err => {
      // Show popup alert
      alert('Login Failed: ' + err.message);

      // Also display error in form if error section exists
      let errorSection = document.querySelector("#loginForm .error")
      if (errorSection) {
        errorSection.innerText = err.message;
      }
    });
  }
  
  let registerForm = document.getElementById("registerForm")
  if (registerForm) registerForm.addEventListener('submit', register)
  
  function register(e) {
    e.preventDefault()

    console.log("registering")

    const user = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      firstName: document.getElementById("fname").value,
      lastName: document.getElementById("lname").value,
      email: document.getElementById("email").value,
    }

    console.log(user);
  
    fetchData('/user/register', user, 'POST')
    .then(data => {
      if (!data.message) {
        setCurrentUser(data)
        window.location.href = 'main.html'
      }
    })
    .catch(err => {
      // Show popup alert
      alert('Registration Failed: ' + err.message);

      // Also display error in form if error section exists
      let errorSection = document.querySelector("#registerForm .error")
      if (errorSection) {
        errorSection.innerText = err.message;
      }
    });
  }


  // third form with comment logic and fetchData method can be found under the comment.js file
  

  async function fetchData(route = '', data = {}, methodType) {
    const options = {
      method: methodType,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Only add body for non-GET requests
    if (methodType !== 'GET') {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`http://localhost:3000${route}`, options);
    if (response.ok) {
      return await response.json();
    } else {
      throw await response.json();
    }
  }