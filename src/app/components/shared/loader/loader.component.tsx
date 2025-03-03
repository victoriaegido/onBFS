import { LoadIndicator } from "devextreme-react";
import styles from "./loader.module.scss";
import "./animation.css";
import { useTranslation } from "react-i18next";

type GoLoaderProps = {
    message?: string | null;
    size?: "sm" | "md" | "lg";
    overlay?: boolean | null;
};

const loaderSizes = {
    sm: { height: 24, width: 24 },
    md: { height: 32, width: 32 },
    lg: { height: 48, width: 48 },
} as const;

export default function GoLoader({
    size = "md",
    message,
    overlay = false,
}: GoLoaderProps) {
    const { t } = useTranslation();
    return (
        <div
            className={`${overlay ? styles["loader-overlay"] : ""} ${
                styles.loader
            } 
			`}
        >
            <LoadIndicator {...loaderSizes[size]} />
            {message && (
                <span className={styles[`loader__text--${size}`]}>
                    {t(message)}
                </span>
            )}
        </div>
    );
}
