import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation, useGetPostQuery } from "../../../store/slices/postSlice"; // Asegúrate de que la ruta sea la correcta
import Form from "../../shared/form/form.component";
import "./createPost.component.scss";

interface CreatePostFormProps {
  onClose: () => void;
  onPostCreated: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  onPostCreated,
}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [createPost] = useCreatePostMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;

    try {
      const newPost = await createPost({
        userId: 1,
        title,
        body,
      }).unwrap();

      console.log("Post creado:", newPost);
      onPostCreated();
      navigate("/"), { state : { refetch: true}};
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
