import '../styles/CreateUser.css';
import {set, useForm} from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CreateUser(){

    const [msg, setMsg] = useState();
    const [userCriado,setUserCriado] = useState(false);

    const schema = yup.object({
        username: yup.string().required('O preenchimento do campo Usuário é obrigatório'),
        email: yup.string().email('Email inválido').required('O preenchimento do campo Email é obrigatório'),
        password: yup.string().min(2,'Senha com no mínimo 2 caracteres').required('O preenchimento do campo Senha é obrigatório'),
        passwordConf: yup.string().required('É necessário confirmar sua senha').oneOf([yup.ref('password')], 'As senhas devem coincidir!'),
    });

    const form = useForm({
        resolver: yupResolver(schema)
    });

    

    const { register, handleSubmit, formState } = form;

    const {errors} = formState;

    const submit = async (data) => {
        
        try {
            const response = await axios.post('http://localhost:3000/create-user', data);
            setMsg(response.data);
            if(response.data.includes('sucesso'))
                setUserCriado(true);
        } catch (error) {
            setMsg(error.response.data);
        }   
        
        
    }

    return(
        <>
            <section className="container">
                <p className="titulo">Cadastro</p>
                <div className="box">
                    <form className="forms" onSubmit={handleSubmit(submit)} noValidate>
                        <label htmlFor="username" placeholder="usuário">Usuário</label>
                        <input type='text' id='username' {...register('username')}/>
                        <p className="erro">{errors.username?.message}</p>

                        <label htmlFor="email" placeholder="email">Email</label>
                        <input type='text' id='email' {...register('email')}/>
                        <p className="erro">{errors.email?.message}</p>

                        <label htmlFor="password" placeholder="email">Senha</label>
                        <input type='password' id='password' {...register('password')}/>
                        <p className="erro">{errors.password?.message}</p>

                        <label htmlFor="passwordConf" placeholder="senha1">Confirme a senha</label>
                        <input type='password' id='passwordConf' {...register('passwordConf')}/>
                        <p className="erro">{errors.passwordConf?.message}</p>

                        <button className="btn2">Criar Usuário</button>
                    </form>
                </div>
                <p className='server-response'>{msg}<Link to='/login' style={{visibility : userCriado ? 'visible' : 'hidden'}}>Fazer Login</Link></p>
            </section>
        </>
    )

}