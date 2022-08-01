import React, {useState} from "react";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.scss";
function Password() {

    const querystring = window.location.search
    const params = new URLSearchParams(querystring)

    const data = useState({
        password: ''
    })

    const url = 'http://54.183.12.93/api/user/update_password'
    const navigator = useNavigate()
    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = values =>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": params.get('email'),
        });
        if (values.password1 === values.password) {
            const data = values
            axios.put(url,{
                email: params.get('email'),
                password: data.password
            })
                .then(response => {
                    console.log(response.data);
                    Swal.fire(
                        ''+response.data.err+'!',
                        '',
                        'success'
                    )
                })
            navigator('/')
        }
        else {
            Swal.fire(
                'password Error!',
                'Valida que sean igual',
                'error'
            )
        }

    }

    return(
        <div className="container  w-25 bg-light rounder shadow">
            <div className="row align-items-stretch">
                <div className="col bg1 d-none d-lg-block col-md-5 col-lg-10 col-xl-6 rounder">

                </div>-


                <div className="col p-5 rounder-end">
                    <h2 className="fw-bold text-center py-5">Restablecer Password</h2>
                    <form className="was-validated" noValidate onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label  className="form-label">Escribe Tu Nueva Constraseña</label>
                            <input type="password" className="form-control" placeholder="Password" required {...register("password1",{
                                required: {
                                    value: true,
                                    message: "El campo requerido",
                                },
                                minLength:{
                                    value: 8,
                                    message: "La contraseña debe tener minimo 8 caracteres"
                                }
                            })}></input>
                            {errors.password1 && <span className="text-danger">{errors.password1.message}</span>}
                        </div>
                        <div className="mb-4">
                            <label  className="form-label">Confirma Tu Constraseña</label>
                            <input type="password" className="form-control" placeholder="Password" required {...register("password",{
                                required: {
                                    value: true,
                                    message: "El campo requerido",
                                },
                                minLength:{
                                    value: 8,
                                    message: "La contraseña debe tener minimo 8 caracteres",
                                }
                            })}></input>
                            {errors.password && <span className="text-danger">{errors.password.message}</span>}
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Restablecer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Password;