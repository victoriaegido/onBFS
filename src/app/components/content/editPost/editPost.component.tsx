import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPostQuery, useUpdatePostMutation } from "../../../store/slices/postSlice";
import "./editPost.component.scss";
import Form from "../../shared/form/form.component";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const EditPostForm: React.FC = () => {
  const { id } = useParams();
  const postId = Number(id);
  const navigate = useNavigate();

  const { data: postToEdit, isLoading, isError } = useGetPostQuery(postId);
  const [updatePost] = useUpdatePostMutation();

  const [post, setPost] = useState({ userId: 0, title: "", body: "" });

  const { t } = useTranslation();

  useEffect(() => {
    if (postToEdit) {
      setPost({ userId: postToEdit.userId, title: postToEdit.title, body: postToEdit.body });
    }
  }, [postToEdit]);

  useEffect(() => {
    if (!isLoading && !postToEdit) {
      navigate("/");
    }
  }, [isLoading, postToEdit, navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postToEdit || !postToEdit.id) return;

    try {
      await updatePost({ id: postToEdit.id, post }).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Error actualizando el post:", error);
    }
  };

  if (isLoading) return <p>Cargando post...</p>;
  if (isError) return <p>Error al cargar el post.</p>;

  return (
    <Form
      post={post}
      setPost={(key, value) =>
        setPost((post) => ({ ...post, [key]: value }))
      }
      onSubmit={handleUpdate}
      onCancel={() => navigate("/")}
      formTitle={t("APP.EDIT.TITLE")}
    />
  );
};

export default EditPostForm;
