import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from './views/Home';
import NovaVenda from './views/NovaVenda';
import VerVenda from './views/VerVenda';
import './style.css'


const App = () => {
    return (
        <Router>
            <h1>Vendas</h1>
            <div>
                <nav>
                    <ul>
                        <li>
                        <Link to="/">
                                <button className="btn btn-primary">
                                    Todas as Vendas
                            </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/novavenda">
                                <button className="btn btn-success">
                                    Nova venda
                            </button>
                            </Link>
                        </li>

                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/novavenda">
                        <NovaVenda />
                    </Route>
                    <Route path="/venda/:id">
                        <VerVenda />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
};

export default App;