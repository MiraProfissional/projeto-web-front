import { useEffect, useState } from "react";
import Republica from "./Republica";
import Navbar from "../navbar/Navbar";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { Link, Navigate } from 'react-router-dom';
import '../styles/PagRepublica.css';
import logoPoquito from '../assets/logo-poquito.png';


export default function PagRepublica(){

    const [validado, setValidado] = useState(false);
    const [formData, setFormData] = useState({
        nome : ' '
    })

    const form = useForm();
    const { register, handleSubmit } = form;

    const submit = (data) => {
        setFormData({...formData, ...data});
    }


    const config = {
        headers:{
            'Authorization' : 'Bearer '.concat(sessionStorage.getItem('token'))
        }
    }
    
    useEffect(() => {

        async function valida(){
            try{
                const resposta = await axios.get(`http://localhost:3000/republicas`,config);
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
            <section  id='pag-republica'>
                <Navbar/>
                <figure>
                    <img src={logoPoquito} alt="" />
                    <figcaption>
                        <h3>Nome e ano da República</h3>                    
                    </figcaption>
                </figure>
                <div className="box-descricao">
                    <section className="descricao">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam possimus quibusdam blanditiis et modi itaque magni. Obcaecati, iste exercitationem deleniti facere tempora non blanditiis! Similique error tempore voluptatibus. Corporis, quaerat.</p>
                        <figure>
                            <img className="foto-rep" src={logoPoquito} alt="" />
                        </figure>
                    </section>
                </div>
                {/* <section className="filtros-home">
                    <BuscaRepublica formData={formData} config={config}/>
                </section> */}
                <section className="botao">
                    <button className='btn btn-inscricao'><Link to={`/create-inscricao`}>Inscrever</Link></button>
                </section>
            </section>
        </>   
    )
}

export function BuscaRepublica({formData, config}){

    const [msg, setMsg] = useState('');
    const [republica, setRepublica] = useState(<p>...</p>);

    useEffect(() => {

        const submit = async () => {
            let endPoint = 'http://localhost:3000//republicas/:nome';
            endPoint = `${endPoint}/${formData.nome}`
            try{
                const dados = await axios.get(`${endPoint}`, config);
                if(Array.isArray(dados.data)){
                    for(let republica of dados.data){
                        // Aqui deve ter uma condição para buscar pela república específica
                        setRepublica(<Republica republica={republica} />);
                    }
                }
                setMsg('');
            }catch(error){
                setMsg(error.response.data);
                setRepublica(<p></p>);

            }
        }
        submit();
    }, [formData]);

    return(
        <>
            {republica}
            {msg}
        </>
    )

}