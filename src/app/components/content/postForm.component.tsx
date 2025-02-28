import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { updatePost } from "../../services/postService";
import { fetchPosts } from "../../../store/slices/postSlice";
import Breadcrumbs from "../../components/shared/breadcrumbs/breadcrumb.component";


const PostForm: React.FC = () => {
    const { id } = useParams();
    const postId = Number(id); // ✅ Convertir ID a número
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const posts = useSelector((state: RootState) => state.posts.posts);

    useEffect(() => {
        if (posts.length === 0) {
            console.log("No hay posts, cargando desde la API...");
            dispatch(fetchPosts()); // ✅ Carga los posts si Redux está vacío
        }
    }, [dispatch, posts.length]);

    const postToEdit = posts.find((post) => post.id === postId);
    console.log("Post encontrado en Redux:", postToEdit);

    useEffect(() => {
        if (posts.length > 0 && !postToEdit) {
            console.warn("Post no encontrado, redirigiendo...");
            navigate("/");
        }
    }, [postToEdit, posts, navigate]);

    const [title, setTitle] = useState(postToEdit?.title || "");
    const [body, setBody] = useState(postToEdit?.body || "");

    useEffect(() => {
        if (postToEdit) {
            setTitle(postToEdit.title);
            setBody(postToEdit.body);
        }
    }, [postToEdit]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!postToEdit || postToEdit.id === undefined) {
            console.error("Error: No se puede actualizar un post sin ID.");
            return;
        }

        try {
            await updatePost({ id: postToEdit.id, title, body });
            await dispatch(fetchPosts());
            navigate("/");
        } catch (error) {
            console.error("Error actualizando el post:", error);
        }
    };

    return (
        <div className="edit-post-page page"> 
            <div className="edit-post-page__content page__content">
                <h1>Editar Post</h1>
                {postToEdit ? (
                    <form onSubmit={handleUpdate} className="edit-post-form">
                        <input
                            type="text"
                            placeholder="Título"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Contenido"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        <div className="edit-post-buttons">
                            <button type="submit">Actualizar</button>
                            <button type="button" onClick={() => navigate("/")}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                ) : (
                    <p>Cargando post...</p>
                )}
            </div>
        </div>
    );
    
    
}

export default PostForm;
