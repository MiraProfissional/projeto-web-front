import Navbar from "../navbar/Navbar";
import '../styles/edita_senha.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';


export default function EditaSenha(){

    const schema = yup.object({
        senha: yup.string().min(2,'Campo Obrigatório').required(),
        novaSenha: yup.string().min(2,'É necessário confirmar a senha').required().oneOf([yup.ref('senha')], 'As senhas devem coincidir!')
    });

    const [validado, setValidado] = useState(false);
    const [resposta, setResposta] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [senhaAlterada, setSenhaAlterada] = useState(true);
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
                setSenhaAlterada(true);
            }
            if(response.data.includes("sucesso")) {
                setSenhaAlterada(true);
            }
        } catch (error) {
            setMsg(error.response.data);
        }   
        
    }

    return(
        <>  
        <Navbar/>
        <section className="container">
                <p className="titulo">Editar senha</p>
                <p className='server-response' style={{visibility : senhaAlterada ? 'visible' : 'hidden'}}>{msg}</p>
                <div className="box">
                    <section className="secoes">
                        <section className="secoes1">
                            <form onSubmit={handleSubmit(submit)} noValidate>
                                <label className="label" htmlFor="senha" placeholder="senha">Nova Senha</label>
                                <input type="password" id="senha" {...register('senha')}/>
                                <p className="erro">{errors.senha?.message}</p>
                                
                                <label className="label" htmlFor="novaSenha" placeholder="novaSenha">Confirme a senha</label>
                                <input type="password" id="novaSenha" {...register('novaSenha')}/>
                                <p className="erro">{errors.novaSenha?.message}</p>
                                
                                <button className="btn3">Editar</button>
                            </form>
                        </section>
                    </section>
                </div>
            </section>
        </>  
    )
}