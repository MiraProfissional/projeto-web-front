export default function Republica({republica}){

    return (
        <ul>
            <h2>Nome: {republica.nome}</h2>
            <li>Endereço: {republica.rua}, {republica.numero}</li>
            <li>Moradores: {republica.qtdMembros}</li>
            <li>Vagas: {republica.qtdMembros}</li>
        </ul>
    )
}