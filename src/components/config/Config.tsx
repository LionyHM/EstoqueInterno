import useAuth from "../../data/hook/useAuth";


export default function Config(){
    const {cadastrar, usuarioLogado} = useAuth()

    function renderNavConf(){
        let arrNavConf:any = []

        arrNavConf.push(
            <ul  key={Math.random()} className="flex border-b">
                <li className="-mb-px mr-1">
                    <p onClick={(e)=> renderFormUser(e.target)} className="form_user bg-white cursor-pointer inline-block border-l border-t border-r py-2 px-4 text-black-500 rounded-t hover:text-gray-600 font-semibold">Cadastro de Usuário</p>
                </li>
                <li className="mr-1">
                    <p onClick={(e)=> renderFormUser(e.target)} className="form_conf bg-white cursor-pointer inline-block border-l border-t border-r py-2 px-4 text-black-500 rounded-t hover:text-gray-600 font-semibold">Configuração de Produtos</p>
                </li>
            </ul>
        )

        return arrNavConf
    }

    function renderUser(){
        let arrUser:any = []

        arrUser.push(
            <div key={Math.random()} className="hidden form_conf_user w-full max-w-xs">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Usuário
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                    </div>
                    <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Senha
                    </label>
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********"/>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_password">
                        Confirmar Senha
                    </label>
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirm_password" type="password" placeholder="********"/>
                    <p className="text-red-500 text-xs italic">Repita a senha.</p>
                    </div>
                    <div className=" px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="perfil">
                            Perfil
                        </label>
                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="perfil">
                                <option value="0">Consulta</option>
                                <option value="1">Importador</option>
                                <option value="2">Admin</option>
                                <option value="3">Super Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex mt-5 items-center justify-between">
                    <button onClick={()=> cadastrar(document.querySelector("#username").getAttribute("value"), document.querySelector("#password").getAttribute("value"), document.querySelector("#perfil").getAttribute("value"),"POST")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" type="button">
                        Cadastrar
                    </button>
                    <button onClick={()=>cadastrar(document.querySelector("#username").getAttribute("value"), document.querySelector("#password").getAttribute("value"), document.querySelector("#perfil").getAttribute("value"),"PUT")} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Redefinir</button>
                    </div>
                </div>

            </div>
        )

        return arrUser
    }

    async function renderFormUser(e){
        /* e.classList.remove("hidden") */

        if(e.textContent == "Cadastro de Usuário"){
            document.querySelector(".form_conf_user").classList.remove("hidden")
            document.querySelector(".form_conf_prod").classList.add("hidden")
            document.querySelector(".form_conf").classList.remove("border-black")
            document.querySelector(".form_user").classList.add("border-black")
        }else if(e.textContent == "Configuração de Produtos"){
            document.querySelector(".form_conf_prod").classList.remove("hidden")
            document.querySelector(".form_conf_user").classList.add("hidden")
            document.querySelector(".form_user").classList.remove("border-black")
            document.querySelector(".form_conf").classList.add("border-black")
  
     
            renderConfigData()
        }
    }
    function addEspecClass(){
        document.querySelector(".config_espec_class").innerHTML += `
                <tr class="p-1 new_add" key="${Math.random()}">
                    <td class="espec bg-green-200 p-1">${document.querySelector("#grid-first-especie").getAttribute("value")}</td>
                    <td class="classe bg-green-200">${document.querySelector("#grid-last-classe").getAttribute("value")}</td>
                    <td class="bg-green-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="cursor-pointer text-red-600 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </td>
                </tr>
            `
    }

    function renderConfig(){
        let arrConf:any = []

        arrConf.push(
            <div key={Math.random()}>
                <div className="hidden form_conf_prod w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-especie">
                                Especie
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-especie" type="number" placeholder="0" />
                            <p className="text-red-500 text-xs italic">Digite a espécie e classe para filtrar na importação.</p>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-classe">
                                Classe
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-classe" type="number" placeholder="0" />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={()=> addEspecClass()} className="add_espc_classe dark:bg-white dark:hover:bg-gray-400 dark:text-black bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Adicionar</button>
                    </div>

                    <div className="flex justify-center">
                         <div className='overflow-x-auto h-64 w-full mt-20'>
                            <h2 className="text-center font-bold">Especie e Estoque que serão ignorados</h2>
                            <table className='mx-auto w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
                                <thead className="bg-gray-900">
                                    <tr className="text-white text-center">
                                        <th className="font-semibold text-sm uppercase px-2 py-2"> Espécie </th>
                                        <th className="font-semibold text-sm uppercase px-2 py-2 text-center"> Classe </th>
                                        <th className="font-semibold text-sm uppercase px-2 py-2 text-center"></th>
                                    </tr>
                                </thead>
                                    <tbody className="config_espec_class h-10 divide-y divide-gray-200 text-center">
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="text-center">
                        <button onClick={()=> endConfig()} className="end_espc_classe dark:bg-white dark:hover:bg-red-400 dark:text-black bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Salvar</button>
                    </div>
                </div>
             </div>

        )
            return arrConf
    }

    async function renderConfigDatabase(){
        const response = await fetch(process.env.URL + "consults/getConfig")
        const res = await response.json()
        return await res
    }


    async function renderConfigData(){
        document.querySelector(".config_espec_class").innerHTML = ''
        let dados = await renderConfigDatabase()
        dados.forEach((dado,i) => {
            document.querySelector(".config_espec_class").innerHTML += `
                <tr class="p-1" key="${i * Math.random()}">
                    <td class="p-1 espec">${dado.CD_ESPECIE}</td>
                    <td class="classe">${dado.CD_CLASSE}</td>
                    <td>
                        <svg xmlns="http://www.w3.org/2000/svg" class="delConfig cursor-pointer text-red-600 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </td>
                </tr>
            `
        })

        for(let x = 0; x < document.querySelectorAll(".delConfig").length; x++){
            document.querySelectorAll(".delConfig")[x].addEventListener("click", ()=>{
                let delConfig:any = document.querySelectorAll(".delConfig")[x].parentNode.parentNode
                delConfig.classList.add("bg-red-300")
                delConfig.classList.add("delSelectConf")
            })
    
        }
    }

    async function endConfig(){
        let valEsp = await document.querySelectorAll(".new_add .espec")
        let valClass = await document.querySelectorAll(".new_add .classe")

        setTimeout(()=>{
            window.location.reload()
        },800)
        if(document.querySelectorAll(".delSelectConf .espec")?.length > 0){
            for(let i = 0; i < document.querySelectorAll(".delSelectConf")?.length; i++){
                
                await fetch(process.env.URL + "set/setConfig",{
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({    
                    especie: document.querySelectorAll(".delSelectConf .espec")[i]?.textContent,
                    classe: document.querySelectorAll(".delSelectConf .classe")[i]?.textContent,
                    methodConfig: "DELETE"
                })
            
            })

        }
        }else{
            for(let i = 0; i < valEsp.length; i++){
    
                    await fetch(process.env.URL + "set/setConfig",{
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({    
                        especie: valEsp[i].textContent,
                        classe: valClass[i].textContent,
                        methodConfig: "POST"
                    })
                
                })
    
            }
        }

    }
    

    return (
        <div>
            <div className={`flex`}>
                {renderNavConf()}            
            </div>
            <div className="flex justify-center mt-36">
                {renderUser()}
                {renderConfig()}
            </div>
        </div>
    )
}