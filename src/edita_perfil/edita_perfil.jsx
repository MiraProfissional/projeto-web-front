import Navbar from "../navbar/Navbar";
import '../styles/edita_email.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';


export default function EditaPerfil(){

    const schema = yup.object({
        username: yup.string().required("Campo obrigatório"),
    });

    const [validado, setValidado] = useState(false);
    const [resposta, setResposta] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [usernameAlterado, setUsernameAlterado] = useState(true);
    const [formData, setFormData] = useState(null);

    const config = {
        headers:{
            'Authorization' : 'Bearer '.concat(sessionStorage.getItem('token'))
        }
    }

    const form = useForm({
        resolver: yupResolver(schema)
    });

    const [msg, setMsg] = useState(' ');

    const { register, handleSubmit, formState } = form;

    const {errors} = formState;
    
    useEffect(() => {
        async function valida(){
            try{
                const resposta = await axios.get(`http://localhost:3000/mi`, config);

                //Armazena o objeto da requisição na variável "resposta"
                setResposta(resposta)
                
                if (resposta.status === 200) {
                    setValidado(true);
                    setIdUser(resposta.data['id']);
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

    const submit = async (data) => {
        try {
            setFormData({...formData, ...data});
            const response = await axios.post('http://localhost:3000/edita_perfil', {...data, idUser});
            setMsg(response.data);

            if(response.status === 409) {
                setUsernameAlterado(true);
            }
            if(response.data.includes("sucesso")) {
                setUsernameAlterado(true);
            }
        } catch (error) {
            setMsg(error.response.data);
        }   
        
    }

    return(
        <>  
        <Navbar/>
        <section className="container">
                <p className="titulo">Editar username</p>
                <p className='server-response' style={{visibility : usernameAlterado ? 'visible' : 'hidden'}}>{msg}</p>
                <div className="box">
                    <section className="secoes">
                        <section className="secoes1">
                            <p className="subtitulo">Username atual</p>
                            <p>{resposta.data["username"]}</p>
                        </section>
                    </section>
                    <hr/>
                    <section className="secoes">
                        <section className="secoes1">
                            <form onSubmit={handleSubmit(submit)} noValidate>
                                <label className="label" htmlFor="novoUsername" placeholder="novoUsername">Novo username</label>
                                <input type="text" id="novoUsername" {...register('username')}/>
                                <p className="erro">{errors.username?.message}</p>
                                <button className="btn3">Editar</button>
                            </form>
                        </section>
                    </section>
                </div>
            </section>
        </>  
    )
}