import "./App.css"
import React from "react";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewAuthor from "./views/new/NewAuthor";
import Login from "./views/login/login";
import ProtectedRoutes from "./middleware/ProtectedRoutes";
import Account from "./views/account/Account";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/newAuthor" element={<NewAuthor />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/me" element={<Account />} />
          <Route path="/blogPosts/:id" element={<Blog />} />
          <Route path="/newBlogPost" element={<NewBlogPost />} />
        </Route>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
