import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../../store/slices/postSlice";
import { AppDispatch } from "../../../store/store";

interface Post {
    id: number;
    title: string;
    body: string;
}

interface PostFormProps {
    postToEdit?: Post;
    onClose: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ postToEdit, onClose }) => {
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
        onClose(); // Call onClose after form submission
    };

    return (
        <div>
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
                <button type="button" onClick={onClose}>
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default PostForm;
