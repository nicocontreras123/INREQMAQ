import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { positions, Provider } from "react-alert";
import React, { Component } from "react";
import Login from './components/login';
import misArriendos from './components/mis_arriendos';
import Maquina from './components/maquina';
import datosPersonales from './components/datos_personales';
import Administrar from './components/administrar_maquinas';
import Recuperarcontraseña from './components/recuperar_contraseña';
import ListadoMaquinas from './components/listado_maquinas';
import EntregarMaquina from './components/entregar_maquina';

import AlertTemplate from 'react-alert-template-basic'
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};

class App extends Component {
    render() {
      return (
        <Provider template={AlertTemplate} {...options}>
     <Router>
          <div >
          <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/mis_arriendos" component={misArriendos}/>
          <Route path="/maquina" component={Maquina}/>
          <Route path="/listado_maquinas" component={ListadoMaquinas}/>
          <Route path="/entregar_maquina" component={EntregarMaquina}/>
          <Route path="/administrar_maquinas" component={Administrar}/>
          <Route path="/datos_personales" component={datosPersonales}/>
          <Route path="/recuperarcontraseña" component={Recuperarcontraseña}/>
          </Switch>
          </div>
        </Router>
      </Provider>
      );
    }
  }

  export default App;