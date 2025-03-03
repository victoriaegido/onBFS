import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./app/components/layout/header/header.component";
import "./styles/styles.scss";
import "./index.css";
import AppRoutes from "./app/routes/app-routes";

//Modificar la parte de Bienvenido a la app por una página que sea el inicio
const App: React.FC = () => {
    return (
        <Router>
            <div className="page">
                <Header />
                <main className="page__content">
                    <AppRoutes/>
                </main>
            </div>
        </Router>
    );
};

export default App;
