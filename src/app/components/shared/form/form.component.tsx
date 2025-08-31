import React, { useEffect, useState } from "react";
import GoButton from "../button/button.component";
import "./form.component.scss";
import { useTranslation } from "react-i18next";

interface FormProps {
    post: {
        userId: number;
        title: string;
        body: string;
        category: string;
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
    const { t } = useTranslation();
    
    const categories = [
        t("APP.C.FASHION"),
        t("APP.C.TECNO"), 
        t("APP.C.INF"),,
        t("APP.C.SPORTS"),,
        t("APP.C.ENT"),,
        t("APP.C.GEN"),
    ];

    return (
        <div className="post-form">
            <div className="post-form__content">
                <h2 className="post-form__title">{formTitle}</h2>
                <form className="post-form__form" onSubmit={onSubmit}>
                    <label className="post-form__label">{t("APP.CP.T")}</label>
                    <input
                        type="text"
                        className="post-form__input"
                        value={post.title}
                        onChange={(e) => setPost("title", e.target.value)}
                        required
                        data-cy="title"
                    />

                    <label className="post-form__label">{t("APP.CP.C")}</label>
                    <textarea
                        className="post-form__textarea"
                        value={post.body}
                        onChange={(e) => setPost("body", e.target.value)}
                        required
                        data-cy="body"
                    ></textarea>

                    <label className="post-form__label">{t("APP.CATEGORY")}</label>
                    <select
                        className="post-form__select"
                        value={post.category}
                        onChange={(e) => setPost("category", e.target.value)}
                        required
                        data-cy="category"
                    >
                        <option value="">{t("APP.C.SELECTION")}</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category!.charAt(0).toUpperCase() + category!.slice(1)}
                            </option>
                        ))}
                    </select>

                    <div className="post-form__buttons">
                        <GoButton text={t("APP.GB.SAVE")} variant="submit" data-cy="saveButton"/>
                        <GoButton
                            text={t("APP.GB.CANCEL")}
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