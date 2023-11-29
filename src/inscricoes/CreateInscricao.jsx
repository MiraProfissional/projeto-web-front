import { useState } from 'react';
import {set, useForm} from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import '../styles/PagRepublica.css';

export default function CreateInscricao({republica}){

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

            //Extrair o token
            const token = response.data.token;
            sessionStorage.setItem('token', token);
            if(token) 
                setMsg('Autenticado');
        } catch (error) {
            setMsg(error.response.data);
        }   
        
    }


    return (
        <>
            <h2 className='titulo-forms'>Bem vindo ao processo seletivo da república {}</h2>
            <form onSubmit={handleSubmit(submit)} noValidate>
                <h3>Informações Pessoais</h3>
                <div className='perguntas-forms'>
                    <section>
                        <label htmlFor="nome" placeholder="nome">Nome</label>
                        <input className='tam1' type="text" id="nome" {...register('nome')} />
                        <p className='erro'>{errors.nome?.message}</p>
                    </section>

                    <section>
                        <label htmlFor="idade" placeholder="idade">Idade</label>
                        <input className='tam1' type="number" id="idade" {...register('idade')} />
                        <p className='erro'>{errors.idade?.message}</p>
                    </section>

                    <section>
                        <label htmlFor="cidade">Cidade</label>
                        <input className='tam1' type="cidade" id="cidade" {...register('cidade')} />
                        <p className='erro'>{errors.cidade?.message}</p>  
                    </section>

                    <section>
                        <label htmlFor="curso">Curso</label>
                        <input className='tam1' type="text" id="curso" {...register('curso')} />
                        <p className='erro'>{errors.curso?.message}</p> 
                    </section>

                    <section>
                        <label htmlFor="redeSocial" placeholder="nome">Rede Social</label>
                        <input className='tam1' type="text" id="redeSocial" {...register('redeSocial')} />
                        <p className='erro'>{errors.redeSocial?.message}</p>
                    </section>

                    <section>
                        <label htmlFor="celular" placeholder="celular">Celular</label>
                        <input className='tam1' type="text" id="celular" {...register('celular')} />
                        <p className='erro'>{errors.celular?.message}</p>
                    </section>

                    <section className='sub-titulo'>
                        <h3>Informações adicionais</h3>
                    </section>

                    <section>   
                        <label htmlFor="sobre">Sobre</label>
                        <input className='tam2' type="textarea" id="sobre" {...register('sobre')} />
                        <p className='erro'>{errors.sobre?.message}</p>  
                    </section>   

                    <section>
                        <label htmlFor="curiosidade">Curiosidade</label>
                        <input className='tam2' type="textarea" id="curiosidade" {...register('curiosidade')} />
                        <p className='erro'>{errors.curiosidade?.message}</p>
                    </section>

                    <section>
                        <label htmlFor="motivoEscolha">Motivo por ter escolhido nossa república</label>
                        <input className='tam2' type="textarea" id="motivoEscolha" {...register('motivoEscolha')} />
                        <p className='erro'>{errors.motivoEscolha?.message}</p>
                    </section>
                </div>
                <button>Enviar inscrição</button>
            </form>
            
        </>
    )

}