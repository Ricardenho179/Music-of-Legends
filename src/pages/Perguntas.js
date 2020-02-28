import React,{useState, useEffect} from 'react'
import Layout from './../components/Layout'
import firebase from 'firebase' 
import { withRouter, Link } from "react-router-dom";


function Perguntas() {
    const [state, setState] = useState({})
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({});
    const keyDoUsuario = localStorage.getItem("keyDoUsuario");


    function selecionarPergunta(pergunta, resposta, props) {
        let ref = firebase.database().ref();
        const userRef = ref.child("users");

        if (pergunta.opcaoCorreta === resposta) {
            userRef.child(keyDoUsuario).update({ pontos: usuarioSelecionado.pontos + pergunta.pontos });
        } else {
            userRef.child(keyDoUsuario).update({ pontos: usuarioSelecionado.pontos - pergunta.pontos });
        } 
        
        buscarUsuario()

    }

    const buscarPerguntas = () => {
        let perguntas = [];
        let ref = firebase.database().ref("/perguntas");

        ref.on("value", snapshot => { 
            perguntas = [];   
                
            snapshot.forEach((pergunta) => {
                perguntas.push(pergunta.val())
            });

            setState({perguntas:perguntas});
        });
    };

    function buscarUsuario() {
        let ref = firebase.database().ref();
    
        const userRef = ref
          .child("users")
          .orderByKey()
          .equalTo(keyDoUsuario);
    
        userRef.on("value", usuario => {
          console.log(usuario.val());
          const novo = usuario.val();
          setUsuarioSelecionado({ ...novo[keyDoUsuario] });
        });
      }

    useEffect(() => {
        buscarPerguntas() 
        buscarUsuario() 
    },[])
   
    return (
        <div className="conteudo">
            <div className="paginaPerguntas">
                {state.perguntas && state.perguntas.map((pergunta, i) =>  {
                    return (
                        <div key={i} className="tabelaPerguntas">
                            <div className="quadroPerguntas">
                                {pergunta.titulo}
                            </div>
                            <div className="backgroundTittle">
                                <div className="pontos">
                                    VALOR: <b>{pergunta.pontos} PONTOS</b>
                                </div>
                            </div>    
                            <div className="opcoes">
                                <Link type="button" onClick={() => selecionarPergunta(pergunta, pergunta.opcoes.op1)} to="/home" className="opcao1">
                                    {pergunta.opcoes.op1}
                                </Link>
                                <Link type="button" onClick={() => selecionarPergunta(pergunta, pergunta.opcoes.op2 )} to="/home" className="opcao1">
                                    {pergunta.opcoes.op2}
                                </Link>
                                <Link type="button" onClick={() => selecionarPergunta(pergunta, pergunta.opcoes.op3)} to="/home" className="opcao1">
                                    {pergunta.opcoes.op3}
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default withRouter(Layout(Perguntas))