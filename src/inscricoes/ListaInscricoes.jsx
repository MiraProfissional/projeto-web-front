import { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../navbar/Navbar";
import axios from 'axios';
import Inscricao from "./Inscricao.jsx"
import '../styles/ListaInscricoes.css';
import { useForm } from "react-hook-form";

export default function ListaInscricoes(){

    const [validado, setValidado] = useState(false);
    const [resposta, setResposta] = useState(null);
    const [respostaUser, setRespostaUser] = useState(null);
    const [formData, setFormData] = useState({
        id : ' '
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
        async function fetchData() {
            try {
                const respostaUser = await axios.get('http://localhost:3000/mi', config);
                console.log(respostaUser)
                // Verifica se a resposta foi bem-sucedida
                if (respostaUser.status === 200) {
                    setRespostaUser(respostaUser.data); // Ajusta para armazenar a propriedade 'data' da resposta
                    setValidado(true);
                } else {
                    setValidado(false);
                }
    
                // Chama a segunda função apenas se a primeira for bem-sucedida
                if (respostaUser.status === 200) {
                    try {

                        
                        const resposta = await axios.get(`http://localhost:3000/inscricoes/${respostaUser.data["inscricoes"]}`, config);
                        setResposta(resposta)
                        // Verifica se a resposta da segunda chamada foi bem-sucedida
                        if (resposta.status === 200) {
                            setValidado(true);
                        } else {
                            setValidado(false);
                        }
                    } catch (error) {
                        setValidado(false);
                    }
                }
            } catch (error) {
                setValidado(false);
            }
        }
    
        fetchData();
    }, []);


    if(!validado){
        return <p>Token Inválido</p>
    }
    return(
        <>
            <Navbar />
            <section className="pag-minhas-inscricoes">
                <h2>Minhas inscrições</h2>
                <form onSubmit={handleSubmit(submit)} noValidate>

                    <label htmlFor="id" placeholder="id">Id</label>
                    <input type="text" id="id" {...register('id')} />
                
                <button>Listar</button>
                </form>
                <BuscaInscricao formData={formData} config={config}/>
            </section>  
    </>  
    )
}

export function BuscaInscricao({formData, config}){
    const [msg, setMsg] = useState('');
    const [inscricoes, setInscricoes] = useState(<p>...</p>);
    const view = [];

    useEffect(() => {

        const submit = async () => {
            let endPoint = 'http://localhost:3000/inscricoes';
            endPoint = `${endPoint}/${formData.id}`
            try{
                const dados = await axios.get(`${endPoint}`, config);
                console.log('Dados recebidos:', dados.data);
                console.log('Dados recebidos:', dados.data);
                    view.push(<Inscricao inscricao={dados.data} />);

                setInscricoes(view);
                setMsg('');
            }catch(error){
                setMsg(error.response.data);
                setInscricoes(<p></p>);
                
            }
        }
        submit();
    }, [formData]);

    return(
        <>
            {inscricoes}
            {msg}
        </>
    )

}


