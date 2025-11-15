const con = require("./db_connect")

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS Comment (
    commentID INT NOT NULL AUTO_INCREMENT,
    content VARCHAR(280) NOT NULL,
    userID INT,
    images VARCHAR(2083),
    CONSTRAINT commentPK PRIMARY KEY(commentID),
    CONSTRAINT userFK FOREIGN KEY(userID) REFERENCES User(userID)
  );`

  await con.query(sql)
}

createTable()

// Comment example
const comment = {
  content: "This is a comment!",
  userID: 1,
  images: "https://example.com/image.jpg"
}

// Check if a comment exists by ID
async function commentExists(commentID) {
  let sql = `
    SELECT * FROM Comment
    WHERE commentID = ${commentID}
  `
  return await con.query(sql)
}

// CREATE - Adding a new comment
async function addComment(comment) {
  let sql = `
    INSERT INTO Comment (content, userID, images)
    VALUES ("${comment.content}", ${comment.userID}, "${comment.images}")
  `
  await con.query(sql)
  
  // Retrieve the newly created comment to return it
  let newComment = await getLatestCommentByUser(comment.userID)
  return newComment
}

// READ - Get all comments with username
async function getAllComments() {
  let sql = `
    SELECT Comment.*, User.username
    FROM Comment
    LEFT JOIN User ON Comment.userID = User.userID
    ORDER BY Comment.commentID ASC
  `
  return await con.query(sql)
}

// UPDATE - Update a comment's content
async function updateComment(comment) {
  let existingComment = await commentExists(comment.commentID)
  if (!existingComment[0]) throw Error("Comment does not exist!")

  let sql = `
    UPDATE Comment SET content = "${comment.content}", images = "${comment.images}"
    WHERE commentID = ${comment.commentID}
  `
  await con.query(sql)

  // Retrieve the updated comment
  let updatedComment = await commentExists(comment.commentID)
  return updatedComment[0]
}

// DELETE - Delete a comment by ID
async function deleteComment(commentID) {
  let existingComment = await commentExists(commentID)
  if (!existingComment[0]) throw Error("Comment does not exist!")

  let sql = `
    DELETE FROM Comment
    WHERE commentID = ${commentID}
  `
  await con.query(sql)
}

// Get the latest comment by a specific user
async function getLatestCommentByUser(userID) {
  let sql = `
    SELECT * FROM Comment
    WHERE userID = ${userID}
    ORDER BY commentID DESC
    LIMIT 1
  `
  let result = await con.query(sql)
  return result[0]
}

module.exports = { addComment, getAllComments, updateComment, deleteComment }
