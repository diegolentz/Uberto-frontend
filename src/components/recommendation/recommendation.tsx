import { CardRecom } from "./card-recom";
import { CardRecomEdit } from "./card-recom-edit";

export interface recommProps {
    name: string
    date: string
    rating: number
    comment: string
    avatarUrl: string
    isEdit: boolean
  }

export const Recommendation = ({recom} : {recom:recommProps}) => {

    const card = () =>{
        recom.isEdit = false
        return(
            <>
                <CardRecom recom={recom}/>
            </>
        )
    }

    const cardEdit = () => {
        recom.isEdit = true
        return(
            <>
                <CardRecomEdit recom={recom}/>
            </>
        )
    }

    return (
            <>
                {recom.isEdit ? <CardRecomEdit recom={recom}/> : <CardRecom recom={recom}/> }
            </>
    )
}