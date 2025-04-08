import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation, useGetPostQuery } from "../../../store/slices/postSlice"; 
import Form from "../../shared/form/form.component";
import "./createPost.component.scss";

interface Post {
  userId: number;
  title: string;
  body: string;
}
interface CreatePostFormProps {
  onClose: () => void;
  onPostCreated: () => void;
}

const initialPostState: Post = {
  userId: 0,
  title: "",
  body: "",
};

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  onPostCreated,
}) => {
  const navigate = useNavigate();
  const [post, setPost] = useState(initialPostState);
  const [createPost] = useCreatePostMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post.title || !post.body) return;

    try {
      const userData = localStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;
      const userId = user?.id ?? 0;

      const newPost = await createPost({
        userId,
        title: post.title,
        body: post.body,
      }).unwrap();

      console.log("Post creado:", newPost);
      onPostCreated();

      navigate("/", { state: { refetch: true } });
    } catch (error) {
      console.error("Error al crear el post:", error);
    }
  };

  return (
    <Form
      post={post}
      setPost={(key, value) =>
        setPost((post) => ({ ...post, [key]: value }))
      }
      onSubmit={handleSubmit}
      onCancel={() => navigate("/")}
      formTitle="Crear Nuevo Post"
    />
  );
};

export default CreatePostForm;
