import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIconsLibrary } from "@goaigua/goaigua-styles/icons/libraries/font-awesome/fontawesome-icons-library";
import GoAiguaIcon from "@goaigua/goaigua-styles/icons/icon.component";
import "./header.component.scss";
import LanguageSwitcher from "../../shared/languageSwitcher/languageSwitcher.component";
import { useTranslation } from "react-i18next";
import { CgDarkMode } from "react-icons/cg";

const Header: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme ? savedTheme : "light";

    const [theme, setTheme] = useState<string>(initialTheme);

    const changeTheme = () => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
    };

    useEffect(() => {
      document.body.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <header className="header">
          <div className="header__hierarchy">
            <button className="header__hierarchy__button">
              <GoAiguaIcon icon={FontAwesomeIconsLibrary.Bars} />
            </button>
            <nav className="header__hierarchy__breadcrumbs">
              <Link to="/" className="breadcrumb-link">Posts</Link>
              <span className="breadcrumb-separator"> | </span>
              <Link to="/crear" className="breadcrumb-link">{t("APP.CP.TITLE")}</Link>
            </nav>
          </div>
    
          <div className="header__menu">
            <div className="header__menu__icon-buttons">
              <button className="icon-button" onClick={() => setMenuOpen(!menuOpen)}>
                <GoAiguaIcon icon={FontAwesomeIconsLibrary.Gear} />
              </button>

              <LanguageSwitcher/>
              <button onClick={changeTheme} className="theme-toggle-button">
                <CgDarkMode size={24} color={theme === "light" ? "#000" : "#fff"} /> 
              </button>
              {menuOpen && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={handleLogout}>
                    {t("APP.LOGOUT")}
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
