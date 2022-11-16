const express = require("express");
const blog = require('../controllers/blog.controller')

module.exports = (app) => {
    const router = express.Router()
    router.route("/")
        .get(blog.getListBlog)
        .post(blog.createBlog)
        .delete(blog.deleteAllBlog)
    
    router.route("/:id")
        .get(blog.findOneBlog)
        .put(blog.updateBlog)
        .delete(blog.deleteBlog)

    router.route("/blogUser/:id")
        .get(blog.getListBlogUser)
    
    router.route("/retore/:id")
        .put(blog.restoreBlog)

    router.route("/addhashtag/:id")
        .put(blog.addHashtagtoBlog)

    router.route("/removehashtag/:id")
        .put(blog.removeHashtagtoBlog)

    app.use("/api/blog", router);
};