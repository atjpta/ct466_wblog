const express = require("express");
const search = require('../controllers/search.controller')

module.exports = (app) => {
    const router = express.Router();
    router.route("/")
        .get(search.getListSearch)

    app.use("/api/search", router);
};