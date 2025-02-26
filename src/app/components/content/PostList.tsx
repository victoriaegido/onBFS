import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../../../store/slices/postSlice";
import { RootState, AppDispatch } from "../../../store/store";

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
    const { posts, loading, error } = useSelector(
        (state: RootState) => state.posts
    );

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div>
            <h1>Lista de Posts</h1>
            {loading && <p>Cargando...</p>}
            {error && <p>{error}</p>}
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <button onClick={() => onEdit({ id: post.id ?? 0, title: post.title, body: post.body })}>Editar</button>
                        <button onClick={() => dispatch(deletePost(post.id ?? 0))}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
