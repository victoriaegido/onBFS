import React from "react";
import PostList from "./app/components/layout/PostList";
import "./App.css";

const App: React.FC = () => {
    return (
        <div>
            <header>
                <h1>¡Bienvenido a la App de Posts!</h1>
            </header>
            <PostList />
        </div>
    );
};

export default App;
