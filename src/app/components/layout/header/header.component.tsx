import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import "./header.component.scss"; // Estilos SCSS

const Header: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <header className="header">
            <div className="header__logo">
                <img src="/logo.png" alt="Logo" className="header__logo__img" />
            </div>

            <nav className="header__nav">
                <Link to="/" className="header__nav__link">
                    Inicio
                </Link>
                <Link to="/posts" className="header__nav__link">
                    Posts
                </Link>
                <Link to="/about" className="header__nav__link">
                    Sobre Nosotros
                </Link>
            </nav>

            {/* Aquí se renderizan los elementos hijos */}
            <div className="header__content">{children}</div>

            <div className="header__user">
                <img
                    src="/user-icon.png"
                    alt="Usuario"
                    className="header__user__icon"
                />
            </div>
        </header>
    );
};

export default Header;
