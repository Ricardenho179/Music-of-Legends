import React, {useState, useEffect} from 'react'
import Layout from './../components/Layout'
import firebase from 'firebase'



function Home() {
    const [state, setState] = useState(
        { }
    )
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({});
    const keyDoUsuario = localStorage.getItem("keyDoUsuario");
    // const [listaPontos, setListaPontos] = useState({});

    const buscarUsuarios2 = () => {
        let ref = firebase.database().ref();

        const userRef = ref
        .child("users")
        .orderByKey()
        .equalTo(keyDoUsuario);

        userRef.on("value", usuario => {
        const novo = usuario.val();
        setUsuarioSelecionado({ ...novo[keyDoUsuario] });
        });
    }

    

    const buscarUsuarios = () => {
        let usuarios = [];
        let ref = firebase.database().ref("/users");

        ref.on("value", snapshot => { 
            usuarios = [];   
              
            snapshot.forEach((usuario) => {
                usuarios.push(usuario.val())
                
            });

            
            setState({usuarios:usuarios});
        });
    };

    // const listaDePontos = () => {
    //     let listaPontos = [];
    //     let ref = firebase.database().ref("/users");
        
    //     ref.on("value", snapshot => {
    //         listaPontos = [];
        
    //         snapshot.forEach((usuario) => {
    //             listaDePontos.push(usuario.pontos.val())
    //         });

    //         setState({listaPontos:listaPontos});
    //     });

    // }
    
    useEffect(() => {
        buscarUsuarios()  
        buscarUsuarios2()
        // listaDePontos()
    },[])

    
    // console.log(listaDePontos())
    const resultPontos = usuarioSelecionado.pontos
    


    return (
        <div className="conteudo">
            <div className="home">
                <div className="tabelaUsuarios">
                    <div className="colRanking">
                        <div className="raking">
                            <p>Ranking</p>
                        </div>
                        <div className="positionTable">
                            <div className="informacoes">
                                <div className="usuario">{usuarioSelecionado.nome} </div> SUA PONTUAÇÃO É: <b> {resultPontos} PONTOS</b>
                            </div>
                        </div>
                    </div>
                    <div className="tabela">
                        <div className="colNomePotuacao">
                            <div className="Nome">
                                Nome
                            </div>
                            <div className="Pontuacao">
                                Pontuacao
                            </div>
                        </div>
                        <div className="usuarios">
                            {state.usuarios && state.usuarios.sort((a, b) => b.pontos - a.pontos ).map((usuario, i) =>
                                <div className="user" key={i}>
                                    <p>{usuario.nome}</p><p>{usuario.pontos}</p>                                
                                </div>                                      
                            )}
                        </div>  
                    </div>    
                </div> 
            </div>
        </div>
    )
}
export default Layout(Home)