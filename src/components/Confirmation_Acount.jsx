import './Confirmation_Acount.css'
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from "axios";

function Confirmation_Acount() {
    const navigator = useNavigate()
    const [data, setData] = useState({
        valor: 'false'
    })


    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    const querystring = window.location.search
    const params = new URLSearchParams(querystring)



    const validate = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": params.get('email'),
        });

        const url = 'http://54.183.12.93/api/user/config?'

        if (data.valor === 'true') {
            console.log('Validation Success: ' + data.valor);



            console.log(raw);
            axios.post(url, {
                valor: data.valor,
                email: params.get('email'),


            })
                .then(res => {
                    console.log(res.data)
                })
            Swal.fire(
                'Muy Bien!',
                'Gracias por confirma',
                'success'
            )
            navigator('/')

        }
        if (data.valor === 'false') {
            console.log('Validation error: ' + data.valor);

            axios.post(url, {
                valor: data.valor,
                email: params.get('email'),
            })
                .then(res => {
                    console.log(res.data)

                })

            Swal.fire(
                'Tiempo agotado!',
                'Tu tiempo se termino para configurar tu cuenta',
                'error'
            )
            navigator('/')





        }
    }





    return (
        <div className="container w-25 bg-warning  rounder shadow">
            <div className="row align-items-stretch">
                <div className="col acount d-none d-lg-block col-md-5 col-lg-7 col-xl-6 rounder">

                </div>

                <div className="col p-5 rounder-end">
                    <div className="text-end">
                        <h3>Alvarez</h3>
                    </div>
                    <h2 className="fw-bold text-center py-5">Bienvenido</h2>
                    <h4 className="fw-bold text-center">Click en el Boton!</h4><br/>

                    <form className="was-validated" onSubmit={validate}>
                        <div class="form-check">
                            <input class="form-check-input" onChange={(e) => handle(e)} value={true} type="radio" name="flexRadioDefault" id="valor" />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Activar y Aceptas los terminos.
                            </label>
                        </div><br />
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Confirmar</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Confirmation_Acount;