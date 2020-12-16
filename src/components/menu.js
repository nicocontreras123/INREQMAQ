import React, { Component } from "react";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import './../css/left-menu.css';
import { useHistory } from "react-router-dom";


export default props => {
    let history = useHistory();

    const navto = (dir) => {
        history.push(dir);
    }

  return (
    <SideNav
    onSelect={(selected) => {
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="arrendar" selected={props.selected}>
        <NavItem eventKey="home" onClick={() => navto('/listado_maquinas')}>
            <NavIcon>
                <i className="fas fa-calendar-week" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Listado Maquinas
            </NavText>
        </NavItem>
        <NavItem eventKey="mis_arriendos" onClick={() => navto('/mis_arriendos')}>
            <NavIcon>
                <i className="fas fa-list-alt" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Mis arrendamientos
            </NavText>
        </NavItem>
        <NavItem eventKey="mis_arriendos" onClick={() => navto('/entregar_maquina')}>
            <NavIcon>
                <i className="fas fa-toolbox" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Entregar Maquinas
            </NavText>
        </NavItem>
        <NavItem eventKey="datos" onClick={() => navto('/datos_personales')}>
            <NavIcon>
                <i className="fas fa-user" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Mis datos personales
            </NavText>
        </NavItem>
        <NavItem eventKey="cerrar" onClick={() => navto('/')}>
            <NavIcon>
                <i className="fas fa-power-off" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Cerrar sesión
            </NavText>
        </NavItem>
    </SideNav.Nav>
</SideNav>
  );
};


