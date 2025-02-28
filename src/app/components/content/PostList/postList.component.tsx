import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../../store/slices/postSlice";
import { RootState, AppDispatch } from "../../../../store/store";
import { useNavigate } from "react-router-dom";
import "./postlist.component.scss";

interface Post {
    id: number;
    title: string;
    body: string;
}

interface PostListProps {
    onEdit: (post: Post) => void;
}

const PostList: React.FC<PostListProps> = ({ onEdit }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { posts, loading, error } = useSelector(
        (state: RootState) => state.posts
    );

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div className="post-list-container">
            <h1>Lista de Posts</h1>
            {loading && <p>Cargando...</p>}
            {error && <p>{error}</p>}

            <div className="post-list">
                {posts.map((post) => (
                    <div key={post.id ?? Math.random()}
                         className="post-card"
                         onClick={() => navigate(`/editar/${post.id}`)}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <div className="post-card-buttons">
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;
