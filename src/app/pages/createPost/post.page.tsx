import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PostList from "../../components/content/PostList";
import PostForm from "../../components/content/PostForm";
import { fetchPosts } from "../../../store/slices/postSlice";
import { AppDispatch } from "@/store/store";
import Breadcrumbs from "../../components/shared/breadcrumbs/breadcrumb.component";

const PostsPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [showForm, setShowForm] = useState(false);
    const [postToEdit, setPostToEdit] = useState<{ id: number; title: string; body: string } | null>(null);

    const handlePostUpdated = () => {
        dispatch(fetchPosts()); // Recargar la lista tras actualizar un post
    };

    return (
        <div>
            <Breadcrumbs />

            {showForm && postToEdit !== null && (
                <PostForm
                    postToEdit={postToEdit}
                    onClose={() => {
                        setShowForm(false);
                        setPostToEdit(null); // Restablecer el post después de cerrar
                    }}
                    onPostUpdated={handlePostUpdated}
                />
            )}

            <PostList
                onEdit={(post) => {
                    setPostToEdit(post);
                    setShowForm(true);
                }}
            />
        </div>
    );
};

export default PostsPage;
