import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../../redux/postSlice";
import { AppDispatch } from "../../../redux/store";

const PostForm: React.FC<{
    postToEdit?: { id: number; title: string; body: string };
}> = ({ postToEdit }) => {
    const [title, setTitle] = useState(postToEdit ? postToEdit.title : "");
    const [body, setBody] = useState(postToEdit ? postToEdit.body : "");
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !body) return;

        if (postToEdit) {
            dispatch(updatePost({ id: postToEdit.id, post: { title, body } }));
        } else {
            dispatch(createPost({ title, body }));
        }

        setTitle("");
        setBody("");
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">
                {postToEdit ? "Actualizar" : "Crear"} Post
            </button>
        </form>
    );
};

export default PostForm;
