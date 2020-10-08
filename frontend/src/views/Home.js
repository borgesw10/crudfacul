import React, { useState, useEffect } from 'react';
import axiosRequest from './../utils/axiosRequest';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    axiosRequest('get', '', {}, { set: setVendas });
  }, [])

  const history = useHistory();

  return (
    <div>
      <h2>Todas as vendas</h2>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Produto</th>
            <th scope="col">Cliente</th>
            <th scope="col">Dt.Pagamento</th>
            <th scope="col">Valor</th>
          </tr>
        </thead>
        <tbody>
          {
            vendas.filter(n => n.ativo).map((n, i) =>
              <tr key={n._id} onClick={() => {
                history.push(`/venda/${n._id}`)
              }}>
                <th scope="row">{i}</th>
                <td>{n.produto}</td>
                <td>{n.cliente}</td>
                <td>{n.dtPagamento}</td>
                <td>R$ {n.valor.toFixed(2)}</td>
              </tr>

            )
          }


        </tbody>
      </table>
    </div>
  )
};

export default Home;

