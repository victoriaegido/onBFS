import React from "react";
import "./button.component.scss";

interface GoButtonProps {
    text: string;
    variant?: "submit" | "cancel";
    onClick?:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | (() => void);
    className?: string;
    iconSrc?: React.ReactElement;
}

const GoButton: React.FC<GoButtonProps> = ({
    text,
    variant,
    onClick,
    className = "",
    iconSrc,
}) => {
    return (
        <button
            className={`go-button go-button--${variant} ${className}`}
            onClick={onClick}
        >
            {iconSrc}
            {text}
        </button>
    );
};

export default GoButton;
