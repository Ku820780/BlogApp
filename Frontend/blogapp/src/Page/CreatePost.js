import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost, updatePost } from "../Redux/Features/postSlice";

function CreatePost() {
  const { userProfile } = useSelector((state) => state.user);
  const { post } = useSelector((state) => state.post);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [postdata, setPostData] = useState({
    title: "",
    content: "",
    auther: "",
    file: "",
  });

  const handleCreatePost = (e) => {
    e.preventDefault();

    if (post.updateClicked === undefined) {
      const formdata = new FormData();
      formdata.append("title", postdata.title);
      formdata.append("content", postdata.content);
      formdata.append("auther", postdata.auther);
      formdata.append("file", postdata.file);
      dispatch(createPost(formdata));
      navigate("/listpost");
    } else {
      dispatch(updatePost({ postId: post?._id, postData: postdata }));
      navigate("/listpost");
    }
  };

  useEffect(() => {
    if (userProfile.name === undefined) {
      navigate("/");
    }
    setPostData({
      content: post.content,
      auther: post.auther,
      title: post.title,
    });
  }, []);

  return (
    <div className="container">
      <div className="col-sm-4 offset-sm-4 mt-5">
        <form onSubmit={handleCreatePost}>
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter Title"
            className="mb-4 form-control"
            value={postdata.title}
            onChange={(e) =>
              setPostData({ ...postdata, title: e.target.value })
            }
          />
          <label htmlFor="description" className="form-label">
          Content
          </label>
          <input
            as="textarea"
            className="form-control mb-4"
            placeholder="Content"
            value={postdata.content}
            onChange={(e) =>
              setPostData({ ...postdata, content: e.target.value })
            }
          />
          <label htmlFor="description" className="form-label">
          Auther
          </label>
          <input
            as="textarea"
            className="form-control mb-4"
            placeholder="Auther"
            value={postdata.auther}
            onChange={(e) =>
              setPostData({ ...postdata, auther: e.target.value })
            }
          />
          {post.updateClicked === undefined ? (
            <>
              <label htmlFor="upload" className="form-label">
                Upload
              </label>
              <input
                type="file"
                className="form-control"
                onChange={(e) =>
                  setPostData({ ...postdata, file: e.target.files[0] })
                }
              />
            </>
          ) : null}
          <div className="d-grid gap-2 mt-5">
            <button
              type="submit"
              className={`${
                post.updateClicked === undefined
                  ? "btn btn-primary"
                  : "btn btn-warning"
              }`}
            >
              {post.updateClicked === undefined ? "Create Post" : "Update Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
