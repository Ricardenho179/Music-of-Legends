import React from 'react'
import {Link} from 'react-router-dom'
import close from './../close.png'
import logo from './../music_logo.png'

const Layout = (Comp) => (props) => {

  return (
    <div className="layout">
      <header className="App-header"> 
        <div className="music-of-legends">
          <div className="button">
            <button onClick={() => props.deslogar()} className="btn btn-dark">
                <img src={close}></img>
            </button>
          </div>
              <img src={logo}></img>
          </div>  
          <div className="menu">
          <div className="col-sm">
            <Link to="/home">Home</Link>
          </div>
          <div className="col-sm">
            <Link to="/perfil">Perfl</Link>
          </div>
          <div className="col-sm">
            <Link to="/pergunta">Perguntas</Link>
          </div>
        </div>
      </header> 
      <Comp />
      <footer className="Footer">
        <h4>Desenvolvido por: Ricardo Araújo Turma: TI13</h4>
      </footer>
    </div>
  );
} 

export default Layout 