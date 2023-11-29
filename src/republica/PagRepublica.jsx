import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../navbar/Navbar";
import axios from 'axios';
import CreateInscricao from "../inscricoes/CreateInscricao";

export default function PagRepublica(){

    // Buscando o nome da republica através da URL
    const { nome } = useParams();

    const [validado, setValidado] = useState(false);
    const [resposta, setResposta] = useState(null);
    const [msg, setMsg] = useState();
    const [userCriado,setUserCriado] = useState(false);
    
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
    
    if(!validado){
        return <p>Token Inválido</p>
    }
    return(
        <>  
            <section  id='pag-republica'>
                <Navbar/>
                <div></div>
                    <figure>
                        <figcaption>
                            <h3>Nome e ano da República</h3>                    
                        </figcaption>
                    </figure>
                    <div className="box-descricao">
                        <section className="descricao">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam possimus quibusdam blanditiis et modi itaque magni. Obcaecati, iste exercitationem deleniti facere tempora non blanditiis! Similique error tempore voluptatibus. Corporis, quaerat.</p>
                            <figure>
                               
                            </figure>
                        </section>
                </div>
                <section className="filtros-home">
                
                </section>
                <button  className='btn btn-inscricao'>Inscrever</button>
            </section>
            
        </>   
    )
}

/* <p className='server-response'>{msg}</p>
            
            <CreateInscricao style={{visibility : userCriado ? 'visible' : 'hidden' }}/>
*/
