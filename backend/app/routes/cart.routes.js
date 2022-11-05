const express = require("express");
const cart = require('../controllers/cart.controller')

module.exports = (app) => {
    const router = express.Router();
    router.route("/")
        .post(cart.createCart)
        .delete(cart.deleteAllCart)

    router.route("/:id")
        // id của user
        .get(cart.getCart) 
        // id của cart
        .put(cart.deleteCart)
    
    // id của cart
    router.route('/add/:id')
        .put(cart.addBlogToCart)
    router.route('/remove/:id')
        .put(cart.removeBlogToCart)

    app.use("/api/cart", router);
};