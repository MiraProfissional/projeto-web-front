import {set, useForm} from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CreateInscricao(){

    const [msg, setMsg] = useState();
    const [userCriado,setUserCriado] = useState(false);

    const schema = yup.object({
        nome: yup.string().required('O preenchimento do campo Usuário é obrigatório'),
        idade: yup.number().required('O preenchimento do campo Idade é obrigatório'),
        cidade: yup.string().required('O preenchimento do campo Cidade é obrigatório'),
        curso: yup.string().required('O preenchimento do campo Curso é obrigatório'),
        redeSocial: yup.string().required('O preenchimento do campo Rede Social é obrigatório'),
        celular: yup.number().required('O preenchimento do campo Celular é obrigatório'),
        sobre: yup.string().required('O preenchimento do campo Sobre é obrigatório'),
        curiosidade: yup.string().required('O preenchimento do campo Curiosidade é obrigatório'),
        motivoEscolha: yup.string().required('O preenchimento do campo Motivo da Escolha é obrigatório'),
    });

    const form = useForm({
        resolver: yupResolver(schema)
    });

    

    const { register, handleSubmit, formState } = form;

    const {errors} = formState;

    const submit = async (data) => {
        
        try {
            const response = await axios.post('http://localhost:3000/create-inscricao', data);
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
                <label htmlFor="nome" placeholder="nome">Nome</label>
                <input type="text" id="nome" {...register('nome')} />
                <p className='erro'>{errors.nome?.message}</p>

                <label htmlFor="idade" placeholder="idade">Idade</label>
                <input type="number" id="idade" {...register('idade')} />
                <p className='erro'>{errors.idade?.message}</p>

                <label htmlFor="cidade">Cidade</label>
                <input type="cidade" id="cidade" {...register('cidade')} />
                <p className='erro'>{errors.cidade?.message}</p>     

                <label htmlFor="curso">Curso</label>
                <input type="text" id="curso" {...register('curso')} />
                <p className='erro'>{errors.curso?.message}</p> 

                <label htmlFor="redeSocial" placeholder="nome">Rede Social</label>
                <input type="text" id="redeSocial" {...register('redeSocial')} />
                <p className='erro'>{errors.redeSocial?.message}</p>

                <label htmlFor="celular" placeholder="celular">Celular</label>
                <input type="number" id="celular" {...register('celular')} />
                <p className='erro'>{errors.celular?.message}</p>

                <label htmlFor="sobre">Sobre</label>
                <input type="textarea" id="sobre" {...register('sobre')} />
                <p className='erro'>{errors.sobre?.message}</p>     

                <label htmlFor="curiosidade">Curiosidade</label>
                <input type="textarea" id="curiosidade" {...register('curiosidade')} />
                <p className='erro'>{errors.curiosidade?.message}</p>

                <label htmlFor="motivoEscolha">Motivo por ter nossa república</label>
                <input type="textarea" id="motivoEscolha" {...register('motivoEscolha')} />
                <p className='erro'>{errors.motivoEscolha?.message}</p>

                <button>Enviar inscrição</button>
            </form>

            <p className='server-response'>{msg}</p>
            <Link to="/republicas"
            style={{visibility : userCriado ? 'visible' : 'hidden' }}
            >Fazer Login</Link>
            
        </>
    )

}