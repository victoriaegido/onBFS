import React, { useState } from "react";
import { useLoginMutation, useGetUsersQuery } from "../../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import GoButton from "../button/button.component";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "../form/form.component.scss";
import "./loginForm.component.scss";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const { data: users = [] } = useGetUsersQuery();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await login({ name, password }).unwrap();
  
      if (response === "Successful") {
        localStorage.setItem("isAuthenticated", "true");
  
        if (users && users.length > 0) {
          const userMatch = users.find((user) => user.name === name);
          console.log(userMatch);
  
          if (userMatch && userMatch.id !== undefined) {
            localStorage.setItem(
              "user",
              JSON.stringify({ id: userMatch.id, name: userMatch.name })
            );
            setTimeout(() => navigate("/"), 300);
          } else {
            console.log("Usuario no encontrado en la lista de usuarios.");
          }
        } else {
          console.warn("La lista de usuarios está vacía o no disponible");
        }
      } else {
        console.log("Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  return (
    <div className="post-form">
      <div className="post-form__content">
        <h2 className="post-form__title">Iniciar Sesión</h2>
        <form className="post-form__form" onSubmit={handleLogin}>
          <label 
            className="post-form__label"
            htmlFor="name">Usuario</label>
          <input
            type="text"
            className="post-form__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            name="name"
            autoComplete="username"
            id="name"
          />

          <label 
            className="post-form__label"
            htmlFor="password">Contraseña</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              className="post-form__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              name="password"
              autoComplete="current-password"
              id="password"
            />
            <button
              type="button"
              onClick={PasswordVisibility} 
              className="password-toggle-btn"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />} 
            </button>
          </div>

          <div className="go-button-container">
            <GoButton text="Entrar" variant="submit" />
          </div>

          <p className="register-link">
            ¿No tienes cuenta?{" "}
            <Link to="/register">Regístrate aquí</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;