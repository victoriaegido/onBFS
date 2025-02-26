import React, { useState } from "react";
import PostList from "../components/content/PostList";
import PostForm from "../components/content/PostForm";

interface Post {
    id: number;
    title: string;
    body: string;
}

interface PostFormProps {
    postToEdit?: Post;
    onClose: () => void;
}

const PostsPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<'view' | 'create' | 'edit'>('view');
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    return (
        <div>
            <h1>Gestión de Posts</h1>
            {viewMode === 'view' && (
                <>
                    <button onClick={() => setViewMode('create')}>Crear Post</button>
                    <PostList onEdit={(post: Post) => {
                        setSelectedPost(post);
                        setViewMode('edit');
                    }} />
                </>
            )}
            {viewMode === 'create' && (
                <PostForm
                    postToEdit={undefined as unknown as Post}
                    onClose={() => setViewMode('view')}
                />
            )}
            {viewMode === 'edit' && selectedPost && (
                <PostForm
                    postToEdit={selectedPost}
                    onClose={() => {
                        setViewMode('view');
                        setSelectedPost(null);
                    }}
                />
            )}
        </div>
    );
};

export default PostsPage;
