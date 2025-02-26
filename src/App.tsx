import React from "react";
import PostList from "./app/components/content/PostList";
import "./App.css";
import Header from "./app/components/layout/header/header.component";
import { BrowserRouter } from "react-router-dom";
import PostForm from "./app/components/content/PostForm";

const App: React.FC = () => {
    return (
      <BrowserRouter>
        <div>
              <Header>
              </Header>
              <PostList />
              <PostForm />
          </div>
      </BrowserRouter>
        
    );
};

export default App;
