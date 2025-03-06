import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { FaCog, FaBars } from "react-icons/fa";
import "./header.component.scss";

const Header: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <header className="header">
            <div className="header__hierarchy">
                <button className="header__hierarchy__button">
                    <FaBars />
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

            <div className="header__menu">
                <div className="header__menu__icon-buttons">
                    <button className="icon-button">
                        <FaCog />
                    </button>
                </div>
            </div>

            {children}
        </header>
    );
};

export default Header;
