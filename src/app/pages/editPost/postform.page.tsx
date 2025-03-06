import React from "react";
import PostForm from "../..//components/content/editPost/editPost.component";
import Breadcrumbs from "../../components/shared/breadcrumbs/breadcrumb.component";
import "./post.page.scss";

const EditPage: React.FC = () => {
    return (
        <div className="page-layout">
            <Breadcrumbs />
            <div className="edit-post-content">
                <PostForm />
            </div>
        </div>
    );
};

export default EditPage;
