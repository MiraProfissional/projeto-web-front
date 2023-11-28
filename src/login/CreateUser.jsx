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

    return (
        <>
            <h2>Crie uma nova conta</h2>
            <form onSubmit={handleSubmit(submit)} noValidate>
                <label htmlFor="username" placeholder="usuário">Usuário</label>
                <input type="text" id="username" {...register('username')} />
                <p className='erro'>{errors.username?.message}</p>

                <label htmlFor="email" placeholder="email">Email</label>
                <input type="text" id="email" {...register('email')} />
                <p className='erro'>{errors.email?.message}</p>

                <label htmlFor="password">Senha</label>
                <input type="password" id="password" {...register('password')} />
                <p className='erro'>{errors.password?.message}</p>     

                <label htmlFor="passwordConf">Confirmar Senha</label>
                <input type="password" id="passwordConf" {...register('passwordConf')} />
                <p className='erro'>{errors.passwordConf?.message}</p>     

                <button>Criar Usuário</button>
            </form>

            <p className='server-response'>{msg}</p>
            <Link to="/"
            style={{visibility : userCriado ? 'visible' : 'hidden' }}
            >Fazer Login</Link>
            
        </>
    )

}