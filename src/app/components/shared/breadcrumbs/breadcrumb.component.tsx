import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./breadcrumb.component.scss";
import { useTranslation } from "react-i18next";

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const paths = location.pathname.split("/").filter((path) => path);
    const { t } = useTranslation();

    const getTranslatedPath = (path: string) => {
        switch (path) {
          case 'comentario':
            return t('APP.COMMENT');
          case 'crear':
            return t('APP.CREATE');
          case 'editar':
            return t('APP.EDIT');
          default:
            return path.charAt(0).toUpperCase() + path.slice(1);
        }
      };

    return (
        <nav className="breadcrumbs">
            <Link to="/">{t("APP.HOME")}</Link>
            {paths.map((path, index) => {
                const url = `/${paths.slice(0, index + 1).join("/")}`;
                return (
                    <span key={index} className="breadcrumbs-separator">
                        {"/ "}
                        <Link to={url}>{getTranslatedPath(path)}</Link>
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
