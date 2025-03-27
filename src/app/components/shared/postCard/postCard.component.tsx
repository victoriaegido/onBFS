import React from "react";
import GoButton from "../button/button.component";
import { FontAwesomeIconsLibrary } from "@goaigua/goaigua-styles/icons/libraries/font-awesome/fontawesome-icons-library";
import GoAiguaIcon from "@goaigua/goaigua-styles/icons/icon.component";
import "./postCard.component.scss";

interface PostCardProps {
    title: string;
    body: string;
    onEdit: () => void;
    onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    editIcon?: React.ReactElement;
    deleteIcon?: React.ReactElement;
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
                    iconSrc={<GoAiguaIcon icon={FontAwesomeIconsLibrary.Pen} />}
                />
                <GoButton
                    text="Eliminar"
                    variant="cancel"
                    onClick={(e) => onDelete(e)}
                    iconSrc={<GoAiguaIcon icon={FontAwesomeIconsLibrary.Trash} />}
                />
            </div>
        </div>
    );
};

export default PostCard;
