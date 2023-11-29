import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Navbar.css';

export default function Navbar () {

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
                const resposta = await axios.get(`http://localhost:3000/mi`,config);

                //Armazena o objeto da requisição na variável "resposta"
                setResposta(resposta)
                
                if (resposta.status === 200) {
                    setValidado(true);
                }
            }catch(error){
                setValidado(false);
            }
        }
        valida();
    }, []);
    
    if(!validado){
        return <p>Token Inválido</p>
    }

    return (
        <>
            <section className='teste'>
                <button className='btn-home'>Home</button>
                <section className='container'>
                    <button className="btn-inscricoes">
                        Minhas inscrições
                    </button>
                <button className="btn-configuracoes" data-toggle="dropdown">
                    Configurações
                </button>
                </section>
            </section>
            <h3 className='bv'>Bem vindo, {resposta.data["username"]}</h3>
          
        </>
      );

}
