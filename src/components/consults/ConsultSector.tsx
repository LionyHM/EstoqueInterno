import dateFormat from "dateformat"
export default function ConsultSector(props){
    function renderFormDevolution(){
        let arrFormDevolution:any = []

        arrFormDevolution.push(
            <div className="inline-block relative">
                <select onChange={(e)=> e.target.value == "global" || e.target.value ==  'consMensal' || e.target.value == 'prodUser' ? getSectorGlobal(e.target.value) : getTypeRel(e.target.value)}  className="rel_select dark:bg-gray-500 lg:mb-6 display_out_in block appearance-none w-44
                     bg-gray-100 font-bold border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value="---">---</option>
                        <option value="prodEstoque">Produtos no estoque</option>
                        <option value="consMensal">Relatório Movimentação dos Estoques</option>
                        <option value="baixas">Baixas</option>
                        <option value="global">Global</option>
                        <option value="prodUser">Relatório de Produtividade dos usuários</option>
                </select>
                <hr className="mb-6"/>
                <div className="flex flex-wrap justify-evenly mt-5 hidden divEstatic_total p-6">                    
                    <div className="p-10 mt-2 pr-10 pl-10 bg-green-800 rounded-lg text-white totalEstoque">Total no Estoque: <strong className="totalEstoquetext">0</strong></div>
                    <div className="p-16 mt-2 pr-16 pl-16 bg-gray-800 rounded-lg text-white entradas">Entradas: <strong className="entradastext">0</strong></div>
                    <div className="p-16 mt-2 pr-16 pl-16 bg-gray-800 rounded-lg text-white saidas">Saídas: <strong className="saidastext">0</strong></div>
                    <div className="p-16 mt-2 pr-16 pl-16 bg-gray-800 rounded-lg text-white devolucoes">Devoluções: <strong className="devolucoestext">0</strong></div>
                    <div className="p-16 mt-2 pr-16 pl-16 bg-gray-800 rounded-lg text-white pendenteTotal">Pendentes: <strong className="pendenteTotaltext">0</strong></div>
                    <div className="p-16 mt-2 pr-16 pl-16 bg-gray-800 rounded-lg text-white baixasTotal">Baixas: <strong className="baixastext">0</strong></div>
               </div>
               <div className="flex flex-wrap justify-evenly mt-5 hidden p-6 divEstatic">
                    <div className="p-16 mt-2 pr-16 pl-16 bg-gray-800 rounded-lg text-white totalItemLabel">Total: <strong className="totalItem">0</strong></div>
                    <div className="p-16 mt-2 pr-16 pl-16 bg-gray-800 rounded-lg text-white pendItemLabel">Pendente: <strong className="pendItem">0</strong></div>
                    <div className="p-16 mt-2 pr-16 pl-16b bg-gray-800 rounded-lg text-white pendItemLabel">Devolvido: <strong className="devItem">0</strong></div>
                    <div className="p-16 mt-2 pr-16 pl-16 bg-gray-800 rounded-lg text-white baixaJust baixajustPerdido">Perdido: <strong className="baixajustPerdidotext">0</strong></div>
                    <div className="p-16 mt-2 pr-16 pl-16 bg-gray-800 rounded-lg text-white baixaJust baixajustInutilizavel">Inutilizável: <strong className="baixajustInutilizaveltext">0</strong></div>
                    <div className="p-16 mt-2 pr-16 pl-16 bg-gray-800 rounded-lg text-white baixaJust baixajustQuebrado">Quebrado: <strong className="baixajustQuebradotext">0</strong></div>
                    <div className="p-16 mt-2 pr-16 pl-16 bg-gray-800 rounded-lg text-white consumivelBaixa baixajustQuebrado">Itens Consumíveis: <strong className="consumiveistext">0</strong></div>
                    <div className="p-16 mt-2 pr-16 pl-16 bg-gray-800 rounded-lg text-white baixaJust baixajustOutros">Outros: <strong className="baixajustOutrostext">0</strong></div>
               </div>
                <div className="prodEstoque hidden">
                    <select className="sit_estoque mb-2 dark:bg-gray-500 lg:mb-6 display_out_in block appearance-none w-32
                        bg-gray-100 font-bold border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value="---">---</option>
                        <option value="pendente">Pendentes</option>
                        <option value="devolvido">Devolvidos</option>
                        <option value="todos">Todos</option>
                    </select>
                        <input type="date" name="" id="dateOne" className="mr-5" />
                        <span className="mr-5">Até</span>
                        <input type="date" name="" id="dateTwo" />
                    <select onChange={(e)=>  getSector(e.target.value)} className="sector_list mt-6 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    <option>---</option>
                        {renderSectorsList()}
                    </select>    
                    <ul className="list_product">
                    </ul>
                    <button onClick={()=>{
                        let rel_select:any = document.querySelector(".rel_select")
                        let sector_list:any = document.querySelector(".sector_list")
                     getSector(rel_select.value == "global" 
                    ? getSectorGlobal("global")
                    :  rel_select.value =='prodUser' 
                    ? prodUser()
                    : sector_list.value)
                    }} className="mt-2 ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Buscar
                    </button>
                        <div className="flex justify-center flex-wrap ItensList mt-4">
                            
                        </div>
                    <div className='overflow-x-auto h-96 mt-5'>
                        <table className='rounded-lg bg-white w-full divide-y divide-gray-300 overflow-hidden'>
                            <thead className="bg-gray-900 dark:bg-gray-600">
                                <tr className="text-white text-center" style={{fontSize: "12px"}}>
                                <th className={`font-semibold uppercase px-4 py-2`}> Produto </th>
                                <th className={`font-semibold uppercase px-4 py-2`}> Lote </th>
                                <th className={`font-semibold uppercase px-4 py-2`}> Data de Saída </th>
                                <th className={`font-semibold uppercase px-4 py-2`}> Data de Devolução </th>                           
                                <th className={`font-semibold uppercase px-4 py-2`}> Usuário da Saída </th>                           
                     
                                </tr>
                            </thead>
                            <tbody className="add_item_list h-20 divide-y divide-gray-200 text-center"> 
                            
                            </tbody>
                        </table>
                    </div>           
                </div> 
                <div className="baixas hidden">
                <label className="dark:text-white block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                         Usuário
                     </label>
                     <input autoComplete="off" className="nameUser dark:text-white dark:bg-gray-500  appearance-none block w-98 bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm" id="grid-last-name" type="text" placeholder="Usuário" />
                        <div className="buscas">
                            <input type="date" name="" id="dateOneDown" className="mr-5" />
                            <span className="mr-5">Até</span>
                            <input type="date" name="" id="dateTwoDown" />
                            <button onClick={()=>{
                             let rel_select:any = document.querySelector(".rel_select")
                             rel_select.value == "global" 
                             ? getSectorGlobal("global") 
                             : rel_select.value == "consMensal" 
                             ? atividadeMensal()
                             : rel_select.value =='prodUser' 
                             ? prodUser()
                             : searchDowns()
                             
                             }} className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Buscar
                            </button>
                        </div>
                  <div className='overflow-x-auto h-96 mt-5 baixa_rel'>
                        <table className='rounded-lg bg-white w-full divide-y divide-gray-300 overflow-hidden'>
                            <thead className="bg-gray-900 dark:bg-gray-600">
                                <tr className="text-white text-center" style={{fontSize: "12px"}}>
                                <th className={`font-semibold uppercase px-4 py-2`}> Produto </th>
                                <th className={`font-semibold uppercase px-4 py-2`}> Data da Baixa </th>
                                <th className={`font-semibold uppercase px-4 py-2`}> Categoria </th>
                                <th className={`font-semibold uppercase px-4 py-2`}> Justificativa </th>                           
                                <th className={`font-semibold uppercase px-4 py-2`}> Setor </th>                           
                                </tr>
                            </thead>
                            <tbody className="add_item_list_baixa h-20 divide-y divide-gray-200 text-center"> 
                            
                            </tbody>
                        </table>
                    </div>           
                  <div className='overflow-x-auto h-full mt-5 mensal_rel hidden flex justify-evenly flex-wrap'>
                       
                    </div>           
                  <div className='overflow-x-auto h-full mt-5 user_rel hidden flex justify-evenly flex-wrap'>
                       
                    </div>           
                  <div className='overflow-x-auto h-96 mt-5 hidden global_rel'>
                        <table className='rounded-lg bg-white w-full divide-y divide-gray-300 overflow-hidden'>
                            <thead className="bg-gray-900 dark:bg-gray-600">
                                <tr className="text-white text-center list_global_rel_tr" style={{fontSize: "12px"}}>
                                <th className={`font-semibold uppercase px-4 py-2`}> Setor </th>                         
                       
                                </tr>
                            </thead>
                            <tbody className="add_global_rel h-20 divide-y divide-gray-200 text-center"> 
                            
                            </tbody>
                        </table>
                    </div>           
                </div> 
            </div>
        )        

        return arrFormDevolution
    }



    
    async function getSectorGlobal(e){
        if(e == "global"){
            document.querySelector(".totalItemLabel").classList.add("hidden")
            document.querySelector(".nameUser").classList.add("hidden")
            document.querySelectorAll(".pendItemLabel")[0].classList.add("hidden")
            document.querySelectorAll(".pendItemLabel")[1].classList.add("hidden")
            document.querySelectorAll(".baixaJust")[0].classList.add("hidden")
            document.querySelectorAll(".baixaJust")[1].classList.add("hidden")
            document.querySelectorAll(".baixaJust")[2].classList.add("hidden")
            document.querySelectorAll(".baixaJust")[3].classList.add("hidden")
            document.querySelector(".entradas").classList.remove("hidden")
            document.querySelector(".saidas").classList.remove("hidden")
            document.querySelector(".devolucoes").classList.remove("hidden")
            document.querySelector(".pendenteTotal").classList.remove("hidden")
            document.querySelector(".baixasTotal").classList.remove("hidden")
            document.querySelector(".baixas").classList.remove("hidden")
            document.querySelector(".divEstatic").classList.remove("hidden")
            document.querySelector(".prodEstoque").classList.add("hidden")
            document.querySelector(".baixa_rel").classList.add("hidden")
            document.querySelector(".global_rel").classList.remove("hidden")
            document.querySelector(".consumivelBaixa").classList.add("hidden")
            document.querySelector(".buscas").classList.add("hidden")
            document.querySelector(".divEstatic_total").classList.remove("hidden")
            document.querySelector(".add_global_rel").innerHTML = ' '
            document.querySelector('.mensal_rel').classList.add('hidden')
            document.querySelector(".list_global_rel_tr").innerHTML = '<th className={`font-semibold uppercase px-4 py-2`}> Setor </th>'
           

        let arrDatas = interval(dateFormat(Date.now(),"yyyy-mm-dd"), dateFormat(Date.now(),"yyyy-mm-dd"))
        let arrNumberSaidas = []
        let arrNumberEntradas = []
        let arrNumberPendentes = []
        let arrNumberDevolucoes = []
        let arrNumberBaixas = []
        let arrTotalEstoque = []
        document.querySelector(".add_item_list_baixa").innerHTML = ''
        const dados = await getEstoqueLocal()
        const dadosEstoque = await getEstoqueIn()

        dados.forEach((product, i) =>{   
            for(let p = 0; p < arrDatas.length; p++){
         

                product.DATA_SAIDA.slice(0,10) == arrDatas[p] ? 
                    arrNumberSaidas.push(product.DATA_SAIDA)
                    : null                
                   
                    product.DATA_DEVOLUCAO != null && product.DATA_SAIDA.slice(0,10) == arrDatas[p] ? 
                    arrNumberDevolucoes.push(product.DATA_DEVOLUCA)
                    : null                
                    product.DATA_DEVOLUCAO == null && product.DATA_SAIDA.slice(0,10) == arrDatas[p] ? 
                    arrNumberPendentes.push(product.DATA_DEVOLUCA)
                    : null                
            }
        })
        let arrProductList = []
        let arrProductListUniq = []
        dadosEstoque.forEach((prodEstoque, i) =>{   
            for(let p = 0; p < arrDatas.length; p++){
     
                prodEstoque.DT_CRIACAO.slice(0,10) == arrDatas[p]  ? 
                arrNumberEntradas.push(prodEstoque.CD_ESTOQUE)
                : null

               
                
            }
            prodEstoque.ATIVO == "S" ? arrProductList.push(prodEstoque.DS_PRODUTO)  : null
            prodEstoque.ATIVO == "S" ? arrTotalEstoque.push(prodEstoque.CD_ESTOQUE)
            : null
        })
        let arrSectorsList = []
        let arrSectorsListUniq = []

        props.productsBaixas.forEach((prodEstoque, i) =>{   
            for(let p = 0; p < arrDatas.length; p++){
                prodEstoque.DATA_CRIACAO.slice(0,10) == arrDatas[p]  ? 
                arrNumberBaixas.push(prodEstoque.DATA_CRIACAO)
                : null                
            }
       
        })
        let arrProdSetor = []
        let arrProdSetorValue = []  
        let arrProdSetorUnique = []  
        let arrProdSetorValueItem = []  
        let arrProdSetorUniqueItem = []  
        props.productsSectorsEstoque.map((sectorList, cont) => {
         
            props.sectors.map(sectorNM => {
                sectorList.SETOR == sectorNM.CD_SETOR ? sectorList.SETOR = sectorNM.NM_SETOR : null
                sectorList.SETOR == sectorNM.NM_SETOR ? arrProdSetorValue.push(sectorNM.CD_SETOR) : null
                sectorList.SETOR == sectorNM.NM_SETOR ? arrProdSetorValueItem.push(sectorNM.NM_SETOR) : null
            })

            
            sectorList.SETOR ? arrSectorsList.push(sectorList.SETOR) : null

            
        }),
        arrProdSetorUnique = [...new Set(arrProdSetorValue)]
        arrProdSetorUniqueItem = [...new Set(arrProdSetorValueItem)]

        for(let f = 0 ; f < arrProdSetorUnique.length; f++){
            dadosEstoque.map((item, contI) => {
    
                item.SETOR == arrProdSetorUnique[f] && item.ATIVO == 'S' ? arrProdSetor.push(arrProdSetorUniqueItem[f] + item.DS_PRODUTO) : null
            })

        }
        
        arrProductListUniq = [...new Set(arrProductList)]
        arrSectorsListUniq = [...new Set(arrSectorsList)]
        arrProductListUniq.sort()
        arrSectorsListUniq.sort()
        let sectorsList = countItems(arrProdSetor)

        for(let y = 0; y < arrSectorsListUniq.length; y++){
            /* let arrSectorsSplit = sectorsList.split("---", 0) */
            document.querySelector(".add_global_rel").innerHTML += `
                <tr key=${Math.random() + y} class="${arrSectorsListUniq[y].replace(/ /g, '_')} listTrProduct">
                    <td >${arrSectorsListUniq[y]}</td>
                </tr>    
                    `
                    let classTr = arrSectorsListUniq[y]
                        for(let x = 0; x < arrProductListUniq.length; x++){

                            document.querySelector("." + classTr.replace(/ /g, '_')).innerHTML += `
                            <td key=${Math.random() + x} >${sectorsList[arrSectorsListUniq[y] + arrProductListUniq[x]] == undefined ? 0 : sectorsList[arrSectorsListUniq[y] + arrProductListUniq[x]]}</td>
                            `
                        }
                    
        }
        
        for(let y = 0; y < arrProductListUniq.length; y++){
                 
            document.querySelector(".list_global_rel_tr").innerHTML += `
            <th key=${Math.random() + y} class={'font-semibold uppercase px-4 py-2'}>${arrProductListUniq[y]}</th>    
                `
        }
        
        document.querySelector(".add_global_rel").innerHTML += `<tr key=${Math.random()} class="TotalList">
            <td class='font-bold'>Total</td>
        </tr>`

        let arrListTrTd = []
        let arrListTrTdSoma = []
        let arrListTrTdSomaTodos = []
        for(let d = 0; d < document.querySelectorAll(".listTrProduct").length; d++){
            document.querySelectorAll(".listTrProduct")[d].querySelectorAll('td')

            for(let s = 0; s < document.querySelectorAll(".listTrProduct")[d].querySelectorAll('td').length; s++){
                
                isNaN(+document.querySelectorAll(".listTrProduct")[d].querySelectorAll('td')[s].textContent)  ? null :  arrListTrTd.push(document.querySelectorAll(".listTrProduct")[d].querySelectorAll('td')[s].textContent)
                if(s + 1 == document.querySelectorAll(".listTrProduct")[d].querySelectorAll('td').length){
                       if(arrListTrTdSoma.length == 0){                    
                        arrListTrTdSoma = arrListTrTd.slice()
                        arrListTrTd.length = 0
                    }else{
                        for(let t = 0; t < arrListTrTdSoma.length; t++){
                            arrListTrTdSomaTodos.push(+arrListTrTdSoma[t] + +arrListTrTd[t])                            
                        }
                        arrListTrTd.length = 0
                        arrListTrTdSoma = arrListTrTdSomaTodos.slice()
                        arrListTrTdSomaTodos.length = 0       
                    }
                                      
                }
            }
            
        }
        for(let w = 0; w < arrListTrTdSoma.length; w++){
            document.querySelector(".TotalList").innerHTML += `
                    <td key=${Math.random() + w} class='font-bold'>${arrListTrTdSoma[w]}</td>       
            `
        }
      
        document.querySelector(".saidastext").textContent = (arrNumberSaidas.length).toString()
        document.querySelector(".entradastext").textContent = (arrNumberEntradas.length).toString()
        document.querySelector(".devolucoestext").textContent = (arrNumberDevolucoes.length).toString()
        document.querySelector(".pendenteTotaltext").textContent = (arrNumberPendentes.length).toString()
        document.querySelector(".baixastext").textContent = (arrNumberBaixas.length).toString()
        document.querySelector(".totalEstoquetext").textContent = (arrTotalEstoque.length).toString()


       
        }
        if(e == 'consMensal'){
            document.querySelector('.baixas').classList.remove('hidden')
            document.querySelector('.mensal_rel').classList.remove('hidden')
            document.querySelector('.baixa_rel').classList.add('hidden')
            document.querySelector('.global_rel').classList.add('hidden')
            document.querySelectorAll('.divEstatic_total')[0].classList.add('hidden')
            document.querySelectorAll('.divEstatic')[0].classList.add('hidden')
            document.querySelector(".prodEstoque").classList.add("hidden")
            document.querySelector(".buscas").classList.remove("hidden")
            document.querySelector(".user_rel").classList.add("hidden")
            document.querySelector(".nameUser").classList.add("hidden")
        }
        if(e == 'prodUser'){
            document.querySelector('.baixas').classList.remove('hidden')
            document.querySelector('.mensal_rel').classList.add('hidden')
            document.querySelector('.baixa_rel').classList.add('hidden')
            document.querySelector('.global_rel').classList.add('hidden')
            document.querySelectorAll('.divEstatic_total')[0].classList.add('hidden')
            document.querySelectorAll('.divEstatic')[0].classList.add('hidden')
            document.querySelector(".prodEstoque").classList.add("hidden")
            document.querySelector(".buscas").classList.remove("hidden")
            document.querySelector(".user_rel").classList.remove("hidden")
            document.querySelector(".nameUser").classList.remove("hidden")
        }
    }

    async function prodUser(){
        let nameUser:any = document.querySelector(".nameUser")
        let d1:any = document.querySelector('#dateOneDown')
        let d2:any = document.querySelector('#dateTwoDown')
        let dados = await fetch('/api/consults/getUserProdutive', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                d1: d1.value,
                d2: d2.value,
                nameUser: nameUser.value
            })
            
        })
        let responseDados = await dados.json()
        if(responseDados < 1){
            alert(`Usuário ${nameUser.value} não encontrado`)
            document.querySelector(".user_rel").innerHTML = ''
            return
        }
        document.querySelector(".user_rel").innerHTML = ''
        document.querySelector(".user_rel").innerHTML += `
        <table key=${Math.random()} class='bg-white w-full divide-y divide-gray-300 overflow-hidden atividade_mensal'>
        <thead class="bg-gray-900 dark:bg-gray-600">
            <tr class="bg-gray-700 text-white text-center" style={{fontSize: "12px"}}>
            <th colspan='4' class={'font-semibold uppercase px-2 py-1'}> ${responseDados[0]?.USUARIO_IMPORTACAO} </th>                       
            </tr>
            <tr class="text-white text-center" style={{fontSize: "12px"}}>                   
            <th class={'font-semibold uppercase px-2 py-1 text-center imports'}> Importações </th>                       
            <th class={'font-semibold uppercase px-2 py-1 text-center totalImports'}> Quantidade Total de Produtos importados </th>                       
            <th class={'font-semibold uppercase px-2 py-1 text-center TpMovImport'}> Tipo de Movimentação </th>                       

            </tr>
        </thead>
        <tbody class="h-20 divide-y divide-gray-200 text-center userTable">

        </tbody>
    </table>
        `
        document.querySelector(".userTable").innerHTML = ''
        responseDados.map(user => {
            document.querySelector(".userTable").innerHTML +=`
                <tr class='font-bold' key=${Math.random()}>
                    <td>${user.QUANTIDADE}</td>
                    <td>${user.TOTALQUANTIDADE}</td>
                    <td>${user.TP_MOVIMENTACAO == 'E' ? 'ENTRADA' : 'SAÍDA'}</td>
                </tr>
            `
        })
    }

    async function atividadeMensal(){
        let d1:any = document.querySelector('#dateOneDown')
        let d2:any = document.querySelector('#dateTwoDown')

        let dados = await fetch('/api/consults/getConsumSector', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                d1: d1.value,
                d2: d2.value
            })
            
        })
        let responseDados = await dados.json()
        let arrProdSetorValue = []
        let arrProdSetorValueItem = []
        responseDados.map(dado =>{
            props.sectors.map(sectorNM => {
                dado.setor == sectorNM.CD_SETOR ? dado.setor = sectorNM.NM_SETOR : null
                dado.setor == sectorNM.NM_SETOR ? arrProdSetorValue.push(sectorNM.CD_SETOR) : null
                dado.setor == sectorNM.NM_SETOR ? arrProdSetorValueItem.push(sectorNM.NM_SETOR) : null
            })
        })

        let arrProdSetorValueItemUnique = [...new Set(arrProdSetorValueItem)]

        document.querySelector('.mensal_rel').innerHTML = ``
        arrProdSetorValueItemUnique.sort()
        for(let x = 0; x < arrProdSetorValueItemUnique.length; x++){
            document.querySelector('.mensal_rel').innerHTML += `
            
            
            <table key=${Math.random() + x} class='bg-white w-full divide-y divide-gray-300 overflow-hidden atividade_mensal'>
            <thead class="bg-gray-900 dark:bg-gray-600">
                <tr class="bg-gray-700 text-white text-center" style={{fontSize: "12px"}}>
                <th colspan='4' class={'font-semibold uppercase px-2 py-1'}> ${arrProdSetorValueItemUnique[x]} </th>                       
                </tr>
                <tr class="text-white text-center" style={{fontSize: "12px"}}>
                <th class={'font-semibold uppercase px-2 py-1 text-center'}> Produto </th>                       
                <th class={'font-semibold uppercase px-2 py-1 text-center'}> Entradas </th>                       
                <th class={'font-semibold uppercase px-2 py-1 text-center'}> Devolvidos </th>                       
                <th class={'font-semibold uppercase px-2 py-1 text-center'}> Baixa/Consumo </th>                       
   
                </tr>
            </thead>
            <tbody class="h-20 divide-y divide-gray-200 text-center mensal_${arrProdSetorValueItemUnique[x].replace(/ /g, '_').replace('.', '_').replace('°', '_')}">

            </tbody>
        </table>
            
            
            `
        }
        responseDados.map((dado, i) =>{
            document.querySelector(`.mensal_${dado.setor.replace(/ /g, '_').replace('.', '_').replace('°', '_')}`).innerHTML += `
            

                <td key=${Math.random() + i}>${dado.DS_PRODUTO}</td>
                <td key=${Math.random() + i}>${+dado.CONSUMO + +dado.NAODEVOLVIDO + +dado.DEVOLVIDO}</td>
                <td key=${Math.random() + i}>${dado.DEVOLVIDO}</td>
                <td key=${Math.random() + i}>${dado.CONSUMO}</td>
           
            `
          
        }) 

    }

    function countItems(arr) {
        const countMap = Object.create(null);
      
        for (const element of arr) {
          if (!countMap[element]) {
            // Se ainda não existir elemento, definimos como um, já que
            // estamos na primeira ocorrência.
            countMap[element] = 1;
          } else {
            // Caso contrário, incrementamos um no número atual.
            countMap[element] += 1;
          }
        }
        
        return countMap;
      }
      

    function getTypeRel(e){
        document.querySelector(".divEstatic").classList.remove('hidden')
        if(e == "prodEstoque"){
            /* if(document.querySelector(".sit_estoque").value == "todos"){
            } */
            document.querySelector(".prodEstoque").classList.remove("hidden")
            document.querySelector(".totalItem").textContent = '0'
            document.querySelector(".totalItemLabel").classList.remove("hidden")
            document.querySelector(".entradas").classList.add("hidden")
            document.querySelector(".saidas").classList.add("hidden")
            document.querySelector(".devolucoes").classList.add("hidden")
            document.querySelector(".baixasTotal").classList.add("hidden")
            document.querySelector(".pendenteTotal").classList.add("hidden")
            document.querySelectorAll(".pendItemLabel")[0].classList.remove("hidden")
            document.querySelectorAll(".pendItemLabel")[1].classList.remove("hidden")
            document.querySelectorAll(".baixaJust")[0].classList.add("hidden")
            document.querySelectorAll(".baixaJust")[1].classList.add("hidden")
            document.querySelectorAll(".baixaJust")[2].classList.add("hidden")
            document.querySelectorAll(".baixaJust")[3].classList.add("hidden")
            document.querySelector(".divEstatic_total").classList.add("hidden")
            document.querySelector(".global_rel").classList.add("hidden")
            document.querySelector(".consumivelBaixa").classList.add("hidden")
            document.querySelector(".user_rel").classList.add("hidden") 
            document.querySelector(".nameUser").classList.add("hidden") 
        }else{
            document.querySelector(".prodEstoque").classList.add("hidden")
        }
        if(e == "baixas"){
            /* if(document.querySelector(".sit_estoque").value == "todos"){
            } */
            document.querySelector(".baixas").classList.remove("hidden")
            document.querySelector(".baixa_rel").classList.remove("hidden")
            document.querySelectorAll(".pendItemLabel")[0].classList.add("hidden")
            document.querySelectorAll(".pendItemLabel")[1].classList.add("hidden")
            document.querySelectorAll(".baixaJust")[0].classList.remove("hidden")
            document.querySelectorAll(".baixaJust")[1].classList.remove("hidden")
            document.querySelectorAll(".baixaJust")[2].classList.remove("hidden")
            document.querySelectorAll(".baixaJust")[3].classList.remove("hidden")
            document.querySelector(".pendenteTotal").classList.add("hidden")
            document.querySelector(".entradas").classList.add("hidden")
            document.querySelector(".saidas").classList.add("hidden")
            document.querySelector(".devolucoes").classList.add("hidden")
            document.querySelector(".baixasTotal").classList.add("hidden")
            document.querySelector(".divEstatic_total").classList.add("hidden")
            document.querySelector(".global_rel").classList.add("hidden")
            document.querySelector(".consumivelBaixa").classList.remove("hidden")
            document.querySelector('.mensal_rel').classList.add('hidden')
            document.querySelector(".user_rel").classList.add("hidden")
            document.querySelector(".nameUser").classList.add("hidden")

            document.querySelector(".totalItem").textContent = '0'
        }else{
            document.querySelector(".baixas").classList.add("hidden")
        }

        if(e == "global"){
            document.querySelector(".totalItemLabel").classList.add("hidden")
            document.querySelectorAll(".pendItemLabel")[0].classList.add("hidden")
            document.querySelectorAll(".pendItemLabel")[1].classList.add("hidden")
            document.querySelectorAll(".baixaJust")[0].classList.add("hidden")
            document.querySelectorAll(".baixaJust")[1].classList.add("hidden")
            document.querySelectorAll(".baixaJust")[2].classList.add("hidden")
            document.querySelectorAll(".baixaJust")[3].classList.add("hidden")
            document.querySelector(".entradas").classList.remove("hidden")
            document.querySelector(".saidas").classList.remove("hidden")
            document.querySelector(".devolucoes").classList.remove("hidden")
            document.querySelector(".baixas").classList.remove("hidden")
            document.querySelector(".pendenteTotal").classList.remove("hidden")




        }
    }

    function renderSectorsList(){
        let arrSectorsList:any = []

        {props.sectors.map((sector, i) =>{
            arrSectorsList.push(<option value={sector.CD_SETOR} key={sector.CD_SETOR * Math.random() + i}>{sector.NM_SETOR}</option>)
        })}

        return arrSectorsList
    }
    async function getEstoqueLocal(){
        const items = await fetch( process.env.URL + "consults/getMovSector")
        const responseItems = await items.json()
        
        return await responseItems       
    }
    async function getEstoqueIn(){
        const items = await fetch( process.env.URL + "consults/getProductsIn",{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                consult: true
            })
        })
        const responseItems = await items.json()
        
        
        return await responseItems       
    }

    async function getSector(e){
        document.querySelector(".ItensList").innerHTML = ''
        let code = e
        let dateOne:any = document.querySelector("#dateOne")
        let dateTwo:any = document.querySelector("#dateTwo")
        let sit_estoque:any = document.querySelector(".sit_estoque")
        if(sit_estoque.value == "---"){
            alert("Favor escolher uma situação para a busca")
            document.querySelector(".sector_list").setAttribute("value","---")
            return
        }
        if(dateOne.value == '' || dateTwo.value == ''){
            alert("Favor selecionar um periodo que deseja buscar")
            document.querySelector(".sector_list").setAttribute("value","---")
            return
        }
        let arrDatas = interval(dateOne.value, dateTwo.value)
        let arrSector = []
        let userSelected: boolean
        document.querySelector(".add_item_list").innerHTML = ''
        const dados = await getEstoqueLocal()
        
        let situacao:any = document.querySelector(".sit_estoque")
        document.querySelector(".list_product").innerHTML = ""
        dados?.forEach((sector, i) =>{
            userSelected = sector.SETOR.toString()?.indexOf(code) > -1  
            for(let p = 0; p < arrDatas.length; p++){
                let dateConvertFilter = arrDatas[p] 
         
 
                if(situacao.value == 'todos'){userSelected && sector.DATA_SAIDA.slice(0,10) == dateConvertFilter ? document.querySelector(".add_item_list").innerHTML += `
                    <tr key="${i * Math.random()}">
                    <td class="p-2 nameProd">${sector.DS_PRODUTO}</td>
                    <td class="p-2 LoteProd">${sector.LOTE}</td>
                    <td class="p-2 dt_saida">
                    ${
                        covDate(sector.DATA_SAIDA)   
                    }
                    </td>
                    <td class="pedItem  ${sector.DATA_DEVOLUCAO == null ? 'pendente' : 'devolvido' }" class="p-2">${sector.DATA_DEVOLUCAO == null ? "<strong>Produto não devolvido</strong>" : sector.DATA_DEVOLUCAO}</td>
                    </td>
                    <td class="" class="p-2">${sector.USUARIO_RECEPTOR}</td>
                    <tr>
                    `
                    : null
                }
                if(situacao == 'pendente' && sector.DATA_DEVOLUCAO == null){userSelected && sector.DATA_SAIDA.slice(0,10) == dateConvertFilter ? document.querySelector(".add_item_list").innerHTML += `
                    <tr key=${Math.random() + i}>
                    <td class="p-2 nameProd">${sector.DS_PRODUTO}</td>
                    <td class="p-2 LoteProd">${sector.LOTE}</td>
                    <td class="p-2">
                    ${
                        covDate(sector.DATA_SAIDA)   
                    }
                    </td>
                    <td class="pedItem ${sector.DATA_DEVOLUCAO == null ? 'pendente' : 'devolvido' }" class="p-2">${sector.DATA_DEVOLUCAO == null ? "<strong>Produto não devolvido</strong>" : sector.DATA_DEVOLUCAO}</td>
                    <td class="" class="p-2">${sector.USUARIO_RECEPTOR}</td>
                    </tr>
                    `
                    : null
                }
                if(situacao == 'devolvido' && sector.DATA_DEVOLUCAO != null){userSelected && sector.DATA_SAIDA.slice(0,10) == dateConvertFilter ? document.querySelector(".add_item_list").innerHTML += `
                    <tr key=${Math.random() + i}>
                    <td class="p-2 nameProd">${sector.DS_PRODUTO}</td>
                    <td class="p-2 LoteProd">${sector.LOTE}</td>
                    <td class="p-2">
                    ${
                        covDate(sector.DATA_SAIDA)   
                    }
                    </td>
                    <td class="pedItem ${sector.DATA_DEVOLUCAO == null ? 'pendente' : 'devolvido' }" class="p-2">${sector.DATA_DEVOLUCAO == null ? "<strong>Produto não devolvido</strong>" : sector.DATA_DEVOLUCAO}</td>
                    <td class="" class="p-2">${sector.USUARIO_RECEPTOR}</td>
                    </td>
                    
                   </tr>
                    `
                    : null
                }
            }
                
        })
        

            let produtoListados = document.querySelectorAll(".nameProd")
            let arrProdList = []
            let pedItemArr = []
            let pedItemDevolvArr = []
            
            for(let x = 0; x < produtoListados.length; x++){
                arrProdList.push(produtoListados[x].textContent)
            }
            
            let uniqProd = [...new Set(arrProdList)]
            
            uniqProd.map((uniq, i) =>{
                let pedItem = 0
                let pedItemDevolv = 0
                let contItem = arrProdList.filter(y => y == uniq).length

                for(let y = 0; y < produtoListados.length; y++){
                    document.querySelectorAll(".pendente")[y]?.parentNode.querySelector(".nameProd").textContent == uniq ? pedItem++ : null
                   document.querySelectorAll(".devolvido")[y]?.parentNode.querySelector(".nameProd").textContent == uniq ? pedItemDevolv++ : null
                }

                document.querySelector(".ItensList").innerHTML += `<div key='${Math.random() + i}' class="w-80 mb-6 text-sm"><p class="font-bold">${uniq}</p>
                                                                      <p class="font-bold text-blue-700">Total: ${contItem}</p>      
                                                                      <p class="font-bold text-red-700">Pendente: ${pedItem}</p>      
                                                                      <p class="font-bold text-green-700"> Devolvido: ${pedItemDevolv}</p>
                                                                    </div>`
            })

      
        document.querySelector(".totalItem").textContent = (document.querySelectorAll(".nameProd").length).toString()
        document.querySelector(".pendItem").textContent = (document.querySelectorAll(".pedItem strong").length).toString()
        document.querySelector(".devItem").textContent = (document.querySelectorAll(".nameProd").length - document.querySelectorAll(".pedItem strong").length).toString()
    }

    function covDate(data){
        let horas = data.slice(10)
        let dia = data.slice(8, 10)
        let mes = data.slice(5, 7)
        let ano = data.slice(0, 4)

        return dia + "/" + mes + "/" + ano + horas
    }

    function covDateFilter(data){

          let ano = data.slice(6, 10)
        let mes = data.slice(3, 5)
        let dia = data.slice(0, 2)
        return ano + "-" + mes + "-" + dia
    }

    function interval(d1,d2){
        let arrDatas:any = []
        let data1 = d1
        let data2 = d2





        let dataT = new Date(data1 + 'T00:00:00')
        let dataD = new Date(data2 + 'T00:00:00')
        var outraData = new Date();
        let newDate:any = ''


        var timeDiff = Math.abs(dataT.getTime() - dataD.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        
        arrDatas.push(dateFormat(dataT, "yyyy-mm-dd"))
        for(let d = 0; d <= diffDays; d++){
            newDate = dataT.setDate(dataT.getDate() + 1)
            arrDatas.push(dateFormat(newDate, "yyyy-mm-dd"))
            
        }

        return arrDatas



    }

    function searchDowns(){
        let dateOneDown:any = document.querySelector("#dateOneDown")
        let dateTwoDown:any = document.querySelector("#dateTwoDown")
        let arrDatas = interval(dateOneDown.value, dateTwoDown.value)
        let userSelected: boolean
        document.querySelector(".add_item_list_baixa").innerHTML = ''
        props.productsBaixas.forEach((product, i) =>{
            


            for(let p = 0; p < arrDatas.length; p++){
                let dateConvertFilter = arrDatas[p]                
                product.DATA_CRIACAO.slice(0,10) == dateConvertFilter ? document.querySelector(".add_item_list_baixa").innerHTML += `
                    <td key="${i * Math.random()}" class="p-2 nameProdBaixa">${product.DS_PRODUTO}</td>
                    <td key="${i * Math.random()}" class="p-2">
                    ${
                        covDate(product.DATA_CRIACAO)   
                    }
                    </td>
                    <td class="catBaixa p2 ${product.CATEGORIA}" value="${product.CATEGORIA}" key="${i * Math.random()}">${product.CATEGORIA}</td>
                    <td class="descBaixa" key="${i * Math.random()}" class="p-2">${product.DESCRICAO}</td>
                    <td class="setorBaixa" key="${i * Math.random()}" class="p-2">${product.SETOR}</td>
                    `
                    : null
                
            }

            

        })

        document.querySelector(".totalItem").textContent = (document.querySelectorAll(".nameProdBaixa").length).toString()
        document.querySelector(".baixajustPerdidotext").textContent = (document.querySelectorAll(".perdido").length).toString()
        document.querySelector(".baixajustInutilizaveltext").textContent = (document.querySelectorAll(".inutilizavel").length).toString()
        document.querySelector(".baixajustQuebradotext").textContent = (document.querySelectorAll(".quebrado").length).toString()
        document.querySelector(".consumiveistext").textContent = (document.querySelectorAll(".consumivel").length).toString()
        document.querySelector(".baixajustOutrostext").textContent = (document.querySelectorAll(".outro").length).toString()
       
    }

    return(
        renderFormDevolution()
    )
}