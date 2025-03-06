import React from "react";
import GoButton from "../button/button.component";
import "./postCard.component.scss";

interface PostCardProps {
    title: string;
    body: string;
    onEdit: () => void;
    onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    editIcon?: string;
    deleteIcon?: string;
}

const PostCard: React.FC<PostCardProps> = ({
    title,
    body,
    onEdit,
    onDelete,
    editIcon,
    deleteIcon,
}) => {
    return (
        <div className="post-card">
            <h3>{title}</h3>
            <p>{body}</p>
            <div className="post-card-buttons">
                <GoButton
                    text="Editar"
                    variant="submit"
                    onClick={onEdit}
                    iconSrc={editIcon}
                />
                <GoButton
                    text="Eliminar"
                    variant="cancel"
                    onClick={(e) => onDelete(e)}
                    iconSrc={deleteIcon}
                />
            </div>
        </div>
    );
};

export default PostCard;
