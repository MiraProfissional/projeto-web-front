import { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../navbar/Navbar";
import axios from 'axios';
import { useForm } from "react-hook-form";
import Inscricao from "./Inscricao"
import '../styles/ListaInscricoes.css';

export default function ListaInscricoes(){

    const [validado, setValidado] = useState(false);
    const [resposta, setResposta] = useState(null);
    const [respostaUser, setRespostaUser] = useState(null);


    const config = {
        headers:{
            'Authorization' : 'Bearer '.concat(sessionStorage.getItem('token'))
        }
    }

    useEffect(() => {
        async function valida() {
            try {
                const respostaUser = await axios.get('http://localhost:3000/mi', config);
                // Verifica se a resposta foi bem-sucedida
                if (respostaUser.status === 200) {
                    setRespostaUser(respostaUser.data); // Ajusta para armazenar a propriedade 'data' da resposta
                    setValidado(true);
                } else {
                    setValidado(false);
                }
    
                // Chama a segunda função apenas se a primeira for bem-sucedida
                if (respostaUser.status === 200) {
                    try {
                        
                        const resposta = await axios.get(`http://localhost:3000/inscricoes/${respostaUser.data["inscricoes"]}`, config);
                        setResposta(resposta)
                        console.log(resposta.status);
                        console.log("Resposta status");
                        // Verifica se a resposta da segunda chamada foi bem-sucedida
                        if (resposta.status === 200) {
                            setValidado(true);
                        }
                    } catch (error) {
                        setValidado(false);
                    }
                }
            } catch (error) {
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
            <section className="pag-minhas-inscricoes">
                <h1>Minhas Inscrições</h1>
                <h2>Liste suas inscrições</h2>
                
                <button>Listar</button>
            </section>
        </>   
    )
}

