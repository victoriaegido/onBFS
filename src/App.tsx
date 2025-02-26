import React from "react";
import "./App.css";
import Header from "./app/components/layout/header/header.component";
import { BrowserRouter } from "react-router-dom";

import PostsPage from "./app/pages/post.page";

const App: React.FC = () => {
    return (
      <BrowserRouter>
        <div>
              <Header>
              </Header>
              <PostsPage />
          </div>
      </BrowserRouter>
        
    );
};

export default App;
