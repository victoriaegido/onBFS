import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../../../../store/slices/postSlice";
import { RootState, AppDispatch } from "../../../../store/store";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt, FaSearch } from "react-icons/fa";
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
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    

    useEffect(() => {
        if (posts.length === 0) {
            dispatch(fetchPosts());
        }
    }, [dispatch, posts.length]);


    const filteredPosts = posts.filter((post) => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentPosts = filteredPosts.slice(indexOfFirstPost,indexOfLastPost);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleDelete = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Evita que la tarjeta navegue al hacer clic en "Eliminar"

        if (window.confirm("¿Seguro que quieres eliminar este post?")) {
            try {
                await dispatch(deletePost(id)).unwrap();
                console.log(`Post con ID ${id} eliminado.`);
            } catch (error) {
                console.error("Error al eliminar el post:", error);
            }
        }
    };


    return (
        <div className="post-list-container">
            <h1>Lista de Posts</h1>

            <div className="search-container">
    <input
        type="text"
        placeholder="Buscar por título"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
    />
    <FaSearch className="search-icon" />
</div>

            {loading && <p>Cargando...</p>}
            {error && <p>{error}</p>}

            <div className="post-list">
            {currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                        <div
                            key={post.id ?? Math.random()}
                            className="post-card"
                            onClick={() => navigate(`/editar/${post.id}`)}
                        >
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <div className="post-card-buttons"><button
                                className="delete-btn"
                                onClick={(e) => handleDelete(post.id!, e)}
                            >
                                <FaRegTrashAlt/> Eliminar
                            </button></div>
                    </div>
                ))
             ) : (
                    <p>No se encontraron posts</p>
                )}
            </div>

            <div className="pagination">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                >
                    ◀
                </button>
                {[...Array(Math.ceil(filteredPosts.length / postsPerPage))].map((_, index) => (
                    <button
                        key={index}
                        className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}
                    className="pagination-btn"
                >
                    ▶
                </button>
            </div>

        </div>

        
    );
};

export default PostList;
