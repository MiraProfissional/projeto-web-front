import '../styles/ListaInscricoes.css';
import React from 'react';
import axios from 'axios';

const Inscricao = ({ inscricao, onDelete }) => {
  const handleDeleteClick = async () => {
    try {
      // Faça a chamada para excluir a inscrição usando o ID
      await axios.delete(`http://localhost:3000/inscricoes/${inscricao.id}`);
      
      // Atualize o estado ou realize qualquer outra ação necessária após a exclusão
      onDelete(inscricao.id);
    } catch (error) {
      console.error('Erro ao excluir inscrição:', error);
    }
  };

  let caminhoImagem = republica.logo;

  return (
    <>
      <section className='inscricao'>
        <img className="logo"src={`src/assets/${caminhoImagem}.png`} alt="" />
        <p className='titulo1'>{inscricao.nome}</p>
        <h2>Id: {inscricao.id}</h2>
        <li>Nome: {inscricao.nome}</li>
        <li>Idade: {inscricao.idade}</li>
        <li>Cidade: {inscricao.cidade}</li>
        <li>Curso: {inscricao.curso}</li>
        <li>Redesocial: {inscricao.redesocial}</li>
        <li>Celular: {inscricao.celular}</li>
        <li>Sobre: {inscricao.sobre}</li>
        <li>Curiosidade: {inscricao.curiosidade}</li>
        <li>Motivo da Escolha: {inscricao.motivosEcolha}</li>
      </section>
      <section className='btns'>
        <button className="btn" onClick={handleDeleteClick}>Excluir</button>
        <button className="btn">Editar</button>
      </section>
    </>
  );
};

export default Inscricao;
