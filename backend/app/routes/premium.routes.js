const express = require("express");
const premium = require('../controllers/premium.controller')

module.exports = (app) => {
    const router = express.Router();
    router.route("/")
        .get(premium.getListPremium)
        .post(premium.createPremium)
        .delete(premium.deleteAllPremium)

    router.route("/:id")
        .put(premium.updatePremium)
        .delete(premium.deletePremium)

    router.route("/purchase/:id")
        .put(premium.PurchasePremium)

    app.use("/api/premium", router);
};