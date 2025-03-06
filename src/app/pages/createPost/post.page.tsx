import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CreatePostForm from "../../components/content/createPost/createPost.component";
import { AppDispatch } from "@/app/store/store";
import Breadcrumbs from "../../components/shared/breadcrumbs/breadcrumb.component";

const CreatePostPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [showForm, setShowForm] = useState(true);

    const handlePostCreated = () => {
        setShowForm(false);
    };

    return (
        <div>
            <Breadcrumbs />
            {showForm && (
                <CreatePostForm
                    onClose={() => setShowForm(false)}
                    onPostCreated={handlePostCreated}
                />
            )}
        </div>
    );
};

export default CreatePostPage;
