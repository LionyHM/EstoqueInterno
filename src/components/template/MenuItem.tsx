import Link from "next/link"
interface MenuItemProps{
    url?: string
    texto: string
    icone: any
    className?: string
    onClick?: (evento: any) => void
}

export default function MenuItem(props: MenuItemProps){
    function redenrizarLink(){
        return(
            <a className={`
                        flex flex-col justify-center items-center
                        h-20 w-24
                        dark:text-gray-200                                             
                        ${props.className}
                    `}>
                        {props.icone}
                        <span className={`
                            text-xs font-bold
                        `}>
                            {props.texto}
                        </span>
                    </a>
        )
    }
    return(
        <li onClick={props.onClick} className={`
            hover:bg-gray-100 dark:hover:bg-gray-800
            cursor-poiter
            
        `}>
            {props.url ? (
                <Link href={props.url}>
                    {redenrizarLink()}
                </Link>
            ) : (
                    redenrizarLink()
                )
            }
        </li>
    )
}