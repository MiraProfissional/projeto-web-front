import '../styles/ListaInscricoes.css';
import React from 'react';
import axios from 'axios';

const Inscricao5 = ({inscricao, onDelete}) => {
  const handleClick = async () => {
    try {
      onDelete(inscricao.id);
    }
    catch (error) {
      console.error('Erro ao excluir inscrição:', error);
    }
  }
};

export default function Inscricao(inscricao) {
  return (
    <>
      <Navbar />
      <section className='inscricao'>
        <p className='titulo1'>{inscricao.nome}</p>
        <h2>Id: {inscricao.id}</h2>
        <li>República: {inscricao.republica}</li>
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
        <button className="btn" onClick={handleClick}>Excluir</button>
        <button className="btn">Editar</button>
      </section>
    </>
  );
};



