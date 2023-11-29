import { Link, Navigate } from 'react-router-dom';
import '../styles/Republica.css';
import logoPoquito from '../assets/logo-poquito.png';

export default function Republica({republica}){
    let caminhoImagem = republica.img;

    return (
        <>
            <div className='card-rep'>
                <section className='teste1'>
                    <figure>
                        <img src={logoPoquito} alt="" />
                        <figcaption>{republica.nome} {republica.anoDeCriacao}</figcaption>
                    </figure>
                </section>
                <ul className='card-rep-caracteristicas'>
                    <li>Gênero: {republica.genero}</li>
                    <li>Endereço: {republica.rua}, {republica.numero}</li>
                    <li>Moradores: {republica.qtdMembros}</li>
                    <li>Vagas: {republica.vagasDisponiveis}</li>
                    <button className='btn btn-rep'><Link to={`/republica/${republica.nome}`}>Acessar página</Link></button>
                </ul>
            </div>
        </>
    )
}