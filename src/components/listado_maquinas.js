import React, { Component, useState } from 'react';
import './../css/maquina.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import LeftMenu from './menu';
import Header from './header'
import './../css/home.css';


import axios from 'axios';



export default class ListadoMaquinas extends Component {

    state = {
      objectSelect : [],
      products: [],
      cargando: true
    }

    componentDidMount(){
      this.handleListadoMaquinas()
    }
    
    handleListadoMaquinas(){
      axios({
        method: 'GET',
        url: "http://inreqmaq-env.eba-hmb4yeyg.us-east-1.elasticbeanstalk.com/maquina",
      }).then((response) => {
          console.log(response);
        if(response.status === 200){

          this.setState({
            products:response.data,
            cargando:false
        })
        }
      }, (error) => {
      });
    }
    handleseleccionarObj (obj){
      localStorage.setItem('nombre_maquina', obj.nombre);
      localStorage.setItem('placaPatente', obj.placaPatente);
      localStorage.setItem('id_maq', obj.id);
    }
  render(){
      const {cargando, products} = this.state
      console.log(products )
    return (
        <div>
        <LeftMenu></LeftMenu>
            <div class="home_2">
                <Header titulo="Maquinas disponibles para arriendo"></Header>
                <div className="listado">
                    {!cargando ? 
                        products.map((object) =>{
                            if(object.activa === true){
                                return(
                                    <div className="listado">
                                <div className="item">
                                <button className="btn_item" onClick={() => this.handleseleccionarObj(object)}>
                                <h3>{object.nombre}</h3>
                                <h4>{object.placaPatente}</h4>
                                <img src={`${process.env.PUBLIC_URL}/maquinaria_${object.id}.jpg`}  alt=""></img>
                                <Link to="/maquina">
                                <Button variant="contained" color="secondary" >
                                    Arrendar
                                </Button>
                                </Link>
                                </button>
                            </div>
                                </div>
                                )
                            }else{
                                    return(
                                        <div className="listado">
                                    <div className="item">
                                    <button className="btn_item" onClick={() => this.handleseleccionarObj(object)}>
                                    <h3>{object.nombre}</h3>
                                    <h4>{object.placaPatente}</h4>
                                    <img src={`${process.env.PUBLIC_URL}/maquinaria_${object.id}.jpg`}  alt=""></img>
                                    <Button disabled variant="contained" color="secondary" >
                                        Arrendar
                                    </Button>
                                    </button>
                                </div>
                                    </div>
                                    )
                            }
                        })
                     : <h1>Cargando....</h1>}
                </div>
            </div>
        </div>
    );
  }
}


 