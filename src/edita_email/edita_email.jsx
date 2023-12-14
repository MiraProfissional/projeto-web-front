import Navbar from "../navbar/Navbar";
import '../styles/edita_email.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';


export default function EditaEmail(){

    const schema = yup.object({
        email: yup.string().email('Email inválido').required("Email obrigatório"),
        emailConf: yup.string().required('É necessário confirmar seu email').oneOf([yup.ref('email')], 'Os emails devem coincidir!'),
    });

    const [validado, setValidado] = useState(false);
    const [resposta, setResposta] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [emailAlterado, setEmailAlterado] = useState(true);
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
            const response = await axios.post('http://localhost:3000/edita_email', {...data, idUser});
            setMsg(response.data);

            if(response.status === 409) {
                setEmailAlterado(true);
            }
            if(response.data.includes("sucesso")) {
                setEmailAlterado(true);
            }
        } catch (error) {
            setMsg(error.response.data);
        }   
        
    }

    return(
        <>  
        <Navbar/>
        <section className="container">
                <p className="titulo">Editar email</p>
                <p className='server-response' style={{visibility : emailAlterado ? 'visible' : 'hidden'}}>{msg}</p>
                <div className="box">
                    <section className="secoes">
                        <section className="secoes1">
                            <p className="subtitulo">Email atual</p>
                            <p>{resposta.data["email"]}</p>
                        </section>
                    </section>
                    <hr/>
                    <section className="secoes">
                        <section className="secoes1">
                            <form onSubmit={handleSubmit(submit)} noValidate>
                                <label className="label" htmlFor="email" placeholder="email">Novo Email</label>
                                <input type="text" id="email" {...register('email')}/>
                                <p className="erro">{errors.email?.message}</p>
                                
                                <label className="label" htmlFor="emailConf" placeholder="emailConf">Confirme o Email</label>
                                <input type="text" id="emailConf" {...register('emailConf')}/>
                                <p className="erro">{errors.emailConf?.message}</p>
                                
                                <button className="btn3">Editar</button>
                            </form>
                        </section>
                    </section>
                </div>
            </section>
        </>  
    )
}