import { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../navbar/Navbar";
import axios from 'axios';
import '../styles/PagRepublica.css';
import CreateInscricao from "../inscricoes/CreateInscricao";

export default function PagRepublica(){

    // Buscando o nome da republica através da URL
    const { nome } = useParams();

    const [validado, setValidado] = useState(false);
    const [resposta, setResposta] = useState(null);
    const [formAtivo,setFormAtivo] = useState(false);
    const createInscricaoRef = useRef();
    
    const config = {
        headers:{
            'Authorization' : 'Bearer '.concat(sessionStorage.getItem('token'))
        }
    }

    useEffect(() => {
        
        async function valida(){
            try{
                const resposta = await axios.get(`http://localhost:3000/republica/${nome}`,config);
                setResposta(resposta)
                if(resposta.status === 200)
                    setValidado(true);
            }catch(error){
                setValidado(false);
            }
        }
        valida();
        
    }, []);
    
    const handleInscrever = () => {
        setFormAtivo(true);
    };

    if(!validado){
        return <p>Token Inválido</p>
    }
    return(
        <>  
            <section  id='pag-republica'>
                <Navbar/>
                <div></div>
                    <figure>
                        <img className="logo-rep" src={`../src/assets/${resposta.data.logo}.png`} alt="" />
                        <figcaption>
                            <h3>{resposta.data.nome} ({resposta.data.anoDeCriacao})</h3>                    
                        </figcaption>
                    </figure>
                    <div className="box-descricao">
                        <section className="descricao">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam possimus quibusdam blanditiis et modi itaque magni. Obcaecati, iste exercitationem deleniti facere tempora non blanditiis! Similique error tempore voluptatibus. Corporis, quaerat.</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam possimus quibusdam blanditiis et modi itaque magni. Obcaecati, iste exercitationem deleniti facere tempora non blanditiis! Similique error tempore voluptatibus. Corporis, quaerat.</p>
                            <figure>
                                <img className="img-rep" src={`../src/assets/${resposta.data.img}.png`} alt="" />
                            </figure>
                        </section>
                </div>
                <section className="filtros-home">
                
                </section>
                <section className="botao">   
                <button onClick={handleInscrever} style={{visibility : formAtivo ? 'hidden' : 'visible' }} className='btn btn-inscricao'>Inscrever-se</button>
                </section>
                
            </section>
            <section>
                {formAtivo && <CreateInscricao ref={createInscricaoRef} republica={resposta.data.id} style={{visibility : 'visible' }}/>}
            </section>
        </>   
    )
}

