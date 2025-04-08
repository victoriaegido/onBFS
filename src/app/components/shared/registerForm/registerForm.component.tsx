import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoButton from "../button/button.component"; 
import { useCreateUserMutation, useGetUsersQuery } from "../../../store/slices/userSlice"; 
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./../form/form.component.scss";
import "./resgisterForm.component.scss";


const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [usenameError, setUsernameError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const { data: users = []} = useGetUsersQuery();
  const [createUser, { isLoading }] = useCreateUserMutation();


  useEffect(() => {
    if (name && users.length > 0) {
      const userExists = users.some(user => user.name === name);
      if (userExists) {
        setUsernameError("Este nombre de usuario ya está en uso");
      } else {
        setUsernameError(null);
      }
    } else {
      setUsernameError(null);
    }
  }, [name, users]);


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !password || !confirmPassword) {
      setFormError("Todos los campos son obligatorios");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Las contraseñas no coinciden");
      return;
    }

    try {
      await createUser({ name, password }).unwrap();
      navigate("/login"); 
    } catch (err) {
      setFormError("Error al registrar el usuario, intente de nuevo.");
      console.error("Registro fallido:", err);
    }
  };

  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const ConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="post-form">
      <div className="post-form__content">
        <h2 className="post-form__title">Registrar Usuario</h2>
        <form className="post-form__form" onSubmit={handleRegister}>
          <div className="post-form__input-container">
            <label className="post-form__label">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="post-form__input"
            />
          </div>

          <div className="post-form__input-container">
            <label className="post-form__label">Contraseña</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="post-form__input"
              />
              <button type="button" onClick={PasswordVisibility} className="password-toggle-btn">
                {showPassword ? <FaRegEyeSlash/> : <FaRegEye/>}
              </button>
            </div>
          </div>

          <div className="post-form__input-container">
            <label className="post-form__label">Repetir Contraseña</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"} 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="post-form__input"
              />
              <button type="button" onClick={ConfirmPasswordVisibility} className="password-toggle-btn">
                {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}  
              </button>
            </div>
          </div>

          {<p className="error">{formError || usenameError}</p>}

          <div className="go-button-container">
            <GoButton text={isLoading ? "Cargando..." : "Registrar"} variant="submit" disabled={isLoading} />
          </div>

          <p className="register-link">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login">Inicia sesión aquí</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
