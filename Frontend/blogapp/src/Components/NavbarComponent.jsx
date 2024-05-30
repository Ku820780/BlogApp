import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../Redux/Features/userSlice";

function NavbarComponent() {
  const { userProfile, error } = useSelector((state) => state.user);
  let navigate = useNavigate();
  console.log("suer", userProfile);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userLogout());
    if (error === "") {
      navigate("/");
    } else {
      alert(error);
    }
  };

  return (
    <div className="container-fluid bg-primary text-white p-3">
      <div className="d-flex justify-content-between">
        <div role="button" onClick={() => navigate("/")}>
          Blog
        </div>
        <div className="d-flex justify-content-between">
          {userProfile && userProfile.name !== undefined ? (
            <>
              <button style={{color:"white"}}
                className="btn text-white"
                onClick={() => navigate("/listpost")}
              >
                Post
              </button>
              <button className="btn me-5 text-white">
                {userProfile.name}
              </button>
              <button className="btn btn-warning" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button
              className="btn btn-success ms-5"
              onClick={() => navigate("/login")}
            >
              Login/SignUp
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarComponent;
