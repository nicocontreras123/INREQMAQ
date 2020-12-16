import React,{Component} from 'react'
import './../css/login.css';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import logo from './../assets/logo_2.png'

export default class Form extends Component {
    state={
        user:'',
        password:'',
        loggedIn:false,
        loading:false,
        errorInvalid:false
    }
    handleChange (evt, field) {
       this.setState({ [field]: evt.target.value });
      }
    
    handleSubmit = event => {
        
        event.preventDefault();
        this.setState({loading:true})
        const email ={
            user: this.state.user
        }
        const pass ={
            password: this.state.password
        }
        const data={
            email: email.user,
            pass: pass.password
        }
        setTimeout(()=>{
            axios({
                method: 'POST',
                url: "http://inreqmaq-env.eba-hmb4yeyg.us-east-1.elasticbeanstalk.com/login",
                data: {
                    email: email.user,
                    pass: pass.password
                }
              }).then((response) => {
                  console.log(response);
                if(response.status === 200){
                    this.setState({
                        loggedIn: true,
                        loading:false
                    })
                    localStorage.setItem('email', email.user);
                    localStorage.setItem('pass', pass.password);
                    localStorage.setItem('id', response.data.id);

                }
              }, (error) => {
                localStorage.clear();
                this.setState({
                    loggedIn:false,
                    errorInvalid:true,
                    loading:false
                })
              });
        }, 50)
    };

    render(){
        localStorage.clear();
        const { loading } = this.state;
        const { errorInvalid  } = this.state;
        if(this.state.loggedIn){
            return <Redirect to="/listado_maquinas"/>
        }
        return(
            <div class="loginclass">
            <form onSubmit={this.handleSubmit}>
            <img src={logo} class="logo-img"></img>
                <p  align="center">  
                    <label class="label_login">Correo Electronico </label>
                    <br></br>
                    <input
                    id="name"
                    type="email"
                    name="user"
                    class="input_style"
                    placeholder="example@correo.com"
                    spellcheck="false"
                    onChange={(event)=>this.handleChange(event, "user")}
                    >
                    </input>
                    <br></br>
                    <br></br>
                    <label class="label_login">Contraseña </label>
                    <br></br>
                    <input
                    type="password"
                    id="pass"
                    name="password"
                    class="input_style"
                    onChange={(event)=>this.handleChange(event, "password")}
                    >
                    </input>
                    <p></p>

                    <button type="submit" class="button buttonlogin" id="button_login" disabled={loading}>
                    {loading && (
                        <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                        />
                    )}
                    {loading && <span>Iniciando...</span>}
                    {!loading && <span>Iniciar Sesión</span>}
                    </button>
                    <br></br>
                    {errorInvalid && <label class="errortoken">Usuario o contraseña invalido</label>}
                    <br></br>
                    
                <br></br>
                    <Link to="/recuperarcontraseña" style={{ textDecoration: 'none' }}><label id="linkRecuperar">
                ¿No recuerdas tu contraseña?, Presiona aqui.
                </label></Link>
                </p>
               
            </form>
            </div>
        )
}

}