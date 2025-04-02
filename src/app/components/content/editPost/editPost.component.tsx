import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPostQuery, useUpdatePostMutation } from "../../../store/slices/postSlice";
import "./editPost.component.scss";
import Form from "../../shared/form/form.component";

const CreatePostForm: React.FC = () => {
    const { id } = useParams();
    const postId = Number(id);
    const navigate = useNavigate();

    const { data: postToEdit, isLoading, isError} = useGetPostQuery(postId);
    const [updatePost] = useUpdatePostMutation();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        if (postToEdit) {
          setTitle(postToEdit.title);
          setBody(postToEdit.body);
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
          await updatePost({ id: postToEdit.id, post: { ...postToEdit, title, body } }).unwrap();
          navigate("/");
        } catch (error) {
          console.error("Error actualizando el post:", error);
        }
      };
    
      if (isLoading) return <p>Cargando post...</p>;
      if (isError) return <p>Error al cargar el post.</p>;
    

    return (
        <Form
            title={title}
            body={body}
            setTitle={setTitle}
            setBody={setBody}
            onSubmit={handleUpdate}
            onCancel={() => navigate("/")}
            formTitle="Editar Post"
        />
    );
};

export default CreatePostForm;
