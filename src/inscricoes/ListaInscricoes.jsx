import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import axios from 'axios';
import { useForm } from "react-hook-form";
import Inscricao from "./Inscricao";

import '../styles/ListaInscricoes.css';

export default function ListaInscricoes() {
  
  const [msg, setMsg] = useState(' ');
  const [validado, setValidado] = useState(false);
  const [respostaUser, setRespostaUser] = useState(null);
  const [inscricoesUser, setInscricoesUser] = useState(null);
  const [idInscricao, setIdInscricao] = useState(null);
  const [inscricaoDeletada, setInscricaoDeletada] = useState(false);
  const [infoInscricoes, setInfoInscricoes] = useState(null);

  const form = useForm();

  const config = {
    headers: {
      'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))
    }
  };

  useEffect(() => {
    async function valida(){
      try{
        const resposta = await axios.get(`http://localhost:3000/mi`, config);

        //Armazena o objeto da requisição na variável "resposta"
        setResposta(resposta)
        
        if (resposta.status === 200) {
          setValidado(true);
          setIdUser(resposta.data['id']);
          setInscricoesUser(resposta.data['inscricoes']);
          const retInfoInscricoes = await axios.get(`http://localhost:3000/inscricoes-usuario`, inscricoesUser);
          setInfoInscricoes(retInfoInscricoes);
        }
      }
      catch(error){
        setValidado(false);
      }
    }
    
    valida();
  }, []);

  const submit = async (idInscricao) => {
    try {
      const response = await axios.post('http://localhost:3000/excluir-inscricao',  {idUser, idInscricao});
      setMsg(response.data);

      if(response.status === 409) {
        setInscricaoDeletada(true);
      }
      if(response.data.includes("sucesso")) {
        setInscricaoDeletada(true);
      }
    } 
    catch (error) {
    }
  }

  if (!validado) {
    return <p>Token Inválido</p>
  }

  return (
    <>
      <Navbar />
      <section className="pag-minhas-inscricoes">
        <h1>Minhas Inscrições</h1>
        <p className='server-response' style={{visibility : inscricaoDeletada ? 'visible' : 'hidden'}}>{msg}</p>
        {infoInscricoes((inscricao) => (
          <Inscricao
            key={inscricao.id}
            inscricao={inscricao}
            onDelete={submit}
          />
        ))}
      </section>
    </>
  );
}