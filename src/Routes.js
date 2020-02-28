import React , {useState} from 'react';
import { BrowserRouter, Route,Redirect, Switch } from "react-router-dom";
import Login from './pages/Login'
import Home from './pages/Home'
import Perfil from './pages/Perfil'
import Perguntas from './pages/Perguntas'
import SingIn from './pages/SingIn'

const Routes = (props) => {
    const [state, setState] = useState(
        {logado: localStorage.getItem("logado")==="true" ? true :false}
    ) 
    function logar(nome, key, senha) {
        localStorage.setItem("logado", "true")
        localStorage.setItem("nomeUsuario", nome)
        localStorage.setItem("senhaUsuario", senha)
        localStorage.setItem("keyDoUsuario", key)
        setState({logado:true})
        
    }
    function deslogar(){
        localStorage.removeItem("logado")
        localStorage.removeItem("nomeUsuario")
        localStorage.removeItem("keyDoUsuario")
        setState({logado:false})
    }    
    return(
        <BrowserRouter>
            <Switch>
                {state.logado === false &&<Route path="/login" render={() => <Login logar={(nome, key, senha) => logar(nome, key, senha)}/>}/>}
                {state.logado === true &&<Route path="/home" render={() => <Home deslogar={() => deslogar()}/>} />}
                {state.logado === true &&<Route path="/perfil" render={() => <Perfil deslogar={() => deslogar()}/>} />}
                {state.logado === true &&<Route path="/pergunta" render={() => <Perguntas deslogar={() => deslogar()}/>} />}
                {state.logado === false &&<Route path="/singin" render={() => <SingIn />}/>}
                {state.logado === true &&<Redirect from="*" to="/home"/>}
                {state.logado === false &&<Redirect from="*" to="/login"/>}
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
