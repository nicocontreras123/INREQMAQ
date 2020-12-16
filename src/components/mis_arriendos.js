import React, {Component} from 'react'
import LeftMenu from './menu';
import Header from './header'
import { DataGrid } from '@material-ui/data-grid';
import './../css/home.css';
import axios from 'axios';
import moment from 'moment'


export default class misArriendos extends Component {
    state = {
        arriendos : [],
        columnas: [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'maquina', headerName: 'Maquina', width: 110 },
            { field: 'placa', headerName: 'Placa Patente', width: 150 },
            { field: 'fecha_arriendo', headerName: 'Fecha Arriendo', width: 150 },
            { field: 'fecha_inicio', headerName: 'Fecha Inicio', width: 150 },
            { field: 'fecha_final', headerName: 'Fecha Final', width: 150 },
            { field: 'retirada', headerName: 'Retirada', width: 110 },
            { field: 'entregada', headerName: 'Entregada', width: 110 },
        ],
        cargado: true,
      }

      componentDidMount() {
        this.obtenerArriendos()
    }
    
    obtenerArriendos(){
        var id = localStorage.getItem('id');
        axios({
            method: 'GET',
            url: `http://inreqmaq-env.eba-hmb4yeyg.us-east-1.elasticbeanstalk.com/arriendo/usuario/${id}`,
        }).then((response) =>{
            if(response.status === 200){
                var arr = []
                response.data.forEach(f =>{
                    var obj = {}
                    obj.id = f.id;
                    obj.maquina = f.maquina.nombre
                    obj.placa = f.maquina.placaPatente
                    obj.fecha_arriendo = moment(f.fechaArriendo).format('DD-MM-YYYY')
                    obj.fecha_inicio = moment(f.desde).format('DD-MM-YYYY')
                    obj.fecha_final = moment(f.hasta).format('DD-MM-YYYY')
                    if(f.retirada === true){
                        obj.retirada = 'Si'
                    }else{
                        obj.retirada = 'No'
                    }
                    if(f.entregada === true){
                        obj.entregada = 'Si'
                    }else{
                        obj.entregada = 'No'
                    }
                    arr.push(obj)
                })

                this.setState({
                    arriendos:arr,
                    cargado:true
                })
              }
        }).catch((error)=>{
        })
    }

    render() {
        const {arriendos ,cargado} = this.state
        return (
            <div>
                <LeftMenu selected="mis_arriendos"></LeftMenu>
                <div class="home_2">
                    <Header titulo="Arriendos generados"></Header>
                    {cargado ? (
                        <div style={{ height: 500, width: '100%' }}>
                        <DataGrid rows={arriendos} columns={this.state.columnas} pageSize={5} />
                    </div>
                    ): <p>Cargando...</p>}
                </div>
            </div>
            
        )
    }
}

