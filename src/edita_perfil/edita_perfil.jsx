import Navbar from "../navbar/Navbar";
import '../styles/edita_perfil.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { set, useForm } from 'react-hook-form';

export default function EditaPerfil(){

    const [msg, setMsg] = useState(' ');
    const [resposta, setResposta] = useState(null);
    const [validado, setValidado] = useState(false);
    const [idUser, setIdUser] = useState(null);

    const schema = yup.object( {
        username: yup.string().required('Campo obrigatório')
    });

    const form = useForm({
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, formState } = form;

    const {errors} = formState;

    const config = {
        headers: {
            'Authorization' : 'Bearer'.concat(sessionStorage.getItem('token'))
        }
    }
    
    // pegar id do usuário validando se está logado
    useEffect(() => {
        async function valida() {
            try {
                const resposta = await axios.get(`http://localhost:3000/mi`, config);
                
                setResposta(resposta);
                
                if(resposta.status === 200) {
                    setValidado(true);
                    setIdUser(resposta.data["id"]);
                }
            }
            catch(error) {
                setValidado(false);
            }
        }
        
        valida();
    }, []);

    if(!validado) {
        return <p>Token Inválido</p>
    }

    const submit = async (data) => {
        // Retornando informações do formulário + id do usuário logado
        const response = await axios.post('http://localhost:3000/edita_perfil', {...data,idUser});

        setMsg(response.data);
        if(response.data.includes('sucesso'))
            setTrocaFeita(true);
    }


    return(
        <>  
        <Navbar/>
        <section className="container">
                <p className="titulo">Usuário</p>
                <div className="box">
                    <section className="secoes">
                        <section className="secoes1">
                            <p className="subtitulo">Usuário Atual</p>
                            <p>{resposta.data["username"]}</p>
                        </section>
                    </section>
                    <hr/>
                    <section className="secoes">
                        <section className="secoes1">
                            <form onSubmit={handleSubmit(submit)} noValidate>
                                <label htmlFor="usernameAlt" placeholder="usernameAlt">Novo Username</label>
                                <input type="text" id="usernameAlt" {...register('usernameAlt')}/>
                                <button className="btn3">Editar</button>
                            </form>
                        </section>
                    </section>
                </div>
            </section>
        </>  
    )
}