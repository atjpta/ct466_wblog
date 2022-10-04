const express = require("express");
const comment = require('../controllers/comment.controller')

module.exports = (app) => {
    const router = express.Router();
    router.route("/")
        .get(comment.getListComment)
        .post(comment.createComment)
        .delete(comment.deleteAllComment)

    app.use("/api/comment", router);
};