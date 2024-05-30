import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost, searchByDate, searchByTitle } from "../Redux/Features/postSlice";
import { backendimage } from "../util/helper";

function Home() {
  const { allPost } = useSelector((state) => state.post);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPost());
  }, []);

  useEffect(() => {
    if (search && typeof search === "string") {
      dispatch(searchByTitle(search));
    } else {
      dispatch(getAllPost());
    }
  }, [search, dispatch]);

  useEffect(() => {
    if (date) {
      dispatch(searchByDate(date));
    } else {
      dispatch(getAllPost());
    }
  }, [date, dispatch]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between mt-5">
        <div>
          <input
            placeholder="Search title"
            className="form-control"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <input
            className="btn btn-primary"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
      <div className="row mt-5">
        {allPost &&
          allPost.map((data, index) => {
            return (
              <div key={index} className="col-sm-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{data?.title}</h5>
                    <p className="card-text">{data?.content}</p>
                    <p className="card-text">{data?.auther}</p>
                  </div>
                  <img
                    src={`${backendimage}/${data?.file}`}
                    className="card-img-top"
                    alt="..."
                    height={200}
                  />
                </div>
              </div>
            );
          })}
        {allPost && allPost.length === 0 && (
          <h1 className="text-center">No Data</h1>
        )}
      </div>
    </div>
  );
}

export default Home;
