import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/app/store/store";
import { createPost } from "../../../store/slices/postSlice";
import Form from "../../shared/form/form.component";
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
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !body) return;

        try {
            let result = await dispatch(createPost({ title, body })).unwrap();
            console.log("Post creado:", result);
            onPostCreated();
            navigate("/");
        } catch (error) {
            console.error("Error al crear el post:", error);
        }
    };

    return (
        <Form
            title={title}
            body={body}
            setTitle={setTitle}
            setBody={setBody}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/")}
            formTitle="Crear Nuevo Post"
        />
    );
};

export default CreatePostForm;
