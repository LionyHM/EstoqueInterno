import Link from 'next/link'
import useAuth from '../../data/hook/useAuth'
import Cookies from "js-cookie"

interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps){
    const {usuario} = useAuth()

    return (
        <div  className="flex justify-center">
            <p className="userName mt-2">{Cookies.get("usuario")}</p>
            <div>
            <Link href="/perfil">
                <img 
                    src={usuario?.imagemUrl ?? "/images/avatar.svg"} 
                    alt="Avatar do Usuário" 
                    className={`
                        h-10 w-10 rounded-full cursor-pointer
                        ${props.className}
                    `}
                />            
            </Link>
            </div>
        </div>
    )
}