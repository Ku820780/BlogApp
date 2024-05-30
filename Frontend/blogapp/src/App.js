import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPost from "./Page/ListPost";
import Home from "./Page/Home";
import Register from "./Page/Register";
import Login from "./Page/Login";
import NavbarComponent from "./Components/NavbarComponent";
import SharedProfile from "./Components/SharedProfile";
import CreatePost from "./Page/CreatePost";

function App() {
  return (
    <>
      <SharedProfile>
        <BrowserRouter>
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/listpost" element={<ListPost />} />
            <Route path="/post" element={<CreatePost />} />
          </Routes>
        </BrowserRouter>
      </SharedProfile>
    </>
  );
}

export default App;

