const express = require("express");
const report = require('../controllers/report.controller')

module.exports = (app) => {
    const router = express.Router();
    
    router.route("/blog")
        .get(report.getBlogHaveReport)
        .post(report.createReportBlog)
    
    router.route("/question")
        .get(report.getBlogHaveReport)
        .post(report.createReportQuestion)
    
    router.route("/blog/:id_blog/:id_report")
        .delete(report.deleteOneReportBlog)
    
    router.route("/question/:id_blog/:id_report")
        .delete(report.deleteOneReportQuestion)
    
    
    app.use("/api/report", router);
};