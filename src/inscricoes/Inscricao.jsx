export default function Disciplina({inscricao}){

    return (
        <ul>
            <h2>Sigla: {inscricao.sigla}</h2>
            <li>Ementa: {inscricao.ementa}</li>
        </ul>
    )
}