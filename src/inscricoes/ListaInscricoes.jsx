import { useEffect, useState } from "react";
import Inscricao from "./Inscricao";
import axios from 'axios';
import '../styles/ListaInscricoes.css';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import Navbar from "../navbar/Navbar";

export default function ListaInscricoes(){

    const [validado, setValidado] = useState(false);
    const [formData, setFormData] = useState({
        sigla : ' '
    })

    const form = useForm();
    const { register, handleSubmit } = form;

    const submit = async (data) => {
        
        try {
            //Envio dos dados do formulário + idRep + idUsername
            const response = await axios.post('http://localhost:3000/inscricoes', {username});

            setMsg(response.data);
            if(response.data.includes('sucesso'))
                setUserCriado(true);
        } catch (error) {
            setMsg(error.response.data);
        }   
        
    }

    const config = {
        headers:{
            'Authorization' : 'Bearer '.concat(sessionStorage.getItem('token'))
        }
    }
    
    useEffect(() => {

        async function valida(){
            try{
                const resposta = await axios.get(`http://localhost:3000/inscricoes`,config);
                console.log(resposta);
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
            <h2>Liste suas inscrições</h2>
             
            <button>Listar</button>
        </>   
    )
}
