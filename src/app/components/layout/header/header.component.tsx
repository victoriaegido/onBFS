import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import "./header.component.scss"; // Asegúrate de que los estilos están bien importados

const Header: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <header className="header">
            {/* Menú de navegación lateral */}
            <div className="header__hierarchy">
                <button className="header__hierarchy__button">☰</button>
                <nav className="header__hierarchy__breadcrumbs">
                    <Link to="/posts" className="breadcrumb-link">
                        Posts
                    </Link>
                    <span className="breadcrumb-separator"> | </span>
                    <Link to="/crear" className="breadcrumb-link">
                        Crear Post
                    </Link>
                </nav>
            </div>

            {/* Logo centrado */}
            <div className="header__logo">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="header__logo__image"
                />
            </div>

            {/* Menú de iconos */}
            <div className="header__menu">
                <div className="header__menu__icon-buttons">
                    <button className="icon-button">🔍</button>
                    <button className="icon-button">⚙️</button>
                </div>
            </div>

            {/* Contenido extra opcional */}
            {children}
        </header>
    );
};

export default Header;
