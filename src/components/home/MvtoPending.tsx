import { useEffect, useState } from "react"
import Modal from "../uteis/Modal"
import Cookies from "js-cookie"

export default function MvtoPending(props){
    const [mvto, setMvto] = useState(0)

    
    
    function getPendingBatch(){
        let arr:any = []

        props.props.map(batch => {
            
            arr.push(
                <li 
                key={batch.CD_MVTO_ESTOQUE}
                className="mvto_total cursor-pointer mr-8">
                     <Modal codeBatch={batch.CD_MVTO_ESTOQUE}></Modal>
                </li>
            )            
        })
       
        if(props.props.length === 0){
            arr.push(
                <li 
                key={1}
                className="cursor-pointer">
                     Não há nenhuma movimentação pendente.
                </li>
            )            
        }
        useEffect(()=>{
            setMvto(arr.length)
        }, [])

        return arr
    }

    let user = props.perfil.find(perfil => perfil.DS_NOME == Cookies.get("usuario"))
    return(
       user != undefined ?
    (
     user.CD_PERFIL > 1 ?
        <div className={`
            flex justify-center content-center
        `}>
            <div className={`
               h-full 
               m-10
            `} style={{width: '40rem'}}>
                <span className={`text-center`}>
                    <h2 className="text-2xl lg:text-2xl">Movimentações Pendentes: {mvto}</h2>
                </span>
                <ul className="flex w-56 lg:w-full overflow-auto font-bold text-xl mt-6">
                    {getPendingBatch()}
                </ul>
            </div>
        </div>
        : null
    ) : null
    )
}