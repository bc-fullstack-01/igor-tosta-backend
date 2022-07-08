const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();


router
    .route("/")
    .all(userController.befforeAll)
    .get(userController.getAll)
    .post(userController.post);
    
router
    .param("id", userController.befforeAll)
    .route("/:id")
    .get(userController.getPost)
    .delete(userController.deletePost);
module.exports = router;