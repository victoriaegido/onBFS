import React from "react";
import PostList from "../components/content/PostList/postList.component";
import Breadcrumbs from "../components/shared/breadcrumbs/breadcrumb.component";

const HomePage: React.FC = () => {
    return (
        <div className="home-page page">
        <Breadcrumbs />
        <div className="home-page__content page__content">
            <PostList onEdit={() => {}} />
        </div>
    </div>
    );
};

export default HomePage;
