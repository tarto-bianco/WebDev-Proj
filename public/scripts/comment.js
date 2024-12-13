let commentForm = document.getElementById("commentForm")
if (commentForm) commentForm.addEventListener('submit', postComment)

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