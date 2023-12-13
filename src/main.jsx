import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//Configuracoes do React Router (npm install react-router-dom)
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
//Importando rotas
import Login from './login/Login.jsx';
import CreateUser from './login/CreateUser.jsx';
import ListaRepublicas from './republica/ListaRepublicas.jsx';
import PagRepublica from './republica/PagRepublica.jsx';
import CreateInscricao from './inscricoes/CreateInscricao.jsx';
import ListaInscricoes from './inscricoes/ListaInscricoes.jsx';
import EditaConfig from './configuracoes/EditaConfig.jsx';
import EditaPerfil from './edita_perfil/edita_perfil.jsx';
import EditaEmail from './edita_email/edita_email.jsx';
import EditaSenha from './edita_senha/edita_senha.jsx';

//Adicionando as rotas
const router = createBrowserRouter([
  {
    path: '/', //pagina home é para logar
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: 'criar-user',
        element: <CreateUser />
      }   
    ]
  },
  {
    path: 'republicas',
    element: <ListaRepublicas />
  },
  {
    path: 'republica/:nome',
    element: <PagRepublica/>
  },
  {
    path: 'create-inscricao/:nome',
    element: <CreateInscricao/>
  },
  {
    path: 'inscricoes',
    element: <ListaInscricoes/>
  },
  {
    path: 'configuracoes',
    element: <EditaConfig/>
  },
  {
    path: 'edita_perfil',
    element: <EditaPerfil/>
  },
  {
    path: 'edita_email',
    element: <EditaEmail/>
  },
  {
    path: 'edita_senha',
    element: <EditaSenha/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)