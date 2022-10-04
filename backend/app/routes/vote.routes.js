const express = require("express");
const vote = require('../controllers/vote.controller')

module.exports = (app) => {
    const router = express.Router();
    router.route("/push/:type/:id")
        .put(vote.pushVoted)

    router.route("/pop/:type/:id")
        .put(vote.popVoted)

    app.use("/api/vote", router);
};