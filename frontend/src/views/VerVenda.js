import React, {useState, useEffect} from 'react';
import axiosRequest from './../utils/axiosRequest';
import { useParams, useHistory } from 'react-router-dom';

const VerVenda = () => {
    const [venda, setVenda] = useState({
        produto: undefined,
        valor: undefined,
        cliente: undefined,
        dtPagamento: undefined,
    });

    const [message, setMessage] = useState('');

    const {id} = useParams();
    const history = useHistory()

    useEffect(() => {
        axiosRequest('post', 'ver-venda', {_id: id}, {set: setVenda})
    }, [])

    const [editVenda, setEditVenda] = useState({
        produto: undefined,
        valor: undefined,
        cliente: undefined,
        dtPagamento: undefined,
    });

    const handleChange = (event) => { 
        setEditVenda({
            ...editVenda,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = () => {
        axiosRequest('post', 'atualizar-venda', {...editVenda, _id: id}, {set: setMessage});
    }

    const handleDelete = () => {
        axiosRequest('post', 'apagar-venda', {_id: id}, {set: setMessage});
        history.push('/')
    }


    return (
        <div>
        <h2>Visualizando venda</h2>
       
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Nome do produto</label>
            <input onChange={handleChange} name="produto" value={editVenda.produto ? editVenda.produto : venda.produto ? venda.produto : ""} className="form-control"  />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Preço do produto</label>
            <input onChange={handleChange} name="valor" value={editVenda.valor ? editVenda.valor : venda.valor ? venda.valor : ""}  className="form-control"  />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Nome do Cliente</label>
            <input onChange={handleChange} name="cliente" value={editVenda.cliente ? editVenda.cliente : venda.cliente ? venda.cliente : ""}  className="form-control"  />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Data de Pagamento</label>
            <input onChange={handleChange} name="dtPagamento" value={editVenda.dtPagamento ? editVenda.dtPagamento : venda.dtPagamento ? venda.dtPagamento : ""} className="form-control"  />
        </div>

        {
            message && <p style={{color: '#FFF'}}> Venda atualizada com sucesso!</p>
        }
       
        <button onClick={handleSubmit} className="btn btn-primary">Atualizar venda</button>
        <button onClick={handleDelete} className="btn btn-danger" style={{marginLeft: 10}}>Deletar venda</button>
    </div>
    )
};

export default VerVenda;