import axios from "axios";
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';
import Swal from "sweetalert2";
import "../table.css"
import View from './Viex';

const URL = 'http://localhost:3000/api/product/view'

const CompShowBlogs = () => {
    const [modaldelet, setModaldelet] = useState(false);
    const delet = () => setModaldelet(!modaldelet);
    const [modalupdate, setModalupdate] = useState(false);
    const update = () => setModalupdate(!modalupdate);
    const [data, setData] = useState({
        id: '',
    })
    const [data2, setData2] = useState({
        id: '',
        nameProduc: '',
        description: '',
        price: '',
        amount: '',
    })
    const [blogs, setBlog] = useState([])
    useEffect( ()=>{
        getBlogs()
    },[])
    function handleupdate(u) {
        u.preventDefault();
        const newdata = { ...data2 }
        newdata[u.target.id] = u.target.value
        setData2(newdata)
        console.log(newdata)

    }
    function handledelet(d) {
        d.preventDefault();
        const newdata = { ...data }
        newdata[d.target.id] = d.target.value
        setData(newdata)
        console.log(newdata)

    }

    //procedimineto para mostrar todos los blogs
    const getBlogs = async () => {
        const res = await axios.get(URL)
        setBlog(res.data)
    }
    const urlupdate = 'http://54.183.12.93/api/product/update'

    function Enviarupdate() {
        const formData = new FormData();
        formData.append("id", data2.id);
        formData.append("nameProduc", data2.nameProduc);
        formData.append("description", data2.description);
        formData.append("price", data2.price);
        formData.append("amount", data2.amount);

        axios.post(urlupdate, formData)
            .then(res => {
                if (res.status === 200) {
                    Swal.fire({
                        title: 'Excelente',
                        text: "Producto Actualizado!",
                        icon: 'success',
                        confirmButtonColor: '#0e46ff',
                        confirmButtonText: 'Okay'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.replace('/blog');
                        }
                    })
                } else {
                    Swal.fire(
                        'ATENCIÓN',
                        'Ha ocurrido un error al actualizar, reintente',
                        'warning'
                    );
                }
            })

        update(false);

    }

    //procedimineto para eliminar un blog
    const urldelet = 'http://localhost:3000/api/product/delete'

    const EnviarDelet = (id,d) => {

        axios.delete(urldelet, {
            data: data,
        })
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        Swal.fire({
            title: 'Datos Eliminados!',
            text: "",
            icon: 'success',
            confirmButtonColor: '#0e46ff',
            confirmButtonText: 'Okay'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.replace('/blog');
            }

        })

        getBlogs()
    }




    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group me-2" role="group" aria-label="First group">
                        <button type="submit">
                        <Link to="/create"  className='btn btn-primary btn-lg mt-2 mb-2'><i className="fas fa-plus"></i> {"agregar"}</Link></button>
                        </div>
                        <div className="btn-group me-2" role="group" aria-label="Second group">
                    <button type="submit">
                        <Link to="/login"  className='btn btn-success btn-lg mt-2 mb-2'><i className="fas fa-plus"></i> {"Salir"}</Link></button>
                        </div>
                        <div className="btn-group me-2" role="group" aria-label="Third group">
                            <button onClick={delet} className='btn btn-danger btn-lg mt-2 mb-2' type="button"><i className="fas fa-plus"></i> {"Eliminar"}
                            </button>
                        </div>
                            <div className="btn-group me-2" role="group" aria-label="Fourth group">
                                <button onClick={update} className='btn btn-warning btn-lg mt-2 mb-2' type="button"><i className="fas fa-plus"></i>{"Editar"}
                                </button>
                        </div>
                    </div>


                    <table className='table'>
                        <thead className='table-primary'>
                        <tr>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Amount</th>
                        </tr>
                        </thead>

                        <form>
                            <Modal isOpen={modalupdate}>
                                <ModalHeader className="text-primary">Actualidar Producto</ModalHeader>
                                <ModalBody>
                                    <form className="was-validated" noValidate>
                                        <FormGroup>
                                            <h3>Copia y Pega el Token</h3>
                                            <div className="alert alert-primary" role="alert">
                                                <View/>
                                            </div>
                                            <div>
                                                <Label for="price">Token</Label>
                                                <input type="text" className="form-control"
                                                       onChange={(u) => handleupdate(u)} id="id" value={data2.id}
                                                       placeholder="Token" required></input>
                                            </div>
                                            <div>
                                                <Label for="price">Titulo</Label>
                                                <input type="text" className="form-control"
                                                       onChange={(u) => handleupdate(u)} id="nameProduc"
                                                       value={data2.nameProduc} placeholder="titulo" required></input>
                                            </div>
                                            <div>
                                                <Label for="price">Description</Label>
                                                <input type="text" className="form-control"
                                                       onChange={(u) => handleupdate(u)} id="description"
                                                       value={data2.description} placeholder="descriptions"
                                                       required></input>
                                            </div>
                                            <div>
                                                <Label for="Stock">Precio</Label>
                                                <input type="text" className="form-control"
                                                       onChange={(u) => handleupdate(u)} id="price" value={data2.price}
                                                       placeholder="precio" required></input>
                                            </div>
                                            <div>
                                                <Label for="Stock">Stock</Label>
                                                <input type="text" className="form-control"
                                                       onChange={(u) => handleupdate(u)} id="amount"
                                                       value={data2.amount} placeholder="Stock" required></input>
                                            </div>
                                        </FormGroup>
                                    </form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button type="submit" onClick={Enviarupdate} color="primary">Guardar</Button>
                                    <Button color="secondary" onClick={update}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </form>
                        <form>
                            <Modal isOpen={modaldelet}>
                                <ModalHeader className="text-primary">Delete Product</ModalHeader>
                                <ModalBody>
                                    <form className="was-validated" noValidate>
                                        <FormGroup>
                                            <h3>Copia y Pega el Token</h3>
                                            <div className="alert alert-primary" role="alert">
                                                <View/>
                                            </div>
                                            <div>
                                                <Label for="price">Token</Label>
                                                <input type="text" className="form-control"
                                                       onChange={(d) => handledelet(d)} id="id" value={data.id}
                                                       placeholder="Token" required></input>
                                            </div>
                                        </FormGroup>
                                    </form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button type="submit" onClick={EnviarDelet} color="primary">Guardar</Button>
                                    <Button color="secondary" onClick={delet}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </form>
                        <tbody>
                        { blogs.map ( (blog) => (
                            <tr key={ blog.id}>
                                <td> <img src={blog.name} className="img-fluid" alt="..."></img></td>
                                <td> { blog.nameProduc } </td>
                                <td> { blog.description } </td>
                                <td> { blog.price } </td>
                                <td> { blog.amount } </td>

                            </tr>
                        )) }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default CompShowBlogs