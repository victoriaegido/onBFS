import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { updatePost } from "../../../store/slices/postSlice";
import { fetchPosts } from "../../../store/slices/postSlice";
import "./editPost.component.scss";
import Form from "../../shared/form/form.component";

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
        <Form
            title={title}
            body={body}
            setTitle={setTitle}
            setBody={setBody}
            onSubmit={handleUpdate}
            onCancel={() => navigate("/")}
            formTitle="Editar Post"
        />
    );
};

export default PostForm;
