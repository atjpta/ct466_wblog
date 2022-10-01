const mongoose = require("mongoose");
const Blog = require("../models/Blog.models");
const User = require('../models/user.models')
//lấy ds blog
exports.getListBlog = async (req, res) => {
    try {
      const listBlog = await Blog.find({ _id: { $ne: req.params.id }, deleted: false }).select([
        "title",
        "summary",
        "cover_image_Url",
        "voted",
        "_id",
        "timestamps",
      ]);
      return res.json(listBlog);
    } catch (error) {
      res.status(500).send("lỗi khi tin Blog")
    }
  };

//lấy 1 bài blog
exports.findOneBlog = async (req, res, next) => {
    const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try{
        const document = await Blog.findOne(condition).populate("author","-__v");
        if(!document) {
            return next (res.status(404).json({ Message: "không thể tìm Blog"}));
        }
        return res.send({
            id: document.id,
            author: {
                id: document.author.id,
                name: document.author.name,
                avatar_Url: document.author.avatar_Url,
            },
            title: document.title,
            voted: document.voted,
            content: document.content,
            comment_Blog: document.comment_Blog,
            time: document.createdAt,

        });
    }
    catch(error) {
        return next(
            res.status(500).json({ Message: ` không thể tìm thấy Blog với id = ${req.params.id} `})
        )
    }
}

//tạo blog
exports.createBlog = async (req, res) => {
    const blog = new Blog({
        author : req.body.author,
        title: req.body.title,
        summary: req.body.summary,      
        content: req.body.content,
        cover_image_Url: req.body.cover_image_Url,
        premium: req.body.premium,
    })
    try {
        const document = await blog.save();
        return res.send(document.id);
    } catch (error) {
        return res.status(500).send({Message :"Không thể tạo blog - " + error.message})
    }
}

//update blog 
exports.updateBlog = async (req, res, next) => {
    if (Object.keys(req.body).length === 0){
        return next (
            res.status(400).json({ Message: "thông tin không thế thay đổi"})
        )
    }
    const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try{
        const document = await Blog.findByIdAndUpdate(condition, req.body, {
            new: true
        });
        if(!document) {
            return next (res.status(404).json({ Message: "không thể tìm thấy Blog"}));
        }
        return res.send({ message: "đã update thành công", body: req.body});
    }
    catch(error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể update Blog với id = ${req.params.id} `})
        )
    }
}


exports.deleteBlog = async (req, res, next) => {
    const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try{
        const document = await Blog.findByIdAndUpdate(condition, {deleted : true});
        if(!document) {
            return next (res.status(404).json({ Message: "không thể tìm thấy Blog"}));
        }
        return res.send({ message: "đã xóa Blog thành công"});
    }
    catch(error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Blog với id = ${req.params.id} `})
        )
    }
}


exports.deleteBlog = async (req, res, next) => {
    const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try{
        const document = await Blog.findByIdAndUpdate(condition, {deleted : true});
        if(!document) {
            return next (res.status(404).json({ Message: "không thể tìm thấy Blog"}));
        }
        return res.send({ message: "đã xóa Blog thành công"});
    }
    catch(error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Blog với id = ${req.params.id} `})
        )
    }
}
exports.restoreBlog =  async (req, res, next) => {
    const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try{
        const document = await Blog.findByIdAndUpdate(condition, {deleted : false});
        if(!document) {
            return next (res.status(404).json({ Message: "không thể tìm thấy Blog"}));
        }
        return res.send({ message: "đã hồi phục Blog thành công"});
    }
    catch(error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Blog với id = ${req.params.id} `})
        )
    }
}

exports.deleteAllBlog = async (req, res, next) => {
    try{
        const data = await Blog.deleteMany({});
        return res.send({ message: `${data.deletedCount}  Blog đã xóa thành công`});
    }
    catch(error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả Blog`})
        )
    }
}



