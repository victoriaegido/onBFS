import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./breadcrumb.component.scss";

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const paths = location.pathname.split("/").filter((path) => path);

    return (
        <nav className="breadcrumbs">
            <Link to="/">Inicio</Link>
            {paths.map((path, index) => {
                const url = `/${paths.slice(0, index + 1).join("/")}`;
                return (
                    <span key={index} className="breadcrumbs-separator">
                        {"/ "}
                        <Link to={url}>{path}</Link>
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
