import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CreatePostForm from "../../components/content/createPost/createPost.component";
import { AppDispatch } from "@/store/store";
import Breadcrumbs from "../../components/shared/breadcrumbs/breadcrumb.component";

const CreatePostPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [showForm, setShowForm] = useState(true); // Mostrar el formulario por defecto

    const handlePostCreated = () => {
        setShowForm(false); // Cierra el formulario tras crear el post
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
