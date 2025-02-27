import React from "react";
import PostList from "../components/content/PostList";
import Breadcrumbs from "../components/shared/breadcrumbs/breadcrumb.component";

const HomePage: React.FC = () => {
    return (
        <div>
            <Breadcrumbs />
            <PostList onEdit={() => {}} /> {/* Se pasa una función vacía */}
        </div>
    );
};

export default HomePage;
