import React,{Component} from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import './../css/header.css'

export default class Header extends Component{    
    constructor(props) {
      super()
      console.log('props ', props)
      this.state= {
        titulo:props.titulo
      }
    } 
    render() {
    return (
        <div id="header_menu">
            <div class="div_titlo">
              <span class="titulo">{this.state.titulo}</span>
            </div>
        </div>
        )
    }

}