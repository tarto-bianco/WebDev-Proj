let loginForm = document.getElementById("loginForm")
if(loginForm) loginForm.addEventListener('submit', login)

    function login(e) {

        e.preventDefault()

        const user = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        }

        console.log(user)

    }
