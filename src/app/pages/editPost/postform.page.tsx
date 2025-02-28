import React from "react";
import PostForm from "../../../app/components/content/postForm.component";
import Breadcrumbs from "../../components/shared/breadcrumbs/breadcrumb.component";
import "./post.page.scss";


const EditPage: React.FC = () => {
    return (
        <div>
            <Breadcrumbs />
            <PostForm/>
        </div>
    );
};

export default EditPage;
