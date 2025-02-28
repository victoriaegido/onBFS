import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { updatePost } from "../../../store/slices/postSlice";
import { fetchPosts } from "../../../store/slices/postSlice";

const PostForm: React.FC = () => {
    const { id } = useParams();
    const postId = Number(id);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const posts = useSelector((state: RootState) => state.posts.posts);

    useEffect(() => {
        if (posts.length === 0) {
            console.log("No hay posts, cargando desde la API...");
            dispatch(fetchPosts());
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
            await dispatch(
                updatePost({ id: postToEdit.id, post: { title, body } })
            ).unwrap();
            navigate("/");
        } catch (error) {
            console.error("Error actualizando el post:", error);
        }
    };

    return (
        <div className="edit-post-page">
            <div className="edit-post-page__content">
                <h2 className="edit-post-page__title">Editar Post</h2>
                <form className="edit-post-page__form" onSubmit={handleUpdate}>
                    <label className="edit-post-page__label">Título:</label>
                    <input
                        type="text"
                        className="edit-post-page__input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label className="edit-post-page__label">Contenido:</label>
                    <textarea
                        className="edit-post-page__textarea"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    ></textarea>

                    <div className="edit-post-page__buttons">
                        <button
                            type="submit"
                            className="edit-post-page__button edit-post-page__button--save"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            className="edit-post-page__button edit-post-page__button--cancel"
                            onClick={() => navigate("/")}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostForm;
