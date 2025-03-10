import { useContext } from "react"
import { msjContext } from "../components/viewLayout/viewLayout"
import axios, { AxiosError } from "axios"
import { Recommendation, recommProps } from "../components/recommendation/recommendation"

export const Home = () => {
    const {showToast} = useContext(msjContext)

    const ejemploRecom : recommProps = {name:'Matias', date:'1/1/2025', rating:5 , comment:"comentario", avatarUrl:'avatar.jpeg', isEdit:true}

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
    return(
        <>
            <p>Home de Usuario</p>
            <Recommendation recom={ejemploRecom}></Recommendation>
            <button onClick={cod200}>cod 200</button>
            <button onClick={cod400}>cod 400</button>
        </>
        
    )
}