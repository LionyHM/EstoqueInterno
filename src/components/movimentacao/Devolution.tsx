import Cookies from "js-cookie"
import {useRouter} from "next/router"

export default function Devolution(props){
    let router = useRouter()

    function renderFormDevolution(){
        let arrFormDevolution:any = []

        arrFormDevolution.push(
            <div className="inline-block relative w-84">
                <select onChange={(e)=> getSector(e.target.value)} className="tableItens block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option>---</option>
                    {renderSectorsList()}
                </select>
                
                <div className='tableItens overflow-x-auto h-64 w-full mt-20'>
                    <h2 className="text-center font-bold">Produtos no Estoque do Setor</h2>
                    <table className='mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
                        <thead className="bg-gray-900">
                            <tr className="text-white text-center">
                                <th className="font-semibold text-sm uppercase px-4 py-2"> Código do Produto </th>
                                <th className="font-semibold text-sm uppercase px-4 py-2 hidden"> CD Estoque </th>
                                <th className="font-semibold text-sm uppercase px-4 py-2"> Lote </th>
                                <th className="font-semibold text-sm uppercase px-4 py-2"> Nome do Produto </th>
                                <th className="font-semibold text-sm uppercase px-4 py-2"> Unidade </th>
                                <th className="font-semibold text-sm uppercase px-4 py-2 text-center"> Quantidade </th>
                                <th className="font-semibold text-sm uppercase px-4 py-2 text-center"> Origem </th>
                                <th className="font-semibold text-sm uppercase px-4 py-2 text-center"> Recebido 
                                <img title="Dar baixa em tudo como consumível"
                                    onClick={()=> baixaAll()}
                                 className="h-5 w-5 ml-5 img_just cursor-pointer text-red-800" src="./images/atencao.png" />
                                </th>
                                <th className="font-semibold text-sm uppercase px-4 py-2"> Opções </th>
                                <th className="font-semibold text-sm uppercase px-4 py-2"></th>
                            </tr>
                        </thead>
                            <tbody className="add_item_list h-20 divide-y divide-gray-200 text-center">
                        </tbody>
                    </table>
                </div>
                <div className="hidden form_just relative bg-white shadow-md border border-red-400 rounded px-8 pt-6 pb-8 mb-4">
                    <div className="font-bold absolute right-0 top-0 text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="closeJust h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <br></br>
                    <p style={{display: "inline"}}>Código: <strong className="justCod">Codigo</strong></p>
                    <p style={{display: "inline"}}> - </p>
                    <p style={{display: "inline"}}>Produto: <strong className="justProduto">Produto</strong></p>
                    <p style={{display: "inline"}}> - </p>
                    <p style={{display: "inline"}}>Lote: <strong className="loteJust">Lote</strong></p>
                    <p style={{display: "inline"}}> - </p>
                    <p style={{display: "inline"}}>Setor: <strong className="justSetor">Setor</strong></p>
                    <p style={{display: "inline"}}> - </p>
                    <p style={{display: "inline"}}>Unidade: <strong className="justUnidade">Quantidade</strong></p>
                    <p style={{display: "inline"}}>Quantidade: <strong className="justQntd">Quantidade</strong></p>
                    <p style={{display: "none"}}>: <strong className="justCod">Cod.</strong></p>
                    <p style={{display: "none"}}>: <strong className="justCdSetor">Cod.</strong></p>
                    <div className="mb-4 mt-6">
                        <label className="block text-red-700 text-md font-bold mb-2" htmlFor="justif">
                            Justificativa
                        </label>
                        <p className="p-4 italic">Caso o item seja de consumo do setor e não é devolvido para o estoque, favor selecionar a opção "Itens consumíveis"</p>
                        <select onClick={(e)=>{
                        let value:any = e.target
                         value.value == "consumivel" 
                         ?
                         document.querySelector("#justif").classList.add("hidden")
                         :
                         document.querySelector("#justif").classList.remove("hidden")
                        }
                        } className="catJust border-2 border-black rounded-md mb-4">
                            <option value="---">---</option>
                            <option value="quebrado">Quebrado</option>
                            <option value="perdido">Perdido</option>
                            <option value="inutilizavel">Inutilizável</option>
                            <option value="consumivel">Itens consumíveis</option>
                            <option value="outro">Outro</option>
                        </select>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="justif" type="text" placeholder="Insira aqui a ocorrência com o item informado" />
                    </div>
                    <div className="flex justify-center">
                    <button onClick={()=> endJust()} className="endDJust dark:bg-white dark:hover:bg-gray-400 dark:text-black bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Salvar</button>
                </div>
                </div>
                <hr/>
                <div className="flex justify-center flex-wrap mt-2 div_loading">

                 </div>
                <div className='overflow-x-auto h-64 w-full mt-10'>
                <h2 className="text-center font-bold">Produtos a Serem Devolvidos</h2>
                    <table className='mx-auto w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
                        <thead className="bg-gray-900">
                            <tr className="text-white text-center">
                                <th className="font-semibold text-sm uppercase px-4 py-2"> Código do Produto </th>
                                <th className="font-semibold text-sm uppercase px-4 py-2 hidden"> CD Estoque </th>
                                <th className="font-semibold text-sm uppercase px-4 py-2"> Lote </th>
                                <th className="font-semibold text-sm uppercase px-4 py-2"> Nome do Produto </th>
                                <th className="font-semibold text-sm uppercase px-4 py-2 text-center"> Quantidade </th>
                                <th className="font-semibold text-sm uppercase px-4 py-2 text-center"> Origem </th>
                                <th className="font-semibold text-sm uppercase px-4 py-2 text-center"></th>
                            </tr>
                        </thead>
                            <tbody className="final_list h-20 divide-y divide-gray-200 text-center">
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center btn_finalizar mt-3">
                    <button onClick={()=> endDevolution()} className="hidden endDevolution dark:bg-white dark:hover:bg-gray-400 dark:text-black bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Finalizar</button>
                </div>
            </div>
        )        

        return arrFormDevolution
    }

    async function baixaAll(){
        document.querySelector('.img_just').classList.add("hidden")
        for(let i = 0; i < document.querySelectorAll('.add_item_list tr').length; i++){
            let cdProduto = document.querySelectorAll('.cd_produto')[i].textContent
            let dsSector = document.querySelectorAll('.cd_product')[i].textContent
            let lote = document.querySelectorAll('.lote')[i].textContent
            let mvtoTotal = document.querySelectorAll('.mvtoTotal')[i].textContent
            let cdOrigem = document.querySelectorAll('.cd_origem')[i].textContent
            let cdUnidade = document.querySelectorAll('.cd_unidade')[i].textContent

            await fetch(process.env.URL + "set/setJust",{
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({    
                    produto: dsSector,
                    setor: cdOrigem,
                    lote,
                    produtoQntd: mvtoTotal,
                    cateJust: 'consumivel',
                    just: '',
                    codJust: cdProduto,
                    justCdSetor: cdOrigem,
                    unidade: cdUnidade,
                    usuario: Cookies.get("usuario"),
                    setorEstoque: Cookies.get("setor"),
    
                })
            })
        }
        
        setTimeout(() => {
            window.location.reload()
        }, 3000);
    }

    function getSector(e){
        document.querySelector(".add_item_list").innerHTML = ''
            if(e != "---"){
                let sectorProduct: boolean
             
                props.productsDevolution.forEach(product =>{
                    if(product.DATA_DEVOLUCAO == null){
                        sectorProduct = product.SETOR.indexOf(e) > -1 && product.SETOR == e    
                        sectorProduct ? 
                        document.querySelector(".add_item_list").innerHTML += `
                            <tr value="${product.DS_PRODUTO}" class="h-6 item_unid">                                
                                <td class="cd_produto">${product.CD_PRODUTO}</td>
                                <td class="cd_estoque hidden">${product.CD_ESTOQUE}</td>
                                <td class="lote text-left pr-3">${product.LOTE}</td>
                                <td class="">
                                    <div class="">                            
                                        <div>
                                        <p setor="${product.DS_PRODUTO}" saida="${product.CD_SAIDA}" codigo="${product.CD_PRODUTO}" class="cd_product">${product.DS_PRODUTO}</p>
                                        </div>
                                        </div>
                                </td>
                                <td value=${product.UNIDADE} class="cd_unidade">${product.UNIDADE}</td>
                                <td class=" "> <span class="mvtoTotal text-white text-md w-1/3 pb-1 pt-1 bg-blue-900 font-semibold px-2 rounded-full mvto-${product.CD_ESTOQUE}">${ document.querySelectorAll(".qntdAdd")[0] == undefined || document.querySelector(`.qntd_${product.CD_SETOR}_${product.CD_PRODUTO}`) == undefined ? product.QUANTIDADE : product.QUANTIDADE -  parseInt(document.querySelector(`.qntd_${product.CD_SETOR}_${product.CD_PRODUTO}`).textContent)}</span> </td>
                                <td value=${product.SETOR} class="cd_origem">${product.SETOR}</td>
                                <td value=${product.CD_SETOR} sector='${product.CD_SETOR}' class="receiveDevolution cursor-pointer text-center text-black font-bold "> 
                                    <input type="number" class="qntd_devolution bg-gray-200 w-20 text-center rounded " min="0" max=${product.QUANTIDADE}></input>
                                    </td>
                                <td class="flex mt-2 justify-center">
                                    <img value="${product.CD_SAIDA}" class="h-5 w-5 addDevolution cursor-pointe text-green-600" src="./images/plus.png" />
                                    <img class="h-5 w-5 ml-2 just_button cursor-pointer text-red-800" src="./images/atencao.png" />
                                </td>
                            </tr>
                        `
                        
                         : null 
                        
                    }
                 
            })    
            
            for(let i = 0; i < document.querySelectorAll(".receiveDevolution").length; i++){
                
                
                document.querySelectorAll(".addDevolution")[i]?.addEventListener("click", (e)=>{
                    let cdEstoque = (document.querySelectorAll(".addDevolution")[i]?.parentNode.parentNode.querySelector(".cd_estoque").textContent)
                    let dsProduct = (document.querySelectorAll(".addDevolution")[i]?.parentNode.parentNode.querySelector("td div div p").textContent)
                    let cdProduct = (document.querySelectorAll(".addDevolution")[i]?.parentNode.parentNode.querySelector(".cd_produto").textContent)
                    let lote = (document.querySelectorAll(".addDevolution")[i]?.parentNode.parentNode.querySelector(".lote").textContent)
                    let numberDevolutions:any = (document.querySelectorAll(".addDevolution")[i]?.parentNode.parentNode.querySelector("td .qntd_devolution"))
                    let numberDisp:any = parseInt(document.querySelectorAll(".addDevolution")[i]?.parentNode.parentNode.querySelector(".mvtoTotal").textContent)
                    let dsSector:any = (document.querySelectorAll(".addDevolution")[i]?.parentNode.parentNode.querySelector(".cd_origem").textContent)
                    let cdSector:any = document.querySelectorAll(".addDevolution")[i]?.parentNode.parentNode.querySelector(".receiveDevolution").getAttribute('sector')
                    if(numberDevolutions.value > 0 && numberDevolutions.value <= numberDisp){
                        document.querySelectorAll(".mvtoTotal")[i].textContent = (parseInt(document.querySelectorAll(".addDevolution")[i]?.parentNode.parentNode.querySelector(".mvtoTotal").textContent) - parseInt(numberDevolutions.value)).toString()
                        document.querySelector(".endDevolution").classList.remove("hidden")
                        

                        
                        if(document.querySelectorAll(".car_item").length > 0){
                            let targetValue:any = e.target
                            let estoqueSetor = targetValue.parentNode.parentNode.querySelector(".cd_estoque").textContent
                            
                            for(let o = 0; o < document.querySelectorAll(".car_item").length; o++){
                                 document.querySelectorAll(".car_item")[o].getAttribute("id").indexOf(estoqueSetor) > -1 &&
                                document.querySelectorAll(".car_item")[o].getAttribute("id") == estoqueSetor
                                ?
                                document.querySelectorAll(`.car_item`)[o].querySelector(".qntdAdd").textContent = (parseInt(targetValue.parentNode.parentNode.querySelector(".receiveDevolution .qntd_devolution").value) + parseInt(document.querySelectorAll(".car_item")[o].querySelector(".qntdAdd").textContent)).toString()
                                :
                                null

                                var verif =  document.querySelectorAll(".car_item")[o].getAttribute("id") == estoqueSetor ? true : false
                                if(verif){
                                    return
                                }
                            }

                            

                        }
                        
                        document.querySelector(".final_list").innerHTML += `
                        <tr key="${numberDevolutions.value + dsProduct}" value="${dsProduct}" class="h-6 car_item" id="${cdEstoque}">
                            <td value=${cdProduct} class="cdProduct">${cdProduct}</td>
                            <td value=${lote} class="loteCar">${lote}</td>
                            <td class="">
                                <div class="">                            
                                    <div>
                                        <p setor="${dsProduct}" class="cd_product">${dsProduct}</p>
                                    </div>
                                </div>
                            </td>
                            <td value=${numberDevolutions.value} class="qntdAdd qntd_${cdSector}_${cdProduct}">${numberDevolutions.value}</td>
                            <td value=${dsSector} sector="${cdSector}" class="pr-3 ds_origem">${dsSector}</td>                        
                            <td class="removeDevolution cursor-pointer font-bold text-red-600">
                                Excluir
                            </td>                        
                        </tr>
                        `
                        for(let x = 0; x < document.querySelectorAll(".removeDevolution").length; x++){                            
                            document.querySelectorAll(".removeDevolution")[x]?.addEventListener("click", (e)=>{
                                let targetValue:any = e.target
                                console.log(targetValue)
                            let qntdAddRemove = parseInt(targetValue.parentNode.querySelector(".qntdAdd").textContent)
                            let cdEstoqueRemove = targetValue.parentNode.getAttribute("id")                            

                                replaceQntd(qntdAddRemove, cdEstoqueRemove)
                                targetValue.parentNode.remove()
                                if(document.querySelectorAll(".removeDevolution")?.length == 0){
                                    document.querySelector(".endDevolution").classList.add("hidden")
                                }
                               
                            })
                        }
                    }else if(numberDevolutions.value == 0){
                        alert("Produto está zerado para devolução")
                    }else{
                        alert("O número de devoluções informado é menor do que a quantidade de itens no estoque do setor de origem")
                    }
                })
            }

            for(let x = 0; x < document.querySelectorAll(".just_button").length; x++){
                document.querySelectorAll(".just_button")[x].addEventListener("click",()=>{
                    document.querySelector(".closeJust").addEventListener("click", ()=>{
                        document.querySelector(".form_just").classList.add("hidden")
                        document.querySelectorAll(".tableItens")[0].classList.remove("hidden")
                        document.querySelectorAll(".tableItens")[1].classList.remove("hidden")
                    })
                    let qntdJust:any = document.querySelectorAll(".just_button")[x].parentNode.parentNode.querySelector(".qntd_devolution")
                    if(parseInt(qntdJust.value) < 1 || qntdJust.value == ''){
                        alert("É necessário informar a quantidade de itens para justificar a perda")
                        return
                    }
                    if(parseInt(qntdJust.value) > parseInt(qntdJust.getAttribute("max"))){
                        alert("Quantidade informada é superior a total de itens no estoque")
                        return
                    }
                    let setorJust = document.querySelectorAll(".just_button")[x].parentNode.parentNode.querySelector(".cd_origem").textContent
                    let unidade = document.querySelectorAll(".just_button")[x].parentNode.parentNode.querySelector(".cd_unidade").textContent
                    let loteJust = document.querySelectorAll(".just_button")[x].parentNode.parentNode.querySelector(".lote").textContent
                    let justCod = document.querySelectorAll(".just_button")[x].parentNode.parentNode.querySelector(".cd_produto").textContent
                    let prodJust:any = document.querySelectorAll(".just_button")[x].parentNode.parentNode
                    let dsprodJust = prodJust.getAttribute("value")
                    let codProdJust:any = document.querySelectorAll(".just_button")[x].parentNode.parentNode.querySelector(".cd_product").getAttribute("codigo")
                    let cdSetorJust:any = document.querySelectorAll(".just_button")[x].parentNode.parentNode.querySelector(".receiveDevolution").getAttribute("value")
        
                    document.querySelector(".justProduto").innerHTML = dsprodJust 
                    document.querySelector(".justCod").innerHTML = justCod 
                    document.querySelector(".loteJust").innerHTML = loteJust
                    document.querySelector(".justSetor").innerHTML = setorJust 
                    document.querySelector(".justQntd").innerHTML = qntdJust.value
                    document.querySelector(".justUnidade").innerHTML = unidade
                    document.querySelector(".justCod").innerHTML = codProdJust
                    document.querySelector(".justCdSetor").innerHTML = cdSetorJust
                    
                    document.querySelectorAll(".tableItens")[0].classList.add("hidden")
                    document.querySelectorAll(".tableItens")[1].classList.add("hidden")
                    document.querySelector(".form_just").classList.toggle("hidden")

                })
            }

            
            

        }

    }

    function replaceQntd(qntdAddRemove, cdEstoqueRemove){
        if(document.querySelector(`.mvto-${cdEstoqueRemove}`) != null){
            document.querySelector(`.mvto-${cdEstoqueRemove}`).textContent = (parseInt(document.querySelector(`.mvto-${cdEstoqueRemove}`)?.textContent) + qntdAddRemove).toString()
            }
        }
    
    function endDevolution(){
        document.querySelector(".btn_finalizar").innerHTML = ``
        document.querySelector(".div_loading").innerHTML = `
            <img class='w-28 h-28' src='images/loading.gif' />
        `
            
        let cd_saida:any = document.querySelectorAll(".cdProduct")

        setTimeout(()=>{
            window.location.reload()
        }, 10000)
        
        for(let i = 0; i < document.querySelectorAll(".car_item").length; i++){

                    fetch(process.env.URL + "set/setDevolution",{
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({    
                            saida: cd_saida[i].textContent,   
                            quantidade: parseInt(document.querySelectorAll(".qntdAdd")[i].textContent),
                            setor: parseInt(document.querySelectorAll(".ds_origem")[i].getAttribute("sector")),
                            lote: document.querySelectorAll(".loteCar")[i].textContent,
                            setorEstoque: Cookies.get("setor")
                        })
                    })
                }
                
                
            
       
    }
    async function endJust(){
      
        let produtoQntd = document.querySelector(".justQntd").textContent
        let produto = document.querySelector(".justProduto").textContent
        let setor = document.querySelector(".justSetor").textContent
        let justCod = document.querySelector(".justCod").textContent
        let lote = document.querySelector(".lote").textContent
        let just:any = document.querySelector("#justif")
        let cateJust:any = document.querySelector(".catJust")
        let codJust = document.querySelector(".justCod").textContent
        let justCdSetor = document.querySelector(".justCdSetor").textContent
        let unidade = document.querySelector(".justUnidade").textContent
        
        let recJust = await fetch(process.env.URL + "set/setJust",{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({    
                produto: produto,
                setor: setor,
                lote,
                produtoQntd: produtoQntd,
                cateJust: cateJust.value,
                just: just.value,
                codJust: codJust,
                justCdSetor: justCdSetor,
                unidade: unidade,
                usuario: Cookies.get("usuario"),
                setorEstoque: Cookies.get("setor"),

            })
        })
        

        let responseJust = await recJust.json()
        if(responseJust){
            window.location.reload()
        }else{
            alert('Foi encontrada baixas para esse produto, os dados serão atualizado')
            setTimeout(()=>{
                window.location.reload()
            })
        }
    }

    function renderSectorsList(){
        let arrSectorsList:any = []

        {props.productsSectors.map(sector =>{
            arrSectorsList.push(<option key={sector.CD_SETOR}>{sector.SETOR}</option>)
        })}

        return arrSectorsList
    }
  


    return(
        <div className="flex justify-center mt-10">
            {renderFormDevolution()}
        </div>
    )
}