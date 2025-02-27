import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../../../app/components/shared/breadcrumbs/breadcrumb.component";

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
        <div>  {/* Eliminamos clases de estilo innecesarias */}
            <Breadcrumbs />
            <h1>Crear Post</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Contenido"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default PostFormPage;
