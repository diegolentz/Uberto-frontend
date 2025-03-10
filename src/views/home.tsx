import { useContext, useState } from "react"
import { msjContext } from "../components/viewLayout/viewLayout"
import axios, { AxiosError } from "axios"
import { Recommendation, recommProps } from "../components/recommendation/recommendation"

export const Home = () => {
    const {showToast} = useContext(msjContext)

    const recomDelBack = {name:'Matias', date:'1/1/2025', rating:5 , comment:"comentario", avatarUrl:'avatar.jpeg', isEdit:false}
    const [recom, setRecom] = useState(recomDelBack)
    
    const cod200 = async () =>{
        try{
            const res = await axios.get('https://checkip.amazonaws.com')
            console.log('res => ', res)
            showToast(res)
        }catch(e : unknown){
            showToast((e as AxiosError<unknown>).response!)
        }
    }

    const cod400 = async () =>{
        try{
            const res = await axios.get('https://www.google.com')
            console.log('res => ', res)
            showToast(res)
        }catch(e : unknown){
            showToast((e as AxiosError<unknown>).response!)
        }
    }

    const handleChange = () =>{
        console.log('llamo a handle de cambio con recom ', recom)
        setRecom(recom)
    }

    const handleEdit = () =>{
        console.log('recom antes', recom)
        setRecom({...recom, isEdit:true})
        console.log('recom ', recom)
    }

    return(
        <>
            <p>Home de Usuario</p>
            <Recommendation recom={{...recom, handle:handleChange}}></Recommendation>
            {!recom.isEdit && <button onClick={handleEdit}>editar card recomendacion</button>}
            <button onClick={cod200}>cod 200</button>
            <button onClick={cod400}>cod 400</button>
        </>
        
    )
}