import React,{Component} from 'react'
import './../css/recuperar.css';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
export default class Form extends Component {
    state={
        email: '',
        correoOk:false,
        mensaje:'',
        redirigir: false,
        message:false
    }
    handleChange (evt, field) {
        this.setState({ [field]: evt.target.value });
        console.log(this.state.email);
       }

       handleSubmit = event => {
        event.preventDefault();
        this.setState({loading:true});
        const email ={
            user: this.state.email
        }
        console.log('email ', email);
        axios({
            method: 'POST',
            url: `http://inreqmaq-env.eba-hmb4yeyg.us-east-1.elasticbeanstalk.com/login/recuperar`,
            data:{
                email:email.user
            }
          }).then((response) => {
              console.log('response ', response);
            if(response.status === 200){
                this.setState({
                    correoOk:true,
                    mensaje:'Se ha enviado un correo electronico con su contraseña nueva a su bandeja',
                    message:true,
                    loading:false
                })
            }
          }, (error) => {
            localStorage.clear();
            this.setState({
                mensaje:'Ha ocurrido un error al recuperar contraseña',
                message:true,
                loading:false
            })
          });
    };
    render(){
        const { loading } = this.state;
        const { redirigir } = this.state;
        const { message } = this.state;
        const {mensaje } = this.state;
        if (redirigir) {
            return <Redirect to='/login'/>;
            }
        return(
            <div class="loginclass">
                <form onSubmit={this.handleSubmit} autoComplete="off">
                <h1 class="h1_login">Restablece tu contraseña</h1>
                <p  align="center"> 
                <p id="p_recuperar">Ingrese su dirección de correo electronico y le enviaremos un enlace a su correo para recuperar su contraseña.</p>
                <br></br>
    
                <br></br>
                <input
                    id="user"
                    type="email"
                    name="user"
                    class="input_style"
                    placeholder="Ingrese su correo electronico"
                    onChange={(event)=>this.handleChange(event, "email")}
                    />
                <br></br>
                    <br></br>
                            </p>
                <button type="submit" class="button buttonlogin" disabled={loading}>
                    {loading && (
                        <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                        />
                    )}
                    {loading && <span>Enviando enlace...</span>}
                    {!loading && <span>Recuperar contraseña</span>}
                    </button>
                    <br></br>
                    {message && <label class="errortoken">{mensaje}</label>}
                    <br></br>
                    <Link to="/"><label class="label_login">
                Volver atras
                </label></Link>
                </form>
                
            </div>
        )
}

}
