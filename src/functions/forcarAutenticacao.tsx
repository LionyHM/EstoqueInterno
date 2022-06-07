import Head from 'next/head'
import Image from 'next/image'
import router from 'next/router'
import { useEffect } from 'react'
import loading from '../../public/images/loading.svg'
import UseAuth from '../data/hook/useAuth'
import Cookies from 'js-cookie'

export default function forcarAutenticacao(jsx){
    const { usuario, carregando } = UseAuth()

    function renderizarConteudo(){
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html:`
                                if(!document.cookie?.includes("admin-template-auth")){
                                    window.location.href = "/autenticacao"
                                }
                            `
                        }}
                        />
                </Head>
                {jsx}
            </>
        )
    }

    function RenderizarCarregando() {
        useEffect(() => {
       
            setTimeout(()=>{
                router.push('/autenticacao')
            },600)
           
        }, []);
        return(
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={loading} />
            </div>
        )
    }

    if(!carregando && usuario?.email){
        return renderizarConteudo()
    }else if(carregando){
        let user = Cookies.get("usuario")
        
        return renderizarConteudo()
    } else {
        console.log("Entrou no else")
        router.push('/autenticacao')
        return null
    }
}