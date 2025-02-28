import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createPost } from "../../../../store/slices/postSlice";
import "./createPost.component.scss";

interface CreatePostFormProps {
    onClose: () => void;
    onPostCreated: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({
    onClose,
    onPostCreated,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !body) return;

        try {
            await dispatch(createPost({ title, body })).unwrap();
            onPostCreated();
        } catch (error) {
            console.error("Error al crear el post:", error);
        }
    };

    return (
        <div className="design-system-page">
            <div className="design-system-page__content">
                <h2 className="design-system-page__content__title">
                    Crear Nuevo Post
                </h2>
                <form
                    className="design-system-page__content__form"
                    onSubmit={handleSubmit}
                >
                    <label className="design-system-page__content__label">
                        Título:
                    </label>
                    <input
                        type="text"
                        className="design-system-page__content__input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label className="design-system-page__content__label">
                        Contenido:
                    </label>
                    <textarea
                        className="design-system-page__content__textarea"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    ></textarea>

                    <div className="design-system-page__content__buttons">
                        <button
                            type="submit"
                            className="design-system-page__content__button design-system-page__content__button--submit"
                        >
                            Publicar
                        </button>
                        <button
                            type="button"
                            className="design-system-page__content__button design-system-page__content__button--cancel"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePostForm;
