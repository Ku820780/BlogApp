const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createPost, allPost, deletepost, updatePost,
  getPostByUserId,
  searchByTitle,
  filterPostsByDate
} = require("../Controller/postController");
const verifyUser = require("../Middleware/verifyUser");

const postRoute = express.Router();

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

postRoute.post("/createpost", verifyUser, upload.single("file"), createPost);
postRoute.get("/allpost", allPost);
postRoute.get("/userpost", verifyUser, getPostByUserId);
postRoute.get("/deletepost/:id", deletepost);
postRoute.patch("/update", updatePost);
postRoute.post("/search", searchByTitle);
postRoute.post("/searchByDate", filterPostsByDate);

module.exports = { postRoute };
