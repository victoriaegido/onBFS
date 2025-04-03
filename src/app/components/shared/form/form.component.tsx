import React, { useEffect, useState } from "react";
import GoButton from "../button/button.component";
import "./form.component.scss";

interface FormProps {
    post: {
        userId: number;
        title: string;
        body: string;
    }
    setPost: (key: string, value: string | number) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    formTitle: string;
}

const Form: React.FC<FormProps> = ({
    post,
    setPost,
    onSubmit,
    onCancel,
    formTitle,
}) => {
    return (
        <div className="post-form">
            <div className="post-form__content">
                <h2 className="post-form__title">{formTitle}</h2>
                <form className="post-form__form" onSubmit={onSubmit}>
                    <label className="post-form__label">Título:</label>
                    <input
                        type="text"
                        className="post-form__input"
                        value={post.title}
                        onChange={(e) => setPost("title", e.target.value)}
                        required
                    />

                    <label className="post-form__label">Contenido:</label>
                    <textarea
                        className="post-form__textarea"
                        value={post.body}
                        onChange={(e) => setPost("body", e.target.value)}
                        required
                    ></textarea>

                    <div className="post-form__buttons">
                        <GoButton text="Guardar" variant="submit" />
                        <GoButton
                            text="Cancelar"
                            variant="cancel"
                            onClick={onCancel}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
