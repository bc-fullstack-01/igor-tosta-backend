const express = require("express");
const CommentController = require("../controller/commentController");

const router = express.Router();

router
    .param("postId", CommentController.befforeAll)
    .route("/:postId/comments/:id")
    .get(CommentController.getComment)
    .put(CommentController.updateComment)
    .delete(CommentController.deleteComment);

router
    .route("/:postId")
    .post(CommentController.post);

module.exports = router;