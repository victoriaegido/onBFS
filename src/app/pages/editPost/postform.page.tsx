import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./postform.page.scss";

const PostFormPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/posts", { title, content });
    navigate("/");
  };

  return (
    <div>
      <h1>Crear/Editar Post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Contenido" value={content} onChange={e => setContent(e.target.value)} />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default PostFormPage;
