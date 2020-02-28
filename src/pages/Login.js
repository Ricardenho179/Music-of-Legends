import React, {useRef, useEffect} from 'react'
import firebase from 'firebase'
import {Link} from 'react-router-dom'
import logo from './../music_logo.png'

function Login(props) {
    const nome = useRef(null) 
    const senha = useRef(null)

    let ref = firebase.database().ref("/users");
    const logar = () => {
        
        let loginValido = false
        let usuarioSelecionadoNome, usuarioSelecionadoKey 

        ref.on("value", snapshot => { 
            snapshot.forEach((usuario) => {
                if( senha.current && nome.current) {
                    if (usuario.val().senha === senha.current.value && usuario.val().nome === nome.current.value) {
                        loginValido = true
                        usuarioSelecionadoNome = usuario.val().nome
                        usuarioSelecionadoKey = usuario.key
                        return false
                    }
                }
            });

            if(loginValido) {
                props.logar(usuarioSelecionadoNome, usuarioSelecionadoKey)       
            } else {
                alert("Login ou senha inválidos")
            }
        });
    };
    useEffect( () => {
        return () => {
            ref.off("value", () => {})
        }
    })

    return (
        <div className="Login">
            <div className="tittleLogin">
              <img src={logo}></img>
            </div>
            <div className="descricao">
                <h3>Faça seu login</h3>
            </div>
            <div className="formLogin">
                <div className="campo">
                    <label for="nome">Login:</label>
                    <input ref={nome} type="text" placeholder="nome de usuário"/>
                </div>
                <div className="campo">
                    <label for="nome">Senha:</label>
                    <input ref={senha} type="password" placeholder="senha: ******"/>
                </div>
                <div className="botaoLogar">
                    <button className="logar" onClick={() => logar()}>
                        Logar
                    </button>
                    <Link className="logar" to="/singin">
                        Criar conta
                    </Link>
                </div>   
            </div>
        </div>
    )
}

export default Login

