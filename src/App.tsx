import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./app/components/layout/header/header.component";
import PostsPage from "./app/pages/createPost/post.page";
import "./styles/styles.scss";
import HomePage from "./app/pages/postHome.page";
import "./index.css";
import PostFormPage from "./app/pages/editPost/postform.page";

//Modificar la parte de Bienvenido a la app por una página que sea el inicio
const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <main className="container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/posts" element={<PostsPage />} />
                    <Route path="/crear" element={<PostFormPage />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
