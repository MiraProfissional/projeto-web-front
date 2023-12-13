import { useEffect, useState } from "react";
import Republica from "./Republica";
import Navbar from "../navbar/Navbar";
import axios from 'axios';
import '../styles/ListaRepublicas.css';
import { useForm } from "react-hook-form";

export default function ListaRepublicas(){

    const [validado, setValidado] = useState(false);
    const [formData, setFormData] = useState({
        nome : ' '
    })
    const [selecao, setSelecao] = useState('');

    const form = useForm();
    const { register, handleSubmit } = form;

    const submit = (data) => {
        setFormData({...formData, ...data});
    }

    const handleChange = (event) => {
        setSelecao(event.target.value);
      };

    const config = {
        headers:{
            'Authorization' : 'Bearer '.concat(sessionStorage.getItem('token'))
        }
    }

    useEffect(() => {

        async function valida(){
            try{
                const resposta = await axios.get(`http://localhost:3000/republicas`,config);
    
                if (resposta.status === 200) {
                    setValidado(true);
                }
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
            <section id='pag-republicas'>
                <Navbar/>
                <section className="filtros-home">

                </section>
                <p className="titulo">Repúblicas</p>
                <section className="lista-republicas">
                    <BuscaRepublica formData={formData} config={config}/>
                </section>
            </section>
        </>   
    )
}

export function BuscaRepublica({formData, config}){

    const [msg, setMsg] = useState('');
    const [republicas, setRepublicas] = useState(<p>...</p>);
    const view = [];

    useEffect(() => {

        const submit = async () => {
            let endPoint = 'http://localhost:3000/republicas';
            endPoint = `${endPoint}/${formData.nome}`
            try{
                const dados = await axios.get(`${endPoint}`, config);
                if(Array.isArray(dados.data)){
                    for(let republica of dados.data){
                        view.push(<Republica republica={republica} />);
                    }
                }else{
                    view.push(<Republica republica={dados.data} />);
                }
                setRepublicas(view);
                setMsg('');
            }catch(error){
                setMsg(error.response.data);
                setRepublicas(<p></p>);
                
            }
        }
        submit();
    }, [formData]);

    return(
        <>
            {republicas}
            {msg}
        </>
    )

}