import route from 'next/router'
import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
/* import firebase from "../../firebase/config"; */
import Usuario from "../../model/Usuarios";
import router from 'next/router';

interface AuthContextProps{
    usuario?: Usuario
    carregando?: boolean
    loginGoogle?: () => Promise<void>
    cadastrar?: (email,senha,perfil,tipo) => Promise<void>
    login?: (email,senha,setor) => Promise<void>
    logout?: () => Promise<void>
    resetar?: (email,senha) => Promise<void>
    usuarioLogado?: () => any
}

async function usuarioNormalizado(usuario): Promise<Usuario>{
    

    return {
        uid: usuario.uid,
        nome: usuario.displayName,
        email: usuario.email,
        setor: usuario.setor,
        token: usuario.token,
        provedor: usuario.provedor,
        imagemUrl: usuario.photoURL
    }
}

function gerenciarCookie(logado: boolean, usuario, setor) {    
        if(logado){
            Cookies.set('admin-template-auth', logado, {
                expires: 7
            })
            Cookies.set("usuario", usuario, {
                expires: 7
            })
            Cookies.set("setor", setor, {
                expires: 7
            })
        }else {
            Cookies.remove('admin-template-auth')
            Cookies.remove('usuario')
            Cookies.remove('setor')
        }
}

const AuthContext = createContext<AuthContextProps>({})

export function AuthProvider(props) {
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario>(null)

    async function configurarSessao(usuarioFirebase){
        if(usuarioFirebase?.DS_NOME){
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true,usuario.email, usuario.setor)
            setCarregando(false)
            return usuario.email
        }else{
            setUsuario(null)
            gerenciarCookie(false, Cookies.get("usuario"),Cookies.get("setor"))
            setCarregando(false)
            return false
        }
    }

    async function login(email, senha, setor) {        
        try{
            let resp = await fetch(process.env.URL + "consults/getUser",{
                method: "POST",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({    
                              email: email,
                              senha: senha,
                              setor: setor

            })
        })

            let respUser = await resp.json()

            if(respUser[0].P_LOGIN == 0){
                route.push('/senha')  
                return
            }


            respUser[0].token = await "afweqGWEJKgojcvsvavrgijra"
            respUser[0].uid = await "ewgv4g365447" 
            respUser[0].email = await respUser[0].DS_NOME
            respUser[0].setor = await setor
            respUser[0].nome = await "teste"
            respUser[0].provedor = await "fvgwegvaber"
            respUser[0].imagemUrl = await "/images/avatar.svg"
            setCarregando(true)
            if(respUser.length > 0){
                
                await configurarSessao(respUser[0])        
               route.push('/')    
            }else{
                alert("Usuário, senha ou setor de login incorreto")
                route.push('/autenticacao') 
            }
             
        } finally{
            setCarregando(false)
        }
    }

    async function cadastrar(email, senha, perfil, tipo) {
        
            /* setTimeout(()=>{
                router.push("/")
            },600) */

            await fetch(process.env.URL + "set/setUser",{
                method: tipo,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({    
                usuario: email,
                senha,
                perfil

                })
            })          
    }



    async function logout() {
        try {
 /*            await firebase.auth().signOut() */
            await configurarSessao(null)
        } finally {
            setCarregando(false)
        }
    }

    return (
        <AuthContext.Provider value={{
            usuario,
            carregando,
            login,
            logout,
             cadastrar,
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext