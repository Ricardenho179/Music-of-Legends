import React,{useRef} from "react"
import firebase from "firebase";
import { withRouter } from "react-router-dom";
import logo from './../music_logo.png'


function SingIn(props) {
console.log(props)
    const nome = useRef(null)
    const email = useRef(null)
    const senha = useRef(null)

    function criarUsuario() {
        let ref = firebase.database().ref();
        const userRef = ref.child("users");
        
        userRef
        .push({ nome: nome.current.value,
                senha: senha.current.value,
                email: email.current.value,
                pontos: 0,
                PerguntasRespondidas: ""
        }).then(() => props.history.push("/"));
    }
    

    return (
        <div className="Login">
            <div className="tittleLogin">
                <img src={logo}></img>
            </div>
            <div className="descricao">
                <h3>Crie Sua conta</h3>
            </div>
            <div className="formLogin">
                <div className="campo">
                    <label for="nome">Nome: </label>
                    <input type="text" ref={nome}></input>
                </div>
                <div className="campo">
                    <label for="nome">Email:</label>
                    <input type="text" ref={email}></input>
                </div>
                <div className="campo">
                    <label for="nome">Senha:</label>
                    <input type="password" ref={senha}></input>
                </div>
                <div className="botaoLogar">
                    <button className="logar" onClick={() => criarUsuario()}>
                        Criar
                    </button>
                </div>   
            </div>
        </div>
    )
 }


export default withRouter(SingIn);