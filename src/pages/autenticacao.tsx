import { useState, useEffect } from "react";
import AuthInput from "../components/auth/AuthInput";
import { IconeAlerta } from "../components/icons";
import useAuth from "../data/hook/useAuth";


export default function Autenticacao(){

    const {cadastrar, login, loginGoogle} = useAuth()

    const [modo, setModo] = useState<"login" | "cadastro">('login')
    const [erro, setErro] = useState(null)
    const [success, setSuccess] = useState(null)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    useEffect(() => {        
        if(window.location.search == "?alter"){
            exibirSuccess("Sua senha foi alterada com sucesso!")
        }
    },[modo])

    function exibirErro(msg, tempoEmSegundos = 5){
        setErro(msg)
        setTimeout(()=>{setErro(null)}, tempoEmSegundos * 1000)
    }

    function exibirSuccess(msg, tempoEmSegundos = 5){
        setSuccess(msg)
        setTimeout(()=>{setSuccess(null)}, tempoEmSegundos * 1000)
    }

    function selectDatabase(e){
        console.log(e)
        console.log(process.env.DATABASEMYSQL)
        process.env.DATABASEMYSQL = `36`
        console.log(process.env.DATABASEMYSQL)
    }

    async function submeter() {        
   
        try{
            if(modo === 'login'){   
                await login(email, senha, 36)
            }else{
                await cadastrar(email, senha, undefined,undefined)
            }
        }catch(e){
            exibirErro("Usuário, senha ou setor incorreto")
        }
    }

    return (
        <div>
            <span style={{"filter": "drop-shadow(10px 10px 25px black", "letterSpacing": "-2px", "fontFamily": "fantasy"}} className="text-white rounded-lg flex justify-center transform translate-y-14 text-6xl">Sistema de Estoque Hospitalar</span>
            <div className={`flex mt-8 items-center justify-center`}>
                <div className={`m-16 hidden lg:flex lg:w-1/3 p-10`}>
                    <img className="rounded-xl" src="images/home.png" />
                </div>
                <div className={`m-10 ml-0 lg:w-1/3`}>
                    <h1 className={`text-3xl font-bold mb-5`}>
                        {modo === 'login' ? 'Login' : 'Cadastre-se na Plataforma'}
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
                    ) : success ?
                        (
                            <div className={`
                                flex items-center
                                bg-green-400 text-white py-3 px-5 my-2
                                border border-green-700
                                `}>
                                {IconeAlerta()}
                                <span className={`ml-3`}>{success}</span>
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
                    <select onChange={(e) => selectDatabase(e.target.value)} className="mt-4 bg-gray-200 font-bold p-2 rounded setor">
                        <option value="36">CME</option>
                        <option value="36">HIGIENE E LIMPEZA</option>
                    </select>

                    <button onClick={submeter} className={`
                        w-full bg-indigo-500 hover:bg-indigo-400 text-white 
                        rounded-lg px-4 py-3 mt-6
                    `}>
                        {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                    </button>

                    {modo === 'login' ? (
                        <p className={`mt-8`}>
                            <a onClick={()=> setModo("cadastro")} className={`
                                text-blue-500 hover:text-blue-700 font-semibold
                                cursor-pointer
                            `}></a>
                        </p> 
                    ) : (
                        <p className={`mt-8`}>
                            Já faz parte da nossa comunidade?
                            <a onClick={()=> setModo("login")} className={`
                                text-blue-500 hover:text-blue-700 font-semibold
                                cursor-pointer
                            `}> Entre com a suas Credenciais</a>
                        </p>
                    )} 
                </div>        
            </div>
            <p className="text-center">Copyright © <span id="ano">2022</span> Tecnologia HEJSN.</p>
        </div>
    )
}