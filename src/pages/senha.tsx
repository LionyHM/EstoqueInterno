import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { IconeAlerta } from "../components/icons";
import useAuth from "../data/hook/useAuth";


export default function Autenticacao(){

    const {cadastrar, login, loginGoogle} = useAuth()

    const [modo, setModo] = useState<"login" | "cadastro">('login')
    const [erro, setErro] = useState(null)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmSenha, setconfirmSenha] = useState('')

    function exibirErro(msg, tempoEmSegundos = 5){
        setErro(msg)
        setTimeout(()=>{setErro(null)}, tempoEmSegundos * 1000)
    }

    async function submeter() {
        try{
            if(modo == 'login'){
                if(confirmSenha == senha){
                    await cadastrar(email, senha, 9, "PUT")
                }else{
                    exibirErro("As senhas digitadas não coincidem")
                }
                window.location.href = "http://10.0.209.106:8080/autenticacao?alter"
            }
        }catch(e){
            exibirErro("Usuário ou senha incorreto:")
        }
    }

    return (
        <div className={`flex h-screen items-center justify-center`}>
            
            <div className={`m-10 w-full lg:w-1/3`}>
                <h1 className={`text-3xl font-bold mb-5`}>
                    {modo === 'login' ? 'Redefina à Senha' : 'Cadastre-se na Plataforma'}
                </h1>

                {erro ? (
                    <div className={`
                    flex items-center
                    bg-red-400 text-white py-3 px-5 my-2
                    border border-red-700
                `}>
                    {IconeAlerta()}
                    <span className={`ml-3`}>{erro}</span>

                </div>
                ) : false}
            
                <AuthInput
                    label="Usuário"
                    tipo="email"
                    valor={email}
                    valorMudou={setEmail}
                    obrigatorio
                />
                <AuthInput
                    label="Senha"
                    tipo="password"
                    valor={senha}
                    valorMudou={setSenha}
                    obrigatorio
                />
                <AuthInput
                    label="Confirmação de Senha"
                    tipo="password"
                    valor={confirmSenha}
                    valorMudou={setconfirmSenha}
                    obrigatorio
                />                
                <button onClick={submeter} className={`
                    w-full bg-indigo-500 hover:bg-indigo-400 text-white 
                    rounded-lg px-4 py-3 mt-6
                `}>
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                {/* <hr className="my-6 border-gray-300 w-full"/>

                <button onClick={loginGoogle} className={`flex justify-center
                    w-full bg-red-500 hover:bg-red-400 text-white 
                    rounded-lg px-4 py-3 mt-6
                `}>
                <span className={`bg-white rounded-full w-6 mr-2`}><img src="logo_google.svg" /></span>Entrar com Google
                </button>    */}

                {modo === 'login' ? (
                    <p className={`mt-8 text-black font-bold`}>
                        Crie uma nova senha
                        <a onClick={()=> setModo("login")} className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}></a>
                    </p>
                ) : 
                    null
                } 
            </div>        
        </div>
    )
}