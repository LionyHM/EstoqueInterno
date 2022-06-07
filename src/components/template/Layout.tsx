import React from "react";
import useAppData from "../../data/hook/useAppData";
import forcarAutenticacao from "../../functions/forcarAutenticacao";
import Config from "../config/Config";
import ConsultSector from "../consults/ConsultSector";
import MvtoLasts from "../home/MvtoLasts";
import MvtoPending from "../home/MvtoPending";
import Devolution from "../movimentacao/Devolution";
import Down from "../movimentacao/Down";
import InOrOut from "../movimentacao/InOrOut";
import Cabecalho from "./Cabecalho";
import Conteudo from "./Conteudo";
import MenuLateral from "./MenuLateral";

interface LayoutProps{
    titulo: string
    subtitulo: string
    children?: any
    batch?: object
    productIn?: object
    productOut?: object
    unidades?: object
    itUnidades?: object
    sectors?: object
    qntEstoque?: object
    productsOutsQntd?: object
    productsSectors?: object
    productsDevolution?: any
    productsMV?: any
    productsBaixas?: any
    perfil?: any
    productsSectorsEstoque?: any
}

export default function Layout(props: LayoutProps){
    const ctx = useAppData()   
    

    forcarAutenticacao
    return forcarAutenticacao(
        <div className={`${ctx.tema}
            flex h-screen w-6/7 max:w-6/7
        `}>
            <MenuLateral />
            <div className={`
                flex flex-col w-full p-7
                 bg-gray-300 dark:bg-gray-800
                 layout_background
                 
            `}>
                <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo}/>
                <Conteudo>
                    {
                        props.titulo === "Página Inicial" ?
                        (
                            <>
                            <MvtoPending props={props.batch}
                            perfil={props.perfil}>
                            </MvtoPending>
                            <MvtoLasts productIn={props.productIn} productOut={props.productOut}></MvtoLasts>
                            </>
                            
                        )
                        :
                        props.titulo === "Entrada e Saida" ?
                        (
                            <InOrOut productsMV={props.batch} unidades={props.unidades}
                            itUnidades={props.itUnidades} sectors={props.sectors}
                           productsOutsQntd={props.productsOutsQntd} />
                        )
                        :
                        props.titulo === "Devoluções" ?
                        (
                            <Devolution productsSectors={props.productsSectors} productsDevolution={props.productsDevolution} />
                        )
                        :
                        props.titulo === "Baixas" ?
                        (
                            <Down productsMV={props.batch} unidades={props.unidades}
                            itUnidades={props.itUnidades} sectors={props.sectors}
                            qntEstoque={props.qntEstoque} productsOutsQntd={props.productsOutsQntd} 
                            />
                        )
                        :
                        props.titulo === "Consulta por Setor" ?
                        (
                           <ConsultSector sectors={props.sectors}
                           productsBaixas={props.productsBaixas}
                           productsSectorsEstoque={props.productsSectorsEstoque} />
                        )
                        :
                        props.titulo === "Configurações" ?
                        (
                           <Config></Config>
                        )
                        :
                        props.titulo === "Sem Acesso" ?
                        (
                           <span className="border-2 border-black bg-red-600 flex justify-center text-white font-bold">Seu perfil não está configurado para ter acesso á tela</span>
                        )
                        :
                        null
                    }
                    
                </Conteudo>
            </div>
        </div>
    )
}