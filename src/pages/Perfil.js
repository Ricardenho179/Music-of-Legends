import React, { useEffect, useRef, useState } from "react";
import Layout from "./../components/Layout";
import firebase from "firebase";

function Perfil() {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({});
  const keyDoUsuario = localStorage.getItem("keyDoUsuario");

  const valorNome = useRef(null);
  const valorSenha = useRef(null);
  const valorEmail = useRef(null);

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
    buscarUsuario();
  }, []);

  function alterarNome() {
    let ref = firebase.database().ref();
    const userRef = ref.child("users");

    userRef
      .child(keyDoUsuario)
      .update({ nome: valorNome.current.value });
    buscarUsuario();
  }

  function alterarSenha() {
    let ref = firebase.database().ref();
    const userRef = ref.child("users");

    userRef
      .child(keyDoUsuario)
      .update({ senha: valorSenha.current.value });
    buscarUsuario();
  }

  function alterarEmail() {
    let ref = firebase.database().ref();
    const userRef = ref.child("users");

    userRef
      .child(keyDoUsuario)
      .update({ email: valorEmail.current.value });
    buscarUsuario();
  }

  return (
    <div className="conteudo">
      <div className="perfil">
        <div className="tituloForm">
          <h2>
            {usuarioSelecionado.nome} Deseja alterar algum dos campos a baixo?
          </h2>
        </div>
        <form className="formulario-perfil">
          <div className="form">
            <div className="cadastro">
              <label for="nome">Nome: {usuarioSelecionado.nome}</label>
              <label for="nome">Email: {usuarioSelecionado.email}</label>
            </div>
            <div className="campos">
              <div className="campoPerfil">
                <label for="nome">Novo Nome:</label>
                <input ref={valorNome} type="text"></input>
                <div className="botaoSpace">
                  <button
                    type="button"
                    onClick={() => alterarNome()}
                    className="botaoFormPerfil"
                  >
                    Alterar
                  </button>
                </div>
              </div>
              <div className="campoPerfil">
                <label for="nome">Nova Senha:</label>
                <input ref={valorSenha}type="password"></input>
                <div className="botaoSpace">
                  <button
                    type="button"
                    onClick={() => alterarSenha()}
                    className="botaoFormPerfil"
                  >
                    Alterar
                  </button>
                </div>
              </div>
              <div className="campoPerfil">
                <label for="nome">Novo Email:</label>
                <input ref={valorEmail} type="text"></input>
                <div className="botaoSpace">
                  <button
                    type="button"
                    onClick={() => alterarEmail()}
                    className="botaoFormPerfil"
                  >
                    Alterar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Layout(Perfil);
