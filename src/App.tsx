import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./app/components/layout/header/header.component";
//import PostsPage from "./app/pages/createPost/post.page";
import "./styles/styles.scss";
import HomePage from "./app/pages/postHome.page";
import "./index.css";
import EditPostPage from "./app/pages/editPost/postform.page";
import CreatePostPage from "./app/pages/createPost/post.page";

//Modificar la parte de Bienvenido a la app por una página que sea el inicio
const App: React.FC = () => {
    return (
        <Router>
            <div className="page">
                <Header />
                <main className="page__content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/crear" element={<CreatePostPage />} />
                        <Route path="/editar/:id" element={<EditPostPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
