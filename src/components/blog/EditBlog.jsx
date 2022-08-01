import axios from "axios";
import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";


const CompEditBlog = () => {
    const handleFileSelected = (e) => {
        const files = Array.from(e.target.files)
        console.log("files:", files);

        if (files && files.length > 0) {
            const newdata = {...data}
            newdata["selectedFile"] = files[0];
            setData(newdata)
        }
    }
    const [data, setData] = useState({
        name: '',
        nameProduc: '',
        description: '',
        price: '',
        amount: '',
        selectedFile: null
    })
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [amount, setAmount] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()

    //procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault()
        console.log(e)
        await axios.put(`http://54.183.12.93/api/product/update`)
        console.log(e)
        navigate('/blog')
    }

    useEffect( ()=>{
        getBlogById()
    },[])

    const getBlogById = async () => {
        console.log(data)
        const res = await axios.get(URL+id)
        id(res.data.id)
        setTitle(res.data.title)
        setDescription(res.data.description)
        setPrice(res.data.price)
        setAmount(res.data.amount)
    }

    return (
        <div>
        <h3>Edit PRODUC</h3>
        <form onSubmit={update}>
            <div>
                <input type="file" name='file' className="form-control" onChange={handleFileSelected} id="name"
                       aria-label="Upload" required></input>
            </div>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                    value={title}
                    onChange={ (e)=> setTitle(e.target.value)}
                    type="text"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label  className="form-label">Description</label>
                <textarea
                    value={description}
                    onChange={ (e)=> setDescription(e.target.value)}
                    type="text"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label  className="form-label">Price</label>
                <textarea
                    value={price}
                    onChange={ (e)=> setPrice(e.target.value)}
                    type="number"
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label  className="form-label">Amount</label>
                <textarea
                    value={amount}
                    onChange={ (e)=> setAmount(e.target.value)}
                    type="number"
                    className="form-control"
                />
            </div>
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group me-2" role="group" aria-label="First group">
            <button type="submit" className="btn btn-primary">Update</button>
                </div>
                   < div class="btn-group me-2" role="group" aria-label="Second group">
            <Link to={`/blog`} className='btn btn-success'><i className="fas fa-edit"></i>{"Regresar"}   </Link>
            </div>
            </div>
        </form>
    </div>

    )

}

export default CompEditBlog