import React, { useState } from 'react';
import axiosRequest from './../utils/axiosRequest';

const NovaVenda = () => {
    const [venda, setVenda] = useState({
        produto: undefined,
        valor: undefined,
        cliente: undefined,
        dtPagamento: undefined,
    })

    const [novaVenda, setNovaVenda] = useState(undefined);

    const handleChange = (event) => {
        setVenda({
            ...venda,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = () => {
        if (!venda.produto || !venda.valor || !venda.cliente || !venda.dtPagamento) {
            return alert('Preencha todos os campos')
        }

        axiosRequest('post', 'criar-venda', venda, { set: setNovaVenda }).then(() => setVenda({
            produto: undefined,
            valor: undefined,
            cliente: undefined,
            dtPagamento: undefined,
        }));
    }

    return (
        <div>
            <h2>Nova venda</h2>

            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Nome do produto</label>
                <input onChange={handleChange} name="produto" value={venda.produto || ""} className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Preço do produto</label>
                <input onChange={handleChange} name="valor" value={venda.valor || ""} className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Nome do Cliente</label>
                <input onChange={handleChange} name="cliente" value={venda.cliente || ""} className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Data de Pagamento</label>
                <input onChange={handleChange} name="dtPagamento" value={venda.dtPagamento || ""} className="form-control" />
            </div>

            {
                novaVenda && <p style={{ color: '#FFF' }}>Venda criada com sucesso!</p>
            }

            <button onClick={handleSubmit} className="btn btn-primary">Criar venda</button>
        </div>
    )
};

export default NovaVenda;