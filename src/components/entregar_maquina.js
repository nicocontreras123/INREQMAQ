import React, {Component, useEffect, useState} from 'react'
import LeftMenu from './menu';
import './../css/home.css';
import Header from './header'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useAlert } from "react-alert";

export default class EntregarMaquina extends Component {

    constructor(){
        super()
        this.state = {
            patente : '',
            campos: {},
            maquinas: [],
            message: '',
            mostrarMaquina: false,
            maquina: {}
        }
        axios({
            method: 'GET',
            url: "http://inreqmaq-env.eba-hmb4yeyg.us-east-1.elasticbeanstalk.com/maquina",
          }).then((response) => {
            if(response.status === 200){
              this.setState({
                  maquinas:response.data
            })
            console.log('thist ', this.state.maquinas)
            }
          }, (error) => {

          });
    }

    handleBuscarMaquina(){
        let obj = this.state.maquinas.find(o => o.placaPatente === this.state.patente);
        if(obj){
            this.setState({
                maquina: obj,
                mostrarMaquina: true
            })
        }else{
            this.setState({
                message: 'No se encontro ninguna maquina con esa patente',
                mostrarMaquina:false
            })
        }
    }

    handleEntregarMaquina() {
        axios({
            method: 'POST',
            url: `http://inreqmaq-env.eba-hmb4yeyg.us-east-1.elasticbeanstalk.com/maquina/${this.state.maquina.id}`,
            data:{
                id: this.state.maquina.id,
                descripcion: this.state.maquina.descripcion,
                placaPatente:this.state.maquina.placaPatente,
                nombre:this.state.maquina.nombre,
                activa:true,
                tipoMaquina:{
                    id:1,
                    nombre: "Tipo 1"
                }           
            }
        }).then((response)=>{
            this.setState({
                message: 'Maquina entregada correctamente!',
                mostrarMaquina:false
            })
        }).catch((error)=>{
            this.setState({
                message: 'Hubo un error al entregar maquina',
                mostrarMaquina:false
            })
        })
    }
    
    handleChange (evt, field) {  
        let campos = this.state.campos;
        campos[field] = evt.target.value;        
        this.setState({ [field]: evt.target.value, campos });
       }

    

    render(){
        const {patente, mostrarMaquina, message, maquina} = this.state
        return(
            <div>
        <LeftMenu selected="home"></LeftMenu>
        <div class="home_2">
                    <Header titulo="Entregar maquina"></Header>
                    <div class="ver_maquina">
                        <span>Ingrese placa de maquina a regresar: </span>
                        <input value={patente} onChange={(event)=>this.handleChange(event, "patente")} ></input>
                        <br></br>
                        <Button variant="contained" color="primary" onClick={() => this.handleBuscarMaquina()}>
                                    Buscar maquina
                        </Button>
                        <br></br>
                        {mostrarMaquina ? 
                            <ul>
                            <img src={`${process.env.PUBLIC_URL}/maquinaria_${maquina.id}.jpg`}  alt=""></img>
                            <br></br>
                            <li>Nombre Maquina: {maquina.nombre}</li>
                            <br></br>
                            <li>Placa Patente: {maquina.placaPatente}</li>
                            <br></br>
                        <li>Descripción: {maquina.descripcion}</li>
                            <br></br>
                            {maquina.activa === false ?
                            <Button variant="contained" color="primary" onClick={() => this.handleEntregarMaquina()} >Entregar</Button>
                            :
                            <Button disabled variant="contained" color="primary" >No se encuentra arrendada</Button>
                            }
                        </ul>

                             : <span>{message}</span>

                        }
                    </div>
                </div>
        </div>
        )
    }
    
}

