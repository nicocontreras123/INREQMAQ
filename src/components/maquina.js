import React, {useEffect, useState} from 'react'
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

const Maquina = (props) => {
    const alert = useAlert();
    let history = useHistory();
    const nombre_maquina = useState(localStorage.getItem('nombre_maquina'))
    const placaPatente = useState(localStorage.getItem('placaPatente'))
    const id_img = useState(localStorage.getItem('id_maq'))
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaTermino, setFechaFin] = useState(new Date());

    const generarArrendamiento = () =>{
        var id = localStorage.getItem('id')
        axios({
            method: 'POST',
            url: "http://inreqmaq-env.eba-hmb4yeyg.us-east-1.elasticbeanstalk.com/arriendo",
            data: {
                maquina: {
                    id: id_img[0]
                },
                usuario: {
                    id: id,
                },
                fechaArriendo: new Date(),
                desde: fechaInicio,
                hasta: fechaTermino,
                retirada: true,
                entregada: false,
                vendedorArriendo: {
                    usuario: {
                        id:id
                    }
                }
            }
          }).then((response) => {
            if(response.status === 200){
                alert.success("Se ha generado el arrendamiento correctamente");
                setTimeout(()=>{
                    axios({
                        method: 'POST',
                        url: `http://inreqmaq-env.eba-hmb4yeyg.us-east-1.elasticbeanstalk.com/maquina/${id_img[0]}`,
                        data:{
                            id: id_img[0],
                            tipoMaquina:{
                                id:1,
                                nombre: "Tipo 1"
                            },
                            descripcion: "Maquina 1",
                            placaPatente:placaPatente[0],
                            nombre:nombre_maquina[0],
                            activa:false
                        }

                    }).then((response)=>{
                        alert.success("Estado cambiado correctamente");
                    }).catch((err)=>{
                        alert.error("Ha ocurrido un error al cambiar el estado de la maquina");
                    })
                    history.push('/listado_maquinas');
                }, 2000)
            }
          }, (error) => {
            alert.error("Ha ocurrido un error al intentar generar el arrendamiento");
          });

    };

    const volverHome = () => {
        history.push('/listado_maquinas');
    }
    
    return (
        <div>
        <LeftMenu selected="home"></LeftMenu>
        <div class="home_2">
                    <Header titulo="Descripción de la maquina"></Header>
                </div>
                <div className="ver_maquina">
                <ul>
                    <img src={`${process.env.PUBLIC_URL}/maquinaria_${id_img[0]}.jpg`}  alt=""></img>
                    <br></br>
                    <li>Nombre Maquina: {nombre_maquina}</li>
                    <br></br>
                    <li>Placa Patente: {placaPatente}</li>
                    <br></br>
                    <li>Descripción: </li>
                    <li>Fecha de inicio de arriendo:
                    <br></br>
                    <DatePicker 
                    selected={fechaInicio} 
                    onChange={date => setFechaInicio(date)}
                    minDate={new Date()} 
                    locale="es"
                    />
                    </li>
                    <li>Fecha de termino de arriendo:
                    <br></br>
                    <DatePicker 
                    selected={fechaTermino} 
                    onChange={date => setFechaFin(date)}
                    minDate={fechaInicio} 
                    locale="es"
                    />
                    </li>
                    <br></br>
                    <li>Condiciones de arriendo:</li>
                    <li>- 8 Horas diarias</li>
                    <li>- Dejar cheque como garantia</li>
                    <bn></bn>
                    <Button variant="contained" color="primary" onClick={() => generarArrendamiento()}>Generar arrendamiento</Button>
                    <Button variant="contained" color="secondary" onClick={() => volverHome()}>Volver</Button>
                </ul>
            </div>
        </div>
    )
}

export default Maquina