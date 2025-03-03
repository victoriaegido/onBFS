import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { FaCog, FaBars } from "react-icons/fa"; // Importamos íconos de FontAwesome
import "./header.component.scss"; // Asegúrate de que los estilos están bien importados

const Header: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <header className="header">
            {/* Menú de navegación lateral */}
            <div className="header__hierarchy">
                <button className="header__hierarchy__button">
                    <FaBars /> {/* Icono de menú */}
                </button>
                <nav className="header__hierarchy__breadcrumbs">
                    <Link to="/" className="breadcrumb-link">
                        Posts
                    </Link>
                    <span className="breadcrumb-separator"> | </span>
                    <Link to="/crear" className="breadcrumb-link">
                        Crear Post
                    </Link>
                </nav>
            </div>

            {/* Menú de la derecha */}
            <div className="header__menu">
                <div className="header__menu__icon-buttons">
                    <button className="icon-button">
                        <FaCog /> {/* Icono de configuración */}
                    </button>
                </div>
            </div>

            {children}
        </header>
    );
};

export default Header;
