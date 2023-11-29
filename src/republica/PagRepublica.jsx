import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import axios from 'axios';

export default function PagRepublica(){

    const [validado, setValidado] = useState(false);
    const [resposta, setResposta] = useState(null);

    
    const config = {
        headers:{
            'Authorization' : 'Bearer '.concat(sessionStorage.getItem('token'))
        }
    }

    useEffect(() => {

        
        async function valida(){
            try{
                const resposta = await axios.get(`http://localhost:3000/republica/:nome`,config);
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
            <section id='pag-republica'>
                <Navbar/>
                <section className="filtros-home">
                    
                </section>
                <button  className='btn btn-inscricao'>Inscrever</button>
            </section>
        </>   
    )
}

