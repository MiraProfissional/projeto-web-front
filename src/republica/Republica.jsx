import '../styles/Republica.css';
import logoPoquito from '../assets/logo-poquito.png';

export default function Republica({republica}){
    let caminhoImagem = republica.img;

    return (
        <>
            <section className='card-rep'>
                <header>
                    <figure>
                        <img src={logoPoquito} alt="" />
                    </figure>
                    <ul>
                        <li>Nome: {republica.nome}</li>
                        <li>Since: {republica.anoDeCriacao}</li>
                        <li>Gênero: {republica.genero}</li>
                    </ul>
                </header>
                <ul className='card-rep-caracteristicas'>
                    <li>Endereço: {republica.rua}, {republica.numero}</li>
                    <li>Moradores: {republica.qtdMembros}</li>
                    <li>Vagas: {republica.vagasDisponiveis}</li>
                </ul>
            </section>
        </>
    )
}