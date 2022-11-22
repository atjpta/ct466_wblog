const express = require("express");
const report = require('../controllers/report.controller')

module.exports = (app) => {
    const router = express.Router();
    
    router.route('/')
        .delete(report.deleteAllReport)
        .post(report.createReport)
    
    router.route('/:id')
        .delete(report.deleteOneReport)
    
    router.route('/:type/:id')
        .get(report.getListReportById)
    
    router.route("/blog")
        .get(report.getReportBlog)
    
    router.route("/question")
        .get(report.getReportQuestion)
    
    app.use("/api/report", router);
};