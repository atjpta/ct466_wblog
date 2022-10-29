const express = require("express");
const gem = require('../controllers/gem.controller')

module.exports = (app) => {
    const router = express.Router();
    router.route("/")
        .get(gem.getListGem)
        .post(gem.createGem)
        .delete(gem.deleteAllGem)

    router.route("/:id")
        .put(gem.updateGem)
        .delete(gem.deleteGem)
    
    router.route("/recharge/:id")
        .put(gem.recharge)

    
    app.use("/api/gem", router);
};