import Navbar from "../navbar/Navbar";
import '../styles/edita_perfil.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';


export default function EditaEmail(){

    const [validado, setValidado] = useState(false);
    const [resposta, setResposta] = useState(null);

    const config = {
        headers:{
            'Authorization' : 'Bearer '.concat(sessionStorage.getItem('token'))
        }
    }

    const [msg, setMsg] = useState(' ');

    const form = useForm();

    const { register, handleSubmit, formState } = form;

    const {errors} = formState;

    const submit = async (data) => {

        try {
            const idUser = resposta.data["id"]
            const response = await axios.post('http://localhost:3000/edita_email', {data, idUser});

            //Extrair o token
            const token = response.data.token;
            sessionStorage.setItem('token', token);
            if(token) 
                setMsg('Autenticado');
        } catch (error) {
            setMsg(error.response.data);
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
                <p className="titulo">Edita Email</p>
                <div className="box">
                    <section className="secoes">
                        <section className="secoes1">
                            <p className="subtitulo">Email Antigo</p>
                            <p>{resposta.data['email']}</p>
                        </section>
                    </section>
                    <hr/>
                    <section className="secoes">
                        <section className="secoes1">
                            <p className="subtitulo">Email Novo</p>
                            <input type="text" id="email" {...register('username')} className="input"/>
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