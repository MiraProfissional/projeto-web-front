import { useEffect, useState } from "react";
import Inscricao from "./Inscricao";
import axios from 'axios';

export default function BuscaInscricao({ formData, config, onInscricaoDelete }) {
  const [msg, setMsg] = useState('');
  const [inscricoes, setInscricoes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resposta = await axios.get(`http://localhost:3000/inscricoes/${formData.id}`, config);

        if (resposta.status === 200) {
          const listaInscricoes = resposta.data.map((inscricao) => (
            <Inscricao
              key={inscricao.id}
              inscricao={inscricao}
              onDelete={handleDelete}
            />
          ));
          setInscricoes(listaInscricoes);
          setMsg('');
        } else {
          setMsg('Você não possui inscrições');
          setInscricoes([]);
        }
      } catch (error) {
        console.error('Erro na chamada /inscricoes:', error);
        setMsg('Ocorreu um erro ao processar as informações.');
        setInscricoes([]);
      }
    };

    fetchData();
  }, [formData, config]);

  const handleDelete = (inscricaoId) => {
    // Atualize o estado após a exclusão
    setInscricoes((prevInscricoes) =>
      prevInscricoes.filter((inscricao) => inscricao.key !== inscricaoId)
    );

    // Chame a função de callback para exclusão no componente pai (ListaInscricoes)
    onInscricaoDelete(inscricaoId);
  };

  return (
    <>
      {inscricoes.length > 0 ? inscricoes : <p>{msg}</p>}
    </>
  );
}
