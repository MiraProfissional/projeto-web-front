import Navbar from "../navbar/Navbar";
import '../styles/edita_perfil.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function EditaPerfil(){

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
                const resposta = await axios.get(`http://localhost:3000/mi`, config);

                //Armazena o objeto da requisição na variável "resposta"
                setResposta(resposta)
                
                if (resposta.status === 200) {
                    setValidado(true);
                }
            }
            catch(error){
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
        <Navbar/>
        <section className="container">
                <p className="titulo">Edita Usuário</p>
                <div className="box">
                    <section className="secoes">
                        <section className="secoes1">
                            <p className="subtitulo">Usuário Antigo</p>
                            <p>{resposta.data['username']}</p>
                        </section>
                    </section>
                    <hr/>
                    <section className="secoes">
                        <section className="secoes1">
                            <p className="subtitulo">Usuário Novo</p>
                            <input className="input"/>
                        </section>
                    </section>
                </div>
                <section>
                    <button className="btn3">Editar</button>
                </section>
            </section>
        </>  
    )
}