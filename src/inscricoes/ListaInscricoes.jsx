import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import axios from 'axios';
import { useForm } from "react-hook-form";
import Inscricao from "./Inscricao";

import '../styles/ListaInscricoes.css';

export default function ListaInscricoes() {
  const [validado, setValidado] = useState(false);
  const [respostaUser, setRespostaUser] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    inscricoes: []
  });

  const form = useForm();
  const { handleSubmit } = form;

  const config = {
    headers: {
      'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const respostaUser = await axios.get('http://localhost:3000/mi', config);

        if (respostaUser.status === 200) {
          console.log('Resposta do endpoint /mi:', respostaUser.data);
          setRespostaUser(respostaUser.data);
          setFormData((prevData) => ({
            ...prevData,
            inscricoes: respostaUser.data.inscricoes || []
          }));
          setValidado(true);
        } else {
          setValidado(false);
        }
      } catch (error) {
        console.error('Erro na chamada /mi:', error);
        setValidado(false);
      }
    }

    fetchData();
  }, []);

  const handleInscricaoDelete = async (inscricaoId) => {
    try {
      // Faz a chamada DELETE para excluir a inscrição
      await axios.delete(`http://localhost:3000/inscricoes/delete/${inscricaoId}`, config);

      // Atualiza o estado ou realiza qualquer outra ação necessária após a exclusão
      console.log(`Inscrição ${inscricaoId} excluída com sucesso`);

      // Recarrega as inscrições após a exclusão (opcional)
      fetchData();
    } catch (error) {
      console.error('Erro ao excluir inscrição:', error);
    }
  };

  if (!validado) {
    return <p>Token Inválido</p>
  }

  const onSubmit = (data) => {
    setFormData({ id: data.id });
  };

  return (
    <>
      <Navbar />
      <section className="container">
        <p className="titulo">Minhas Inscrições</p>
        {formData.inscricoes.map((inscricao) => (
          <Inscricao
            key={inscricao.id}
            inscricao={inscricao}
            onDelete={handleInscricaoDelete}
          />
        ))}
      </section>
    </>
  );
}
