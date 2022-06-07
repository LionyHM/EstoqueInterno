import useAppData from "../../data/hook/useAppData";
import AvatarUsuario from "./AvatarUsuario";
import BotaoAlternarTema from "./BotaoAlternarTema";
import Titulo from "./Titulo";

interface CabecalhoProps{
    titulo: string
    subtitulo: string
}

export default function Cabecalho(props: CabecalhoProps){
    const {tema, alternarTema} = useAppData()
    return (
        <div className={`flex`}>
            <div className={`sm:hidden h-full w-0 bg-gray-700 absolute left-24 top-0`} onClick={()=> document.querySelector("aside").classList.toggle("hidden")}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </div>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo}/>
            <div className={`
                flex flex-grow justify-end items-center
            `}>
               {/*  <BotaoAlternarTema tema={tema} alternatTema={alternarTema} class="hidden"></BotaoAlternarTema> */}
                <AvatarUsuario className="ml-3" />
            </div>
        </div>
    )
}