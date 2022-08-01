import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import Retrieve from "./components/Retrieve";
import Password from "./components/Password";
import CompShowBlogs from "./components/blog/ShowBlogs";
import CompCreateBlog from "./components/blog/CreateBlog";
import CompEditBlog from "./components/blog/EditBlog";
import styles from './App.module.scss'
import Confirmation_Acount from "./components/Confirmation_Acount";

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/retrieve" element={<Retrieve />} />
          <Route path="/password" element={<Password />} />
          <Route path="/blog" element={ <CompShowBlogs />} />
          <Route path="/create" element={<CompCreateBlog />} />
          <Route path="/edit/:id" element={<CompEditBlog />} />
          <Route path="/confirmation_acount" element={<Confirmation_Acount />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
