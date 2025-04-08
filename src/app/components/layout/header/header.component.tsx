import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIconsLibrary } from "@goaigua/goaigua-styles/icons/libraries/font-awesome/fontawesome-icons-library";
import GoAiguaIcon from "@goaigua/goaigua-styles/icons/icon.component";
import "./header.component.scss";

const Header: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
    };

    return (
        <header className="header">
          <div className="header__hierarchy">
            <button className="header__hierarchy__button">
              <GoAiguaIcon icon={FontAwesomeIconsLibrary.Bars} />
            </button>
            <nav className="header__hierarchy__breadcrumbs">
              <Link to="/" className="breadcrumb-link">Posts</Link>
              <span className="breadcrumb-separator"> | </span>
              <Link to="/crear" className="breadcrumb-link">Crear Post</Link>
            </nav>
          </div>
    
          <div className="header__menu">
            <div className="header__menu__icon-buttons">
              <button className="icon-button" onClick={() => setMenuOpen(!menuOpen)}>
                <GoAiguaIcon icon={FontAwesomeIconsLibrary.Gear} />
              </button>
    
              {menuOpen && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
    
          {children}
        </header>
      );
    };

export default Header;
