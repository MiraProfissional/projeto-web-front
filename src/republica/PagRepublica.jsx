import { useEffect, useState } from "react";
import Republica from "./Republica";
import Navbar from "../navbar/Navbar";
import axios from 'axios';
import { useForm } from "react-hook-form";

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
            <section id='pag-republica'>
                <Navbar/>
                <section className="filtros-home">
                    <BuscaRepublica formData={formData} config={config}/>
                </section>
                <button className='btn btn-inscricao'><Link to={`/create-inscricao`}>Inscrever</Link></button>
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
                        // Aqui deve ter uma condição para buscar pela república específica
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