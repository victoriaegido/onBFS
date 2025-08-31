import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.component.scss";
import LanguageSwitcher from "../../shared/languageSwitcher/languageSwitcher.component";
import { useTranslation } from "react-i18next";
import { CgDarkMode } from "react-icons/cg";
import { IonIcon } from "@ionic/react";
import { settingsOutline } from "ionicons/icons";
import { personCircleOutline } from "ionicons/icons";
import UserProfile from "../../../pages/userProfile/userProfile.page";

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
           {/* <button className="header__hierarchy__button">
              <GoAiguaIcon icon={FontAwesomeIconsLibrary.Bars} />
            </button>*/}
            <nav className="header__hierarchy__breadcrumbs">
              <button className="header__hierarchy__button" onClick={() => {navigate('/perfil');}}>
                <IonIcon icon={personCircleOutline} />
                <Link to="/perfil"/>
              </button>
              <Link to="/" className="breadcrumb-link">{t("APP.P.TITLE")}</Link>
              <span className="breadcrumb-separator"> | </span>
              <Link to="/crear" className="breadcrumb-link" data-cy="breadcrumbCreate">{t("APP.CP.TITLE")}</Link>
              <span className="breadcrumb-separator"> | </span>
              <Link to="/graficas" className="breadcrumb-link">{t("APP.GRAPH")}</Link>
            </nav>
          </div>
    
          <div className="header__menu">
            <div className="header__menu__icon-buttons">
              <button className="icon-button" onClick={() => setMenuOpen(!menuOpen)}>
                <IonIcon icon={settingsOutline} />
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
