import React, { useEffect, useState } from "react";
import GoButton from "../button/button.component";
import "./form.component.scss";

interface FormProps {
    title: string;
    body: string;
    setTitle: (value: string) => void;
    setBody: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    formTitle: string;
}

const Form: React.FC<FormProps> = ({
    title,
    body,
    setTitle,
    setBody,
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label className="post-form__label">Contenido:</label>
                    <textarea
                        className="post-form__textarea"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
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
