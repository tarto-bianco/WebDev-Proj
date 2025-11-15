// Display welcome message with username
function displayWelcomeMessage() {
  const user = getCurrentUser();
  const welcomeSpan = document.getElementById("welcomeUser");
  const logoutBtn = document.getElementById("logoutBtn");

  if (user && welcomeSpan) {
    welcomeSpan.innerText = `Welcome ${user.username}, `;
    // Show logout button if user is logged in
    if (logoutBtn) {
      logoutBtn.style.display = 'inline';
    }
  }
}

// Logout function
function logout(e) {
  e.preventDefault();
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}

let commentForm = document.getElementById("commentForm")
if (commentForm) {
  commentForm.addEventListener('submit', postComment)
  // Load comments when page loads
  displayComments()
  // Display welcome message
  displayWelcomeMessage()
}

// Add logout event listener
let logoutBtn = document.getElementById("logoutBtn")
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout)
}

function postComment(e) {
  e.preventDefault()

  const user = getCurrentUser();
  if (!user) {
    alert("You must be logged in to post a comment.");
    return;
  }

  const comment = {
    content: document.getElementById("terminalentry").value,
    userID: user.userID,
    username: user.username
  }

  fetchData('/comment/add', comment, 'POST')
  .then(data => {
    if (!data.message) {
      document.getElementById("terminalentry").value = '' // Clear input
      displayComments()
    }
  })
  .catch(err => {
    console.error(err.message)
  });
}

function displayComments() {
  fetchData('/comment/all', {}, 'GET')
  .then(comments => {
    let commentsSection = document.getElementById("comments")
    commentsSection.innerHTML = ''
    comments.forEach(comment => {
      let commentDiv = document.createElement('div')
      commentDiv.innerText = `[${comment.username}] >${comment.content}`
      commentsSection.appendChild(commentDiv)
    })
  })
  .catch(err => {
    console.error(err.message)
  });
}

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
  