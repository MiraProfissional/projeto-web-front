import '../styles/ListaInscricoes.css';

export default function Inscricao({inscricao}){

    return (
        <>
            <ul className='inscricao'>
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
            </ul>
            <section className='btns'>
                <button className="btn">Exluir</button>
                <button className="btn">Editar</button>
            </section>
        </>
    )
}