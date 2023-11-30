import Navbar from "../navbar/Navbar";
import '../styles/EditaConfig.css';

export default function EditaConfig(){
    return(
        <>  
        <Navbar/>
            <section className="pag-minhas-configuracoes">
                <h1>Minhas Configurações</h1>

                <button>Editar</button>
            </section>
        </>  
    )
}