import React from "react";
import GoButton from "../button/button.component";
import "./postCard.component.scss";
import { useTranslation } from "react-i18next";
import { IonIcon } from "@ionic/react";
import { eyeOutline } from "ionicons/icons";
import { createOutline } from "ionicons/icons";
import { trashOutline } from "ionicons/icons";

interface PostCardProps {
    title: string;
    body: string;
    category: string;
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    showActions?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
    title,
    body,
    category,
    onView,
    onEdit,
    onDelete,
    showActions = true,
}) => {
    
    const { t } = useTranslation();

    return (
        <div className="post-card" onClick={onView}>
            <div className="category-badge">{category}</div>
            <h3 data-cy="postTitle">{title}</h3>
            <p>{body}</p>
            
            {showActions && (
                <div className="post-card-buttons">
                    {onView && (
                        <GoButton
                            text={t("APP.HOME.VIEW")}
                            variant="view"
                            onClick={(e) => {
                                e.stopPropagation();
                                onView();
                            }}
                            iconSrc={<IonIcon icon={eyeOutline} />}
                        />
                    )}
                    {onEdit && (
                        <GoButton
                            text={t("APP.HOME.EDIT")}
                            variant="submit"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit();
                            }}
                            iconSrc={<IonIcon icon={createOutline}/>}
                        />
                    )}
                    {onDelete && (
                        <GoButton
                            text={t("APP.HOME.DELETE")}
                            variant="cancel"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(e);
                            }}
                            iconSrc={<IonIcon icon={trashOutline} />}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default PostCard;
