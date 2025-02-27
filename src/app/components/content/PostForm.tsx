import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../services/postService"; // Eliminamos `createPost`
import { fetchPosts } from "../../../store/slices/postSlice";
import { AppDispatch } from "../../../store/store"; 

interface PostFormProps {
    postToEdit: { id: number; title: string; body: string }; // Ahora `postToEdit` es obligatorio
    onClose: () => void;
    onPostUpdated: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ postToEdit, onClose, onPostUpdated }) => {
    const dispatch = useDispatch<AppDispatch>(); 
    const [title, setTitle] = useState(postToEdit.title);
    const [body, setBody] = useState(postToEdit.body);

    useEffect(() => {
        setTitle(postToEdit.title);
        setBody(postToEdit.body);
    }, [postToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updatePost(postToEdit.id, { title, body });

        dispatch(fetchPosts());
        onPostUpdated();
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Editar Post</h2>
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
            <button type="submit">Actualizar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
        </form>
    );
};

export default PostForm;
