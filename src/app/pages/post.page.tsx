import React, { useState } from "react";
//import { Link } from "react-router-dom";
import PostList from "../components/content/PostList";
import PostForm from "../components/content/PostForm";
import Breadcrumbs from "../components/shared/breadcrumbs/breadcrumb.component";

interface Post {
    id: number;
    title: string;
    body: string;
}

const PostsPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<"view" | "create" | "edit">(
        "view"
    );
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    return (
        <div>
            <Breadcrumbs /> {/* Aquí se agregan los Breadcrumbs */}
            <h1>Gestión de Posts</h1>
            {viewMode === "view" && (
                <>
                    <button onClick={() => setViewMode("create")}>
                        Crear Post
                    </button>
                    <PostList
                        onEdit={(post: Post) => {
                            setSelectedPost(post);
                            setViewMode("edit");
                        }}
                    />
                </>
            )}
            {viewMode === "create" && (
                <PostForm
                    postToEdit={undefined}
                    onClose={() => setViewMode("view")}
                />
            )}
            {viewMode === "edit" && selectedPost && (
                <PostForm
                    postToEdit={selectedPost}
                    onClose={() => {
                        setViewMode("view");
                        setSelectedPost(null);
                    }}
                />
            )}
        </div>
    );
};

export default PostsPage;
