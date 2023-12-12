import { Link, Navigate } from 'react-router-dom';
import '../styles/Republica.css';
import logoPoquito from '../assets/logo-poquito.png';

export default function Republica({republica}){
    let caminhoImagem = republica.logo;

    return (
        <>
            <section className='card'>
                        <img className="logo"src={`src/assets/${caminhoImagem}.png`} alt="" />
                <ul className='card-rep-caracteristicas'>
                    <li><span className='sub-titulo'>Gênero:</span> {republica.genero}</li>
                    <li><span className='sub-titulo'>Endereço:</span> {republica.rua}, {republica.numero}</li>
                    <li><span className='sub-titulo'>Moradores:</span> {republica.qtdMembros}</li>
                    <li><span className='sub-titulo'>Vagas:</span> {republica.vagasDisponiveis}</li>
                    <button className='btn'><Link to={`/republica/${republica.nome}`}>Acessar página</Link></button>
                </ul>
            </section>
        </>
    )
}