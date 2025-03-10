import {  useEffect, useState } from "react";
import { CardRecom } from "./card-recom";
import { CardRecomEdit } from "./card-recom-edit";

export interface recommProps {
    name: string
    date: string
    rating: number
    comment: string
    avatarUrl: string
    isEdit: boolean
    handle: () => void
}

export interface recommPropsEdit {
    name: string
    date: string
    rating: number
    comment: string
    avatarUrl: string
    isEdit: boolean
    handle: () => void
    handleCloseEdit: () => void
}

export const Recommendation = ({recom} : {recom:recommProps}) => {

    console.log('dentro de recomendacion valor del isEdit => ', recom.isEdit)

    //const [edit, setEdit] = useState(recom.isEdit)

    useEffect(() => {
        console.log("Nuevo estado de recom dentro de la recom", recom);
        //console.log("Nuevo estado de edit dentro de la recom", edit);
        //setEdit(recom.isEdit)
    }, [recom]); 

    const handleCloseEdit = () => {
        recom.isEdit = false
        recom.handle()
        console.log('recom en cancelara ', recom)
    }

    const handle = () => {
        recom.handle()
    }

    return (
            <>
                {recom.isEdit ? <CardRecomEdit recom={{...recom, handleCloseEdit, handle}}/> : <CardRecom recom={recom}/> }
            </>
    )
}