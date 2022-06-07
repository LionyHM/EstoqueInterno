import MenuItem from "./MenuItem"
import Logo from "./Logo"
import { IconeAjustes, IconeCasa, IconeNotificacoes, IconeSair, IconeIn, IconeLupa, IconeTrash, IconeEngre } from "../icons"
import useAuth from "../../data/hook/useAuth"

export default function MenuLateral(){
    

    const { logout } = useAuth()


    return(
        <aside className={`
            flex-col
            bg-gray-200 text-gray-700
            dark:bg-gray-900   
            hidden sm:flex 
            menu_lateral
                 
        `}>
            <div className={`                
                flex flex-col justify-center
                bg-gradient-to-r from-indigo-100 to-purple-800
                h-24 w-24
            `}>
                <Logo/>
            </div>
            <ul className={`flex-grow`}>
                <MenuItem url="/" texto="Início" icone={IconeCasa} />
                <MenuItem url="/movimentacoes" texto="Movimentações" icone={IconeIn} />
                <MenuItem url="/devolucao" texto="Devoluções" icone={IconeNotificacoes} />
                <MenuItem url="/consulta" texto="Consulta" icone={IconeLupa} />
                <MenuItem url="/baixa" texto="Baixa" icone={IconeTrash} />
                <MenuItem url="/configuracao" texto="Configurações" icone={IconeEngre} />
            </ul>
            <ul className={``}>
                <MenuItem onClick={logout}
                className={`
                    text-red-600 dark:text-red-400
                    hover:bg-red-400 hover:text-white dark:hover:text-white
                `}
                texto="Sair" icone={IconeSair} />
            </ul>            
        </aside>
    )
}