const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      index: true,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    auther:{
        type: String,
        required: true,
    },
    file: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const PostModel = mongoose.model("posts", PostSchema);
module.exports = PostModel;
