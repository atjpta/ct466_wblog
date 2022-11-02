const express = require("express");
const hashtag = require('../controllers/hashtag.controller');
const withoutDulicate = require('../middlewares/withoutDuplicates')

module.exports = (app) => {
    const router = express.Router();
    router.route("/")
        .get(hashtag.getListHashtag)
        .post([withoutDulicate.checkDuplicateHashtag], hashtag.createHashtag)
        .delete(hashtag.deleteAllHashtag)

    router.route("/:id")
        .get(hashtag.findBlogOnHashtag)
        .put(hashtag.addBlogToHashtag)

    router.route("/add/:id")
        .put(hashtag.addBlogToHashtag)

    router.route("/remove/:id")
        .put(hashtag.removeBlogToHashtag)
    
    router.route("/question")
        .post([withoutDulicate.checkDuplicateHashtag], hashtag.createHashtagQuestion)
    
    router.route("/question/remove/:id")
        .put(hashtag.removeQuestionToHashtag)

    app.use("/api/hashtag", router); 
};