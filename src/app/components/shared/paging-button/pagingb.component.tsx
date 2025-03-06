import React from "react";
import "./pagingb.component.scss";

interface PaginationButtonProps {
    onClick: () => void;
    disabled?: boolean;
    active?: boolean;
    children: React.ReactNode;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
    onClick,
    disabled = false,
    active = false,
    children,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`pagination-btn ${active ? "active" : ""}`}
        >
            {children}
        </button>
    );
};

export default PaginationButton;
