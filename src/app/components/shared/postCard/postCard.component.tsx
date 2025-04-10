import React from "react";
import GoButton from "../button/button.component";
import { FontAwesomeIconsLibrary } from "@goaigua/goaigua-styles/icons/libraries/font-awesome/fontawesome-icons-library";
import GoAiguaIcon from "@goaigua/goaigua-styles/icons/icon.component";
import "./postCard.component.scss";
import { useTranslation } from "react-i18next";

interface PostCardProps {
    title: string;
    body: string;
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    showActions?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
    title,
    body,
    onView,
    onEdit,
    onDelete,
    showActions = true,
}) => {
    
    const { t } = useTranslation();

    return (
        <div className="post-card" onClick={onView}>
            <h3>{title}</h3>
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
                            iconSrc={<GoAiguaIcon icon={FontAwesomeIconsLibrary.Eye} />}
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
                            iconSrc={<GoAiguaIcon icon={FontAwesomeIconsLibrary.PenToSquare} />}
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
                            iconSrc={<GoAiguaIcon icon={FontAwesomeIconsLibrary.Trash} />}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default PostCard;
