const express = require("express");
const { getAllBlogsController, addBlogsController, deleteBlogController, blogUserController, editBlogUserController, likeOfBlogController, blogByIdController } = require("../controllers/blogController");
const router = express.Router();

router.get("/allBlogs", getAllBlogsController)
router.put("/like/:id", likeOfBlogController)
router.post("/addBlogs", addBlogsController)
router.delete("/deleteBlog/:id", deleteBlogController)
router.get("/blogs/:id", blogUserController)
router.put("/editBlogs/:id", editBlogUserController)
router.get("/viewBlog/:id", blogByIdController)

module.exports = router