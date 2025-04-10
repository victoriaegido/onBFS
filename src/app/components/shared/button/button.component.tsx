import React from "react";
import "./button.component.scss";

interface GoButtonProps {
    text?: string;
    variant?: "submit" | "cancel" | "view";
    onClick?:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | (() => void);
    className?: string;
    iconSrc?: React.ReactElement;
    disabled?: boolean;
}

const GoButton: React.FC<GoButtonProps> = ({
    text,
    variant,
    onClick,
    className = "",
    iconSrc,
    disabled = false,
}) => {
    return (
        <button
            className={`go-button go-button--${variant} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {iconSrc}
            {text}
        </button>
    );
};

export default GoButton;
