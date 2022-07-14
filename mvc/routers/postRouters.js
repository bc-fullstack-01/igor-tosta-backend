const express = require("express");
const PostController = require("../controller/postController");
const router = express.Router();


router
    .route("/")
    .all(PostController.befforeAll)
    .get(PostController.getAll)
    .post(PostController.post);
    
router
    .param("id", PostController.befforeAll)
    .route("/:id")
    .get(PostController.getPost)
    .delete(PostController.deletePost)
    .put(PostController.updatePost);
    
module.exports = router;