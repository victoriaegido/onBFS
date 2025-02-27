import React, { useEffect, useState } from "react";
import { getPosts } from "@services/postService";

interface Post {
    id: number;
    title: string;
    body: string;
}

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const limit = 5; // Número de posts por página

    useEffect(() => {
        fetchPosts();
    }, [page]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const data = await getPosts(page, limit);
            setPosts(data);
            setError(null);
        } catch (err) {
            setError("Error al cargar los posts");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Lista de Posts</h2>
            {loading && <p>Cargando posts...</p>}
            {error && <p>{error}</p>}

            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>

            {/* Controles de paginación */}
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
                <button 
                    onClick={() => setPage(page - 1)} 
                    disabled={page === 1}
                    style={{ padding: "8px 12px", cursor: page === 1 ? "not-allowed" : "pointer" }}
                >
                    Anterior
                </button>
                <span>Página {page}</span>
                <button 
                    onClick={() => setPage(page + 1)}
                    style={{ padding: "8px 12px", cursor: "pointer" }}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default PostList;



/*import React, { useEffect } from "react";
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
                        <button
                            onClick={() =>
                                onEdit({
                                    id: post.id ?? 0,
                                    title: post.title,
                                    body: post.body,
                                })
                            }
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => dispatch(deletePost(post.id ?? 0))}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;*/