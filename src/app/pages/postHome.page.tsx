import React from "react";
import PostList from "../components/content/PostList/postList.component";
import Breadcrumbs from "../components/shared/breadcrumbs/breadcrumb.component";

const HomePage: React.FC = () => {
    return (
        <div className="page-layout">
            <Breadcrumbs />
            <div className="home-page__content page__content">
                <PostList />
            </div>
        </div>
    );
};

export default HomePage;
