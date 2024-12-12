const express = require("express")
const Comment = require("../models/comment")
const router = express.Router()

router
  .get('/getComments', async (req, res) => {
    try {
      const comments = await Comment.getAllComments()
      res.send(comments)
    } catch (err) {
      res.status(401).send({ message: err.message })
    }
  })

  .post('/addComment', async (req, res) => {
    try {
      let newComment = await Comment.addComment(req.body)
      res.send(newComment)
    } catch (err) {
      res.status(401).send({ message: err.message })
    }
  })

  .put('/updateComment', async (req, res) => {
    try {
      let updatedComment = await Comment.updateComment(req.body)
      res.send(updatedComment)
    } catch (err) {
      res.status(401).send({ message: err.message })
    }
  })

  .delete('/deleteComment', async (req, res) => {
    try {
      await Comment.deleteComment(req.body.commentID)
      res.send({ success: "Comment deleted successfully!" })
    } catch (err) {
      res.status(401).send({ message: err.message })
    }
  })

module.exports = router
