const express = require("express");
const search = require('../controllers/search.controller')

module.exports = (app) => {
    const router = express.Router();
    router.route("/")
        .get(search.getListSearch)
    
    router.route("/follow/blog/:id")
        .get(search.getListBlog)
    
    router.route("/follow/user/:id")
        .get(search.getListUser)

    app.use("/api/search", router);
};