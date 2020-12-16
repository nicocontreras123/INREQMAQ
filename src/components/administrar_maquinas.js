import React, {useEffect, useState} from 'react'
import LeftMenu from './menu';
import Header from './header'
import './../css/home.css';

const Administrar = (props) => {
    return (
        <div>
            <div class="home_2">
                <Header  titulo="Adminsitrar Maquinas"></Header>
            </div>
            <LeftMenu></LeftMenu>
        </div>
        
    )
}

export default Administrar