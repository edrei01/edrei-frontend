import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import styles from "./styles.module.scss";


const   Retrieve = () => {
  const [inputs, setInputs] = useState({ email: ""});
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { email, password } = inputs;

  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      const data = {
        email ,
      };
      try {
        const url = "http://54.183.12.93/api/email/send ";
        console.log(data)
        const { data: res } = await axios.post(url, data);
        localStorage.setItem("token", res.data);
        Swal.fire({
          icon: 'success',
          title: 'Excelente',
          text: 'Correo Enviado',
        })
        window.location = "/login";
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Email No encontrado!',
        })
        setTimeout(() => {
          setMensaje("");
        }, 1500);{
          Error(error.response.data.message);
        }
        console.error(error);



      }
    }
  };

  return (
      <>
        <div className={styles.formContainer}>
          <h2>Recupere Su Password!</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className={styles.inputContainer}>
              <div className={styles.left}>
                <label htmlFor="email">Correo</label>
                <input
                    onChange={(e) => HandleChange(e)}
                    value={email}
                    name="email"
                    id="email"
                    type="email"
                    placeholder="email..."
                    autoComplete="off"
                />
              </div>
              <svg
                  viewBox="0 0 30 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M27 0H3C1.35 0 0.015 1.35 0.015 3L0 21C0 22.65 1.35 24 3 24H27C28.65 24 30 22.65 30 21V3C30 1.35 28.65 0 27 0ZM27 5.295C27 5.73357 26.7741 6.14121 26.4022 6.37365L19.24 10.85C16.6458 12.4714 13.3542 12.4714 10.76 10.85L3.59784 6.37365C3.22593 6.14121 3 5.73357 3 5.295C3 4.29593 4.09894 3.68684 4.94615 4.21635L11.9126 8.57039C13.8016 9.75099 16.1984 9.75099 18.0874 8.57039L25.0538 4.21635C25.9011 3.68684 27 4.29593 27 5.295Z"
                    fill="black"
                />
              </svg>
            </div>


            <button type="submit">
              {loading ? "Cargando..." : "Recuperar"}
            </button>
          </form>
        </div>

        {mensaje && <div className={styles.toast}>{mensaje}</div>}
      </>
  );
};


export default Retrieve;
