import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  deletePost,
  deletePostById,
  getAllPostByUser,
  updateRowSelected,
} from "../Redux/Features/postSlice";
import { backendimage } from "../util/helper";

function ListPost() {
  const { userProfile } = useSelector((state) => state.user);
  const { allPostByUser } = useSelector((state) => state.post);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userProfile.name === undefined) {
      navigate("/");
    }
  }, []);

  const handleDelete = (id) => {
    dispatch(deletePost(id));
    dispatch(deletePostById(id));
  };

  const handleSelectedForUpdate = (data) => {
    const updateData = { ...data, updateClicked: true };
    dispatch(updateRowSelected(updateData));
    navigate("/post");
  };

  const handleCreatePost = () => {
    dispatch(updateRowSelected({}));
    navigate("/post");
  };

  useEffect(() => {
    dispatch(getAllPostByUser());
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-end mt-5">
        <button className="btn btn-primary" onClick={handleCreatePost}>
          Create Post
        </button>
      </div>
      <table className="table table-hover mt-5">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Auther</th>
            <th scope="col">Image</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {allPostByUser &&
            allPostByUser.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.title}</td>
                  <td>{data.content}</td>
                  <td>{data.auther}</td>
                  <td>
                    <img
                      src={`${backendimage}/${data.file}`}
                      height={100}
                      width={100}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleSelectedForUpdate(data)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger" 
                      onClick={() => handleDelete(data?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {allPostByUser.length === 0 && "No Data"}
        </tbody>
      </table>
    </div>
  );
}

export default ListPost;
