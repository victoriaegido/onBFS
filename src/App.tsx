import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./app/components/layout/header/header.component";
import PostsPage from "./app/pages/post.page";
import "./styles/styles.scss";

//Modificar la parte de Bienvenido a la app por una página que sea el inicio
const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <main className="container">
                <Routes>
                    <Route path="/" element={<h1>Bienvenido a la App</h1>} />
                    <Route path="/posts" element={<PostsPage />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
