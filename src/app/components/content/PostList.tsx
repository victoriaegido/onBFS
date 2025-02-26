import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../../../store/slices/postSlice";
import { RootState, AppDispatch } from "../../../store/store";

const PostList: React.FC = () => {
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
                        {post.title}
                        <button onClick={() => dispatch(deletePost(post.id!))}>
                             Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
