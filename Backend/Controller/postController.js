const mongoose = require("mongoose");
const PostModel = require("../Model/PostModel");

const createPost = (req, res) => {
  PostModel.create({
    title: req.body.title,
    content: req.body.content,
    auther: req.body.auther,
    file: req.file.filename,
    slug: req.id,
  })
    .then((results) => {
      res
        .status(200)
        .json({ message: "Post Created", status: true, data: results });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message, status: false, data: null });
    });
};

const allPost = (req, res) => {
  PostModel.find()
    .then((result) => {
      res.status(200).json({ message: "All Post", status: true, data: result });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message, status: false, data: null });
    });
};

const getPostByUserId = (req, res) => {
  const id = req.id;
  PostModel.find({
    slug: id,
  })
    .then((result) => {
      res.status(200).json({ message: "Post", status: true, data: result });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message, status: false, data: null });
    });
};

const deletepost = (req, res) => {
  const id = req.params.id;
  PostModel.deleteOne({
    _id: id,
  })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Post Deleted", status: true, data: result });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message, status: false, data: null });
    });
};

const updatePost = (req, res) => {
  PostModel.findOneAndUpdate(
    { _id: req.body.postId },
    {
      $set: {
        title: req.body.postData.title,
        content: req.body.postData.content,
        auther: req.body.postData.auther
      },
    },
    { new: true }
  )
    .then((updatedDocument) => {
      res
        .status(200)
        .json({ message: "Post Updated", status: true, data: updatedDocument });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: error.message, status: false, data: null });
    });
};

const searchByTitle = (req, res) => {
  console.log("req.body.search", req.body.search);
  PostModel.find({ $text: { $search: req.body.search } })
    .then((results) => {
      res.status(200).json({ message: "Post", status: true, data: results });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: error.message, status: false, data: null });
    });
};

const filterPostsByDate = (req, res) => {
  const selectedDate = new Date(req.body.date);
  const startDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate()
  );

  const endDate = new Date(selectedDate);
  endDate.setDate(endDate.getDate() + 1);
  PostModel.find({
    createdAt: {
      $gte: startDate, // Greater than or equal to the start of the selected date
      $lt: endDate, // Less than the start of the next day
    },
  })
    .then((results) => {
      res.status(200).json({ message: "Post", status: true, data: results });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: error.message, status: false, data: null });
    });
};

module.exports = {
  createPost,
  allPost,
  getPostByUserId,
  deletepost,
  updatePost,
  getPostByUserId,
  searchByTitle,
  filterPostsByDate,
};
