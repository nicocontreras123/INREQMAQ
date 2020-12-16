import React, {Component, useState, useEffect} from 'react'
import LeftMenu from './menu';
import './../css/home.css';
import './../css/datos_personales.css';
import Header from './header'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export default class DatosPersonales extends Component {
    constructor(){
        super();
        this.state = {
            id:0,
            nombre : '',
            rut: '',
            email:'',
            telefono: '',
            campos: {}
        }
        var id = localStorage.getItem('id')
        axios({
            method: 'GET',
            url: `http://inreqmaq-env.eba-hmb4yeyg.us-east-1.elasticbeanstalk.com/usuario/${id}`,
          }).then((response) => {
            if(response.status === 200){
              var usuario = response.data;
              this.setState({
                  id:usuario.id,
                  nombre:usuario.nombre,
                  rut:usuario.rut,
                  email:usuario.email,
                  telefono:usuario.telefono
              })
            }
          }, (error) => {
          });
    }
    handleChange (evt, field) {  
        let campos = this.state.campos;
        campos[field] = evt.target.value;        
        this.setState({ [field]: evt.target.value, campos });
       }


    guardarDatosPersonales() {
        var id = localStorage.getItem('id')
        axios({
            method: 'POST',
            url: `http://inreqmaq-env.eba-hmb4yeyg.us-east-1.elasticbeanstalk.com/usuario/${id}`,
            data: {
                id:this.state.id,
                rol:{
                    id:1,
                    nombre: "Rol 1"
                },
                nombre:this.state.nombre,
                rut:this.state.rut,
                email:this.state.email,
                telefono:this.state.telefono
            }
          }).then((response) => {
            if(response.status === 200){
              console.log('R ', response )
            }else{

            }
          }, (error) => {
          });
    }

    render(){
        return(
            <div>
                <LeftMenu selected="datos_personales"></LeftMenu>
                <div class="home_2">
                    <Header titulo="Datos Personales"></Header>
                    <br></br>
                    <div class="div_datos">
                        <Card className={useStyles.root}>
                        <InputLabel className="input_d" htmlFor="outlined-adornment-amount">Nombres<br></br>  
                            <input value={this.state.nombre} 
                            onChange={(event)=>this.handleChange(event, "nombre")}>
                            </input>
                        </InputLabel>
                        <br></br>
                        <InputLabel  className="input_d" htmlFor="outlined-adornment-amount">Rut <br></br><input value={this.state.rut} onChange={(event)=>this.handleChange(event, "rut")}></input></InputLabel>
                        <br></br>
                        <InputLabel  className="input_d" htmlFor="outlined-adornment-amount">E-Mail <br></br><input value={this.state.email} onChange={(event)=>this.handleChange(event, "email")}></input></InputLabel>
                        <br></br>
                        <InputLabel  className="input_d" htmlFor="outlined-adornment-amount">Telefono <br></br><input value={this.state.telefono} onChange={(event)=>this.handleChange(event, "telefono")}></input></InputLabel>
                        <br></br>
                        </Card>
                        <Button variant="contained" color="primary" onClick={() => this.guardarDatosPersonales()}>Guardar Datos personales</Button>
                    </div>
                </div>
            </div>
        )
    }
}