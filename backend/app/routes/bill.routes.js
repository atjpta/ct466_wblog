const express = require("express");
const bill = require('../controllers/bill.controller')

module.exports = (app) => {
    const router = express.Router();
    router.route("/")
        .post(bill.createBill)
        .delete(bill.deleteAllBill)

    router.route("/:id")
        .get(bill.getListBill)
    router.route("/blog/:id")
        .get(bill.getListBillBlog)
    router.route("/idblog/:id")
        .get(bill.getIdBlog)
    router.route('/detail/:id')
        .get(bill.getBill)

    app.use("/api/bill", router);
};