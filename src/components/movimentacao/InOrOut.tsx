import { isValidElement, useEffect, useState } from "react"
import Cookies from "js-cookie"
import {useRouter} from "next/router"
import dateFormat from "../../functions/convertDateBr"
import convertDate from "../../functions/convertDate"

export default function InOrOut(props){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [productComplete, setProductComplete] = useState([])
    const [msgErro, setMsgErro] = useState("")
    const [msgSucess, setMsgSucess] = useState("")
    const [validad, setValidad] = useState(false)
    const [limit, setLimit] = useState(false)
    const router = useRouter()

    useEffect(()=>{
        document.addEventListener("keydown", (event) => {
            if (event.key == "Enter") SearchFotCodeOrName()  
            if (event.key == "x") addList() 
          });
    },[200])

    function renderForm():object{
        const arrForm :any= []

        arrForm.push(
            <form key={1000} className="w-full py-4 2xl:px-60">
                     <select onClick={()=>selectMvto()} className="dark:bg-gray-500 lg:mb-4 display_out_in block appearance-none w-32
                      bg-gray-100 font-bold border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
                         <option value="---">---</option>
                         <option value="entrada">Entrada</option>
                         <option value="saida">Saída</option>
                     </select>
                     <hr className="mb-4"/>
                     <div id="erro_msg" className="hidden bg-red-100 border border-red-400 mb-4 text-red-700 px-2 py-1 rounded relative" role="alert">
                         <strong className="font-bold">Operação inválida!</strong>
                         <span className="block sm:inline">{msgErro}</span>
                         <span className="absolute top-0 bottom-0 right-0 px-3 py-2">
                             <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                         </span>
                     </div>
                     <div id="sucess_msg" className="hidden bg-green-100 border border-green-400 mb-4 text-green-800 px-2 py-1 rounded relative" role="alert">
                         <strong className="font-bold">Operação Realizada com Sucesso!!</strong>
                         <span className="block sm:inline">{msgSucess}</span>
                         <span className="absolute top-0 bottom-0 right-0 px-3 py-2">
                             <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                         </span>
                     </div>
                 <div className="form_fields hidden flex flex-wrap lg:flex-nowrap -mx-3 mb-4 relative">
                     <div className="w-22 px-2 mb-4 md:mb-0">
                     <label className="dark:text-white block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                         Código do Produto
                     </label>
                     <input  required onClick={()=> hiddenForm()} className="dark:text-white dark:bg-gray-500 product_code_search appearance-none block w-full bg-gray-100 text-gray-700 border  rounded py-1 px-2 mb-3 leading-tight dark:focus:bg-gray-500 focus:outline-none focus:bg-white text-sm" id="grid-first-name" type="number" placeholder="Código do Produto" />
                     <p className="text-red-500 text-xs italic">Digite o código ou nome do produto.</p>
                     </div>
                     <div className="w-full  px-3">
                     <label className="dark:text-white block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                         Nome do Produto
                     </label>
                     <input autoComplete="off" required onClick={()=> hiddenForm()} onChange={(e) => e.target.value != '' ? filterProduct(e.target.value.toUpperCase()) : ' '} className="dark:text-white dark:bg-gray-500 product_name_search appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm" id="grid-last-name" type="text" placeholder="Nome do Produto" />
                     <div hidden className={`
                         absolute
                         w-full
                         lg:w-96
                         h-52
                         overflow-scroll
                         bg-white
                         div_complete
                         dark:text-black
                     `}>
                         {productComplete}
                     </div>
                     <button  onClick={()=> SearchFotCodeOrName()} className="lg:mt-2 dark:bg-white dark:hover:bg-gray-400 dark:text-black bg-gray-700 hover:bg-gray-900 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-xs" type="button">
                         Selecionar
                     </button>
                     </div>
                 </div>
                 <hr className="mt-4 mb-4"/>
                 <div className="display_register_product w-full h-full hidden flex justify-center">
                     <div className="w-full justify-center h-full  px-2 py-1 mb-6 md:mb-0 relative">
                     <div className="block mr-10">
                        <label className="dark:text-white  block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lote">
                            Lote:
                        </label>
                        <input required className="dark:text-white  dark:bg-gray-500 lote_product mr-10 appearance-none block w-36 bg-gray-100 text-gray-700 border  rounded py-1 px-3 mb-3 leading-tight focus:outline-none focus:bg-white text-sm" id="lote" type="text" placeholder="Lote" />
                        <select onChange={()=> contQntdRest()} className="dark:text-white mb-2 dark:bg-gray-500 lote_product_out block appearance-none w-36 bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
                                <option>---</option>                              
                        </select>
                     </div>                     
                       <div className="inline-block">
                            <label className="dark:text-white  qntd_disp block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="inv_qntd">
                                Quantidade Disponivel:
                            </label>
                            <input readOnly className="dark:text-white  dark:bg-gray-500 hidden form_fields_out_quantidade mr-1 appearance-none inline-block w-48 bg-gray-100 text-gray-700 border rounded py-1 px-3 mb-3 leading-tight focus:outline-none focus:bg-white text-sm" id="inv_qntd" type="text" placeholder="Quantidade em Estoque" />
                            <input readOnly className="dark:text-white dark:bg-gray-500 unidade_type mr-10 appearance-none inline-block w-20 bg-gray-100 text-gray-700 border  rounded py-1 px-3 mb-3 leading-tight focus:outline-none focus:bg-white text-sm" id="unidadeType" type="text" />
                       </div>
                     <div className="block">
                        <label className="dark:text-white  block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="qntd">
                            Quantidade:
                        </label>
                        <input required min="1" className="dark:text-white dark:bg-gray-500 quantidade_product mr-10 appearance-none block w-36 bg-gray-100 text-gray-700 border  rounded py-1 px-3 mb-3 leading-tight focus:outline-none focus:bg-white text-sm" id="qntd" type="number" placeholder="Quantidade" />
                        </div>
                     <div className="mr-10 inline-block relative w-64">
                         <label className="dark:text-white  block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="UnidadeP">
                             Unidade:
                         </label>
                         <select className="dark:text-white dark:bg-gray-500 unidade_select block appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
                              <option>-</option>
                              {renderUnidades(props.unidades)}
                         </select>
                         <div className="pointer-events-none absolute inset-y-0 top-3 right-0 flex items-center px-2 text-gray-700">
                             <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                         </div>
                     </div> 
                     <div className="inline-block relative w-64">
                         <label className="dark:text-white saida_para block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="UnidadeS">
                             SAIDA PARA: 
                         </label>
                         <select className="dark:text-white dark:bg-gray-500 display_sector_selected block appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
                             {renderSectors(props.sectors)}                            
                         </select>
                         <div className="pointer-events-none absolute inset-y-0 top-3 right-0 flex items-center px-2 text-gray-700">
                             <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                         </div>
                     </div> 
                     <div className="container_val_limit">
                         <div className="lg:absolute top-0 right-0">
                             <label className="dark:text-white label_val block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="val_limit">
                                 O produto possuí validade ou limite de utilização?                                
                             </label>
                             <select onChange={(e) => renderVal(e.target.value)} id="val_limit" className="dark:text-white val_limit dark:bg-gray-500 lg:float-right block appearance-none w-44 bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
                                 <option value={0}>---</option>
                                 <option value={1}>Validade</option>
                                 <option value={2}>Limite de utilização</option>
                                 <option value={3}>Ambos</option>
                                 <option value={4}>Não possui</option>
                             </select>
                            <input readOnly className="dark:text-white dark:bg-gray-500 appearance-none block w-32 float-right bg-gray-100 text-gray-700 border rounded py-1 px-2 mb-3 leading-tight dark:focus:bg-gray-500 focus:outline-none focus:bg-white text-sm" id="val_limit_out_util" type="text" />
                            <input readOnly className="dark:text-white dark:bg-gray-500 appearance-none block w-32 float-right bg-gray-100 text-gray-700 border rounded py-1 px-2 mb-3 leading-tight dark:focus:bg-gray-500 focus:outline-none focus:bg-white text-sm" id="val_limit_out" type="text" />
                         </div>
                         <div className="val_container hidden flex mt-3 lg:absolute top-16 right-0">
                             <div className="hidden val_div">
                                 <label className="dark:text-white  block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="validade">
                                     Data de Validade:
                                 </label>
                                 <input className="dark:text-white dark:bg-gray-500 mr-10 appearance-none  w-42 bg-gray-100 text-gray-700 border  rounded py-1 px-3 mb-3 leading-tight focus:outline-none focus:bg-white text-sm" id="validade" type="date" placeholder="Validade" />
                                 </div>
                             <div className="limit_div hidden">
                                 <label className="dark:text-white  block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="reprocessa">
                                     Limite de Utilização:
                                 </label>
                                 <input className="dark:text-white  dark:bg-gray-500 appearance-none w-42 bg-gray-100 text-gray-700 border  rounded py-1 px-3 mb-3 leading-tight focus:outline-none focus:bg-white text-sm" id="reprocessa" type="number" placeholder="Limite" />
                             </div>
                         </div>      
 
                     </div>
                     <div className="flex justify-start flex-wrap mt-3 mb-2">
                         <button onClick={()=> addList()} className="dark:bg-white dark:hover:bg-gray-400 dark:text-black bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline text-xs" type="button" > 
                             Adicionar
                         </button>     
                     </div>    
                     </div>
                 </div>  
                 <div className="flex justify-center flex-wrap mt-2 div_loading">

                 </div>
                 <div className="py-2">
                 <div className='overflow-x-auto h-52 w-full'>
                     <table className='mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
                         <thead className="bg-gray-900">
                             <tr className="text-white text-left">
                                 <th className="font-semibold text-sm uppercase px-4 py-2 text-center"> Código </th>
                                 <th className="font-semibold text-sm uppercase px-4 py-2 text-center"> Nome do Produto </th>
                                 <th className="font-semibold text-sm uppercase px-4 py-2 text-center"> Unidade </th>
                                 <th className="font-semibold text-sm uppercase px-4 py-2 text-center"> Quantidade </th>
                                 <th className="font-semibold text-sm uppercase px-4 py-2 text-center"> Lote </th>
                                 <th className="font-semibold text-sm uppercase px-4 py-2 text-center"> Origem </th>
                                 <th className="font-semibold text-sm uppercase px-4 py-2 text-center"> Limite </th>
                                 <th className="font-semibold text-sm uppercase px-4 py-2 text-center"> Validade </th>
                                 <th className="font-semibold text-sm uppercase px-4 py-2 text-center"> Excluir </th>
                             </tr>
                         </thead>
                         <tbody className="add_item_list h-20 divide-y divide-gray-200 text-center">                
                             
                         </tbody>
                     </table>
                 </div>
             </div>
                     <div className="flex justify-center flex-wrap mt-2 div_btn_finalizar">
                         <button onClick={()=>{
                            let display_out_in:any = document.querySelector(".display_out_in")
                            display_out_in.value == 'saida' ?
                              recDatabaseSystemInventory() : recDatabase()}
                              } className="hidden btn_set_in dark:bg-white dark:hover:bg-gray-400 dark:text-black bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-xs" type="button" > 
                             Salvar
                         </button>
                    </div>
             </form>
        )
       
       return arrForm
    }

    async function getEstoqueLocal(qntd= null,cod){
        const items = qntd === Cookies.get("setor") 
        ? await fetch( process.env.URL + "consults/getProductsEstoque", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({    
              setor: qntd,
              cod:cod
            })
        }) 
        : await fetch( process.env.URL + "consults/getMaxProductsEstoque",{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({    
              setor: qntd,
              cod:cod
            })
        }) 

        const responseItems = await items.json()
        
        return await responseItems
       
    }

    function renderVal(e){
        if(e == '0' && e == '4'){
            document.querySelector('.val_container').classList.add('hidden')
            return
        }

        document.querySelector('.val_container').classList.remove('hidden')
        
        if(e == '1'){
            document.querySelector('.val_div').classList.remove('hidden')
            document.querySelector('.val_div input').setAttribute("required","true")
            document.querySelector('.limit_div').classList.add('hidden')
            setValidad(true)
            setLimit(false)
        }else if(e == '2'){
            document.querySelector('.limit_div').classList.remove('hidden')
            document.querySelector('.val_div').classList.add('hidden')
            setLimit(true)
            setValidad(false)
        }else if(e == '3'){
            document.querySelector('.limit_div').classList.remove('hidden')
            document.querySelector('.val_div').classList.remove('hidden')
            setValidad(true)
            setLimit(true)
        }else{
            document.querySelector('.limit_div').classList.add('hidden')
            document.querySelector('.val_div').classList.add('hidden')
            setValidad(false)
            setLimit(false)
        }
        
      
    }

    function selectMvto(){
        const ItemsCar:any = document.querySelector(".add_item_list")
        const fieldCampo:any = document.querySelector(".quantidade_product ")
        document.querySelector(".btn_set_in").classList.add("hidden")
        ItemsCar.innerHTML = ''
        
        const elemento:any = document.querySelector(".display_out_in")
        clearFields()

        if(elemento.value === 'entrada'){
            document.querySelector(".form_fields").classList.remove("hidden")
            document.querySelector(".lote_product").classList.remove("hidden")
            document.querySelector(".display_register_product").classList.add("hidden")
            document.querySelector(".form_fields_out_quantidade").classList.add("hidden")
            document.querySelector(".qntd_disp").classList.add("hidden")
            document.querySelector(".lote_product_out").classList.add("hidden")
            document.querySelector(".saida_para").textContent = "Origem"
            document.querySelector("#val_limit_out").classList.add("hidden")
            document.querySelector("#val_limit_out_util").classList.add("hidden")
            document.querySelector(".label_val").textContent = "O PRODUTO POSSUÍ VALIDADE OU LIMITE DE UTILIZAÇÃO?" 
            document.querySelector("#val_limit").classList.remove("hidden")
            fieldCampo.setAttribute("max", ("9999"))      
        }
        else if(elemento.value === '---'){
            document.querySelector(".form_fields").classList.add("hidden")
            document.querySelector(".display_register_product").classList.add("hidden")
        }
        else if(elemento.value === 'saida'){
            document.querySelector(".form_fields").classList.remove("hidden")
            document.querySelector(".lote_product_out").classList.remove("hidden")
            document.querySelector(".display_register_product").classList.add("hidden")
            document.querySelector(".lote_product").classList.add("hidden")
            document.querySelector(".form_fields_out_quantidade").classList.remove("hidden")
            document.querySelector(".qntd_disp").classList.remove("hidden")
            document.querySelector(".saida_para").textContent = "Sainda Para"
            document.querySelector(".label_val").textContent = "Validade e Limite de utilização:"
            document.querySelector("#val_limit_out").classList.remove("hidden")
            document.querySelector("#val_limit_out_util").classList.remove("hidden")
            document.querySelector("#val_limit").classList.add("hidden")
         }
    }

    function clearFields(){
        let quantidade_product:any = document.querySelector(".quantidade_product")
        let unidade_select:any = document.querySelector(".unidade_select")
        let display_sector_selected:any =  document.querySelector(".display_sector_selected")
        let lote_product:any = document.querySelector(".lote_product")
        let form_fields_out_quantidade:any = document.querySelector(".form_fields_out_quantidade")
        let lote_product_out:any = document.querySelector(".lote_product_out")
        quantidade_product.value = ''
        unidade_select.value = '-'
        display_sector_selected.value = ''
        lote_product.value = ''
        form_fields_out_quantidade.value = ''
        lote_product_out.value = '---'

    }

    function hiddenForm(){
        document.querySelector(".display_register_product").classList.add("hidden")
        clearFields()
    }
    
    async function filterProduct(codigo: number | string){
        let userSelected: boolean
        const elemento:any = document.querySelector(".display_out_in")
        document.querySelector('.div_complete').removeAttribute("hidden")
        document.querySelector('.layout_background').addEventListener('click',hiddenDivComplete)   

        if(elemento.value == "saida"){
            var arrProduct:any = []
            var qntEstoque = await getEstoqueLocal('qntd',codigo)
            document.querySelector(".display_register_product").classList.add("hidden")  
            qntEstoque.forEach((product, i) =>{
                userSelected = product.DS_PRODUTO.indexOf(codigo) > -1    
                userSelected ? arrProduct.push(
                <p key={product?.CD_PRODUTO + product?.DS_PRODUTO + i} className={'hover:bg-blue-300'} 
                onClick={()=>completeField(product?.DS_PRODUTO, product?.CD_PRODUTO)}>
                    {product?.DS_PRODUTO}</p>) : null 
            }) 
        }else{

            var arrProduct:any = []
            document.querySelector(".display_register_product").classList.add("hidden")  
            props.productsMV.product.forEach((product) =>{
                userSelected = product.DS_PRODUTO.indexOf(codigo) > -1    
                userSelected ? arrProduct.push(
                <p key={product?.CD_PRODUTO} className={'hover:bg-blue-300'} 
                onClick={()=>completeField(product?.DS_PRODUTO, product?.CD_PRODUTO)}>
                    {product?.DS_PRODUTO}</p>) : null
            })            
        } 
        
        if(typeof codigo === 'string'){
            setProductComplete(arrProduct)            
        }
    }

    function hiddenDivComplete(){
        document.querySelector('.div_complete')?.setAttribute('hidden','true')
    }

    function completeField(name = " ",code = " "){
      let $fildNameProduct:any = document.querySelector(".product_name_search")
      let $code:any = document.querySelector(".product_code_search")
      $fildNameProduct.value = name
      $code.value = code
    }
    
    async function SearchFotCodeOrName(){
     
        let $codeNumber:any = document.querySelector(".product_code_search")
        const elemento:any = document.querySelector(".display_out_in")
        let form_fields_out:any = document.querySelector(".form_fields_out_quantidade")
        form_fields_out.value = ''

        if(elemento.value == "saida"){
            var qntEstoque = await getEstoqueLocal(Cookies.get("setor"),$codeNumber.value)  
        }    

        if(typeof parseInt($codeNumber.value) == "number"){
            var arrProduct = elemento.value == "saida" ? 
            qntEstoque.find(product => product.CD_PRODUTO == parseInt($codeNumber.value)) || undefined
            :
            props.productsMV.product.find(product => product.CD_PRODUTO == parseInt($codeNumber.value)) || undefined           
            

            setProductComplete(arrProduct?.DS_PRODUTO)
            completeField(arrProduct?.DS_PRODUTO, arrProduct?.CD_PRODUTO)
            renderLote(arrProduct?.CD_PRODUTO)
            
        }
        props.unidades.map(unid =>{
            if(unid.CD_PRODUTO == $codeNumber.value){
                document.querySelector("#unidadeType").setAttribute('value', unid.CD_UNIDADE)
            }            
        })
            let product_code_search:any = document.querySelector(".product_code_search")
            let product_name_search:any = document.querySelector(".product_name_search")
         if(product_code_search.value == '' || product_name_search.value == ''){
            setMsgErro(" - Nome ou código do produto inválidos!")
            document.querySelector("#erro_msg").classList.remove("hidden")
            setTimeout(()=>{
                document.querySelector("#erro_msg").classList.add("hidden")
            },3000)
            document.querySelector(".display_register_product").classList.add("hidden")
            return    
         }

        let $code:any = document.querySelector(".product_code_search")

        if($code.value.length > 0){            
                 

            document.querySelector('.display_register_product').classList.remove("hidden")
           
        }else{
            alert("Favor digita um nome ou código")
        }
    }   
    
    async function renderLote(cod){
        async function getQntEstoque(cod) {
            const responseQntd = await fetch(process.env.URL + "consults/getProductsEstoque",{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({    
                  cod: cod
                })
            })
            const qntEstoque = await responseQntd.json()
    
            return qntEstoque
        }

        let qntEstoque = await getQntEstoque(cod)
        document.querySelector(".lote_product_out").innerHTML = 
        `
        <option>---</option>            
        `
        let arrProduct:any = []
        qntEstoque?.forEach((product) =>{
            let parseCod = product.CD_PRODUTO.toString()
            let productResponse = parseCod.indexOf(cod) > -1

            
            if(productResponse){

                let verIfLoteExist = arrProduct.indexOf(product.LOTE.toString()) > -1

                if(!verIfLoteExist){
                    arrProduct.push(product.LOTE)
                  
                    document.querySelector(".lote_product_out").innerHTML += 
                    `
                    <option className="lote_option" value=${product.LOTE.indexOf(' ') > -1 ? product.LOTE.replace(' ', '_') : product.LOTE }>${product.LOTE}</option>            
                    `                    
                }
            }            
        })
    }

    async function contQntdRest(){
        const elemento:any = document.querySelector(".display_out_in")
        let productExist:boolean
        let arrQtdProduct:any = []
        let arrQtdOutsProduct:any = []
        let arrItemsCar:any = []
        const cd_product:any = document.querySelector(".product_code_search")
        if(document.querySelector(".lote_product_out").getAttribute('value') == '---'){
            document.querySelector("#val_limit_out").setAttribute('value', '')
            document.querySelector("#val_limit_out_util").setAttribute('value', '')
            return
        }

        if(elemento.value == 'saida'){
            async function getQntEstoque(cod) {
                const responseQntd = await fetch(process.env.URL + "consults/getProductsEstoque",{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({    
                      cod: cod
                    })
                })
                const qntEstoque = await responseQntd.json()
        
                return qntEstoque
            }
            let qntEstoque = await getQntEstoque(cd_product.value)

            qntEstoque?.forEach((prodQnt) =>{
                let parseCod = prodQnt.CD_PRODUTO.toString()
                let valLimitOut:any = document.querySelector("#val_limit_out")
                let valLimitOutUtil:any = document.querySelector("#val_limit_out_util")
                let lote_product_out:any = document.querySelector(".lote_product_out")
                let parseLote = prodQnt.LOTE?.indexOf(' ') > -1 ? prodQnt.LOTE.replace(' ', '_') : prodQnt.LOTE
                productExist = parseCod.indexOf(cd_product.value) > -1 && parseLote?.indexOf(lote_product_out.value) > -1
                productExist && +prodQnt.CD_PRODUTO == +cd_product.value && lote_product_out.value == parseLote ? arrQtdProduct.push(prodQnt.QUANTIDADE) : null 
                productExist && +prodQnt.CD_PRODUTO == +cd_product.value && lote_product_out.value == parseLote ? valLimitOut.value = `${prodQnt.DT_VALIDADE == null || prodQnt.DT_VALIDADE == '' || prodQnt.DT_VALIDADE == undefined ? "" : dateFormat(prodQnt.DT_VALIDADE == "" ? "" : prodQnt.DT_VALIDADE)}` : null
                productExist && +prodQnt.CD_PRODUTO == +cd_product.value && lote_product_out.value == parseLote ? (valLimitOutUtil.value = `${prodQnt.MAX_REPROCESSADO == 0 ? '' : prodQnt.MAX_REPROCESSADO}`) : null
            })            
                        
            props.productsOutsQntd?.forEach((prodOut) =>{
                let parseLote = prodOut.LOTE?.indexOf(' ') > -1 ? prodOut.LOTE.replace(' ', '_') : prodOut.LOTE
                let parseCod = prodOut.CD_PRODUTO.toString()
                let lote_product_out:any = document.querySelector(".lote_product_out")
                productExist = parseCod.indexOf(cd_product.value) > -1 && parseLote?.indexOf(lote_product_out.value) > -1
                /* productExist && +prodOut.CD_PRODUTO == +cd_product.value && prodOut.DATA_DEVOLUCAO != null ? arrQtdOutsProduct.push(prodOut.QUANTIDADE) : null  */
                parseCod.indexOf(cd_product.value) == 0 && lote_product_out.value == parseLote && lote_product_out.value == prodOut?.LOTE ? arrQtdOutsProduct.push(parseCod.indexOf(cd_product.value)) : null

            })    

            document.querySelectorAll(".cd_product")?.forEach((prodCar) =>{
                let lote_product_out:any = document.querySelector('.lote_product_out')
                let carAddLote = prodCar.parentNode.parentNode.parentNode.parentNode.querySelector(".loteCar").textContent.indexOf(' ') > -1 ?
                prodCar.parentNode.parentNode.parentNode.parentNode.querySelector(".loteCar").textContent.replace(' ', '_') :
                prodCar.parentNode.parentNode.parentNode.parentNode.querySelector(".loteCar").textContent

                if(lote_product_out.value == carAddLote){
                    let parseCod = prodCar?.textContent?.toString()
                    productExist = parseCod?.indexOf(cd_product.value) > -1    
                    productExist && +prodCar?.textContent == +cd_product.value ? arrItemsCar.push(prodCar?.getAttribute("qntdItems")) : null 

                }

            })         
    
            var qntTotalOut = arrQtdOutsProduct?.reduce(function(total, numero){
                return total + numero;
                }, 0);

            var qntTotal = arrQtdProduct?.reduce(function(total, numero){
                return total + numero;
                }, 0);

            var qntTotalItemsCar = arrItemsCar?.reduce(function(total, numero){
                return +total + +numero;
                }, 0);

            let qntdDisponivel = +qntTotal -  +qntTotalItemsCar
            let displayQntd:any = document.querySelector(".form_fields_out_quantidade")
            
            displayQntd.value = qntdDisponivel.toString()
            if(+qntTotal == 0){
                alert("O Produto Está Zerado no Estoque.")
                return
            }
            if(elemento.value == "saida"){
                let qntdTotalDisplay:any = document.querySelector(".quantidade_product")
                qntdTotalDisplay.setAttribute('max', qntdDisponivel)            
            }
            if(qntdDisponivel == 0){
                let qntdDisponivelDisplay:any = document.querySelector(".quantidade_product")
                qntdDisponivelDisplay.value = '0'
            }
        }        
    }

    function renderUnidades(unidades){
        let arrUnidades:any = []
        const cd_product:any = document.querySelector(".product_code_search")
        
        unidades?.map(unid => {
            arrUnidades.push(
                +cd_product?.value === +unid.CD_PRODUTO ? <option key={unid.DS_UNIDADE} value={unid.VL_FATOR}>{unid.DS_UNIDADE}</option> : null
            )
            
        })

        return arrUnidades
    }
    function renderSectors(Sectors){
        let arrSectors:any = []

        Sectors?.map(sector => {
            arrSectors.push(
                <option key={sector.CD_SETOR + sector.NM_SETOR} value={sector.CD_SETOR}>{sector.NM_SETOR}</option>
            )
        })

        return arrSectors
    }

    async function getCodItem(lote, codProduct){
        const response = await fetch("/api/get/getCodItem",{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({    
              lote: lote
            })
        })  
    }

    function addList(){
        document.querySelector(".btn_set_in").classList.remove("hidden")
        const cd_product:any = document.querySelector(".product_code_search")
        const ds_product:any = document.querySelector(".product_name_search")
        const mvtoQtd:any = document.querySelector(".quantidade_product")
        const cd_uni:any = document.querySelector(".unidade_select")
        const cd_origem:any = document.querySelector(".display_sector_selected")
        const mvtoTotal:any = +cd_uni.value * +mvtoQtd.value
        const qntdOut:any =  document.querySelector(".form_fields_out_quantidade")
        const typeMvto:any = document.querySelector(".display_out_in")
        const lote:any = typeMvto.value == "saida" ? document.querySelector(".lote_product_out") : document.querySelector(".lote_product")
        const valLimit:any = document.querySelector(".val_limit")
        const valLimitValue:any = document.querySelector(".limit_div input")
        const valLimitOut:any = document.querySelector("#val_limit_out")
        const valLimitValueOut:any = document.querySelector("#val_limit_out_util")
        const valValue:any = document.querySelector(".val_div input")
        
       
        if(typeMvto.value == "saida" && (+qntdOut.value < +mvtoTotal || qntdOut.value == 0)){
            setMsgErro(" - A Quantidade para saída não pode ser maior do que a quantidade existente no estoque")
            document.querySelector("#erro_msg").classList.remove("hidden")
            setTimeout(()=>{
                document.querySelector("#erro_msg").classList.add("hidden")
            },3200)
            return
        }
        if(typeMvto.value == "entrada" && (mvtoQtd.value == 0)){
            setMsgErro(" - A Quantidade para entrada tem que ser maior do que 0")
            document.querySelector("#erro_msg").classList.remove("hidden")
            setTimeout(()=>{
                document.querySelector("#erro_msg").classList.add("hidden")
            },3200)
            return
        }
        if(typeMvto.value == "saida" && (mvtoQtd.value < 1)){
            setMsgErro(" - A Quantidade para saída tem que ser maior do que 0")
            document.querySelector("#erro_msg").classList.remove("hidden")
            setTimeout(()=>{
                document.querySelector("#erro_msg").classList.add("hidden")
            },3200)
            return
        }
        if(lote.value == '' || lote.value == '---'){
            setMsgErro(" - É necessário informar o lote")
            document.querySelector("#erro_msg").classList.remove("hidden")
            setTimeout(()=>{
                document.querySelector("#erro_msg").classList.add("hidden")
            },3200)
            return
        }
        if(cd_product.value == "" || ds_product.value == "" || cd_origem.value == "" || mvtoQtd == "" || cd_uni.value == "-"){

                setMsgErro(" - Todos os campos devem ser preenchidos")
                document.querySelector("#erro_msg").classList.remove("hidden")
                setTimeout(()=>{
                    document.querySelector("#erro_msg").classList.add("hidden")
                },3200)

                   
             
            return
        }
        if(typeMvto.value == "entrada" && valLimit.value == '0' || (validad && valValue.value == '') || (limit && valLimitValue.value == '')){
            setMsgErro(" - Todos os campos devem ser preenchidos")
            document.querySelector("#erro_msg").classList.remove("hidden")
            setTimeout(()=>{
                document.querySelector("#erro_msg").classList.add("hidden")
            },3200)
            return
        }
     /*    if(typeMvto.value == "saida"){            
            const codItem = getCodItem(lote.value.indexOf('_') > -1 ? lote.value.replace('_', ' ') : lote.value,cd_product.value)
        } */

        const table = document.querySelector(".add_item_list")
        
        table.innerHTML += `
        <tr class="trCar">
            <td class="">
                <div class="">                            
                    <div>
                        <p qntdItems="${mvtoTotal}" class="cd_product">${cd_product.value}</p>
                    </div>
                </div>
            </td>
            <td class="">
                <p class="ds_product">${ds_product.value}</p>
            </td>
            <td class="cd_uni" value=${document.querySelector("#unidadeType").getAttribute('value')} unidade=${document.querySelector("#unidadeType").getAttribute('value')}>${document.querySelector("#unidadeType").getAttribute('value')}</td>
            <td class=" "> <span class="mvtoTotal text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full">${mvtoTotal}</span> </td>
            <td value=${lote.value.indexOf('_') > -1 ? lote.value.replace('_', ' ') : lote.value} class="loteCar">${lote.value.indexOf('_') > -1 ? lote.value.replace('_', ' ') : lote.value}</td>
            <td value=${cd_origem.value} class="cd_origem">${cd_origem.options[cd_origem.selectedIndex].text}</td>
            <td value=${typeMvto.value == "entrada" ? valLimitValue.value : valLimitValueOut} class="limitCar">${typeMvto.value == "entrada" ? valLimitValue.value : valLimitValueOut.value}</td>
            <td value=${typeMvto.value == "entrada" ? dateFormat(valValue.value) : valLimitOut.value} class="validadCar">${typeMvto.value == "entrada" ? (document.querySelector("#val_limit").getAttribute('value') == "4" ? '' : dateFormat(valValue.value)) : valLimitOut.value}</td>
            <td class="removeDevolution cursor-pointer text-center text-red-600 font-bold"> 
                Excluir     
          </td>    
        </tr>
        `
        for(let i = 0; i < document.querySelectorAll(".removeDevolution")?.length; i++){
            document.querySelectorAll(".trCar")[i]?.querySelector(".removeDevolution")?.addEventListener("click", (e)=>{
                let targetValue:any = e.target
                targetValue.parentNode.remove()
                /* document.querySelectorAll(".trCar")[i]?.remove() */
                    hiddenForm()
                    if(document.querySelectorAll(".removeDevolution").length == 0){
                        document.querySelector(".btn_set_in").classList.add("hidden")
                    }
            })
        }
        
        qntdOut.value -= +mvtoTotal
        contQntdRest()
                
    }

    async function recDatabase(){
        const cd_product:any = document.querySelectorAll(".cd_product")
        const ds_product:any = document.querySelectorAll(".ds_product")
        const loteCar:any = document.querySelectorAll(".loteCar")
        const cd_uni:any = document.querySelectorAll(".cd_uni")
        const cd_origem:any = document.querySelectorAll(".cd_origem")
        const mvtoTotal:any = document.querySelectorAll(".mvtoTotal")   
        const valid:any = document.querySelectorAll(".validadCar")   
        const limit:any = document.querySelectorAll(".limitCar")   
        class ProductSaida{
            cd_mvto: number
            cd_product:string
            ds_product:string
            mvtoTotal:string
            cd_uni:string
            cd_lote:string
            valid:string
            limit:string
            cd_origem:string
            saida:boolean
            setorEstoque: string
            constructor(cd_mvto:number,
                 cd_product:string,
                 ds_product:string,
                 mvtoTotal:string,
                 cd_uni:string,
                 cd_lote:string,
                 valid:string,
                 limit:string,
                 cd_origem:string,
                 saida:boolean,
                 setorEstoque:string)
                {
                this.cd_mvto = cd_mvto,
                this.cd_product = cd_product,
                this.ds_product = ds_product,
                this.mvtoTotal = mvtoTotal,
                this.cd_uni = cd_uni,
                this.cd_lote = cd_lote,
                this.valid = valid,
                this.limit = limit,
                this.cd_origem = cd_origem,
                this.saida = saida,
                this.setorEstoque = setorEstoque
            }
        }
        
        let arrObject = []
        /* cd_product.length */
        let cd_mvto:any = Date.now() - 1000000000000
        let cd_lote:any = loteCar
        for(let i = 0; i < cd_product.length; i++){
            let ProductS = await new ProductSaida(cd_mvto,cd_product[i]?.textContent,
                ds_product[i]?.textContent,
                mvtoTotal[i]?.textContent,
                cd_uni[i]?.getAttribute("value"),
                loteCar[i]?.textContent,
                valid[i]?.textContent,
                limit[i]?.textContent,
                cd_origem[i]?.getAttribute("value"),
                undefined,
                Cookies.get("setor"))
            
            arrObject.push(ProductS)     
            
        }  
        await recOut(arrObject,undefined) 
        
    }


    async function rec(cd_mvto,cd_product,ds_product,mvtoTotal,cd_uni,loteCar,valid, limit,cd_estoque,saida = undefined){
       
            var response = await fetch("/api/set/setProduct",{
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({    
                  saida: saida,            
                  cd_mvto: cd_mvto,
                  cd_product: cd_product,
                  ds_product: ds_product,
                  mvtoTotal: mvtoTotal,
                  cd_uni: cd_uni,
                  cd_lote: loteCar,
                  cd_estoque: cd_estoque,
                  dt_validade: valid == '' || valid == undefined || valid == null ? null : convertDate(valid),
                  val_reprocess: limit,
                  user: Cookies.get('usuario'),
                  setor: Cookies.get("setor")
                })
            })  
        

        const responseItems = await response.json()

        if(responseItems){
            setMsgSucess(" - à Operação Foi Salva!")
            document.querySelector("#sucess_msg")?.classList.remove("hidden")
            document.querySelector(".display_register_product")?.classList.add("hidden")
            setTimeout(()=>{
                router.push('/')               
            }, 800)
        }else{
            let conf = confirm("Houve um erro ao realizar operação, à página será recarregada")
            if(conf){
                setTimeout(()=>{
                    window.location.reload()
                }, 300)
            }else{
                setTimeout(()=>{
                    window.location.reload()
                }, 300)
            }
        }
    }    

    async function recDatabaseSystemInventory(){
        document.querySelector(".div_btn_finalizar").innerHTML = ``
        document.querySelector(".div_loading").innerHTML = `<img class='w-28 h-28' src='images/loading.gif' />`
        const cd_product:any = document.querySelectorAll(".cd_product")
        const ds_product:any = document.querySelectorAll(".ds_product")
        const cd_uni:any = document.querySelectorAll(".cd_uni")
        const cd_origem:any = document.querySelectorAll(".cd_origem")
        const loteCar:any = document.querySelectorAll(".loteCar")
        const mvtoTotal:any = document.querySelectorAll(".mvtoTotal")
        const saida = true
        const valid:any = document.querySelectorAll(".validadCar")   
        const limit:any = document.querySelectorAll(".limitCar")   

         class ProductSaida{
            cd_mvto: number
            cd_product:string
            ds_product:string
            mvtoTotal:string
            cd_uni:string
            cd_lote:string
            valid:string
            limit:string
            cd_origem:string
            saida:boolean
            setorEstoque: string
            constructor(cd_mvto:number,
                 cd_product:string,
                 ds_product:string,
                 mvtoTotal:string,
                 cd_uni:string,
                 cd_lote:string,
                 valid:string,
                 limit:string,
                 cd_origem:string,
                 saida:boolean,
                 setorEstoque:string)
                {
                this.cd_mvto = cd_mvto,
                this.cd_product = cd_product,
                this.ds_product = ds_product,
                this.mvtoTotal = mvtoTotal,
                this.cd_uni = cd_uni,
                this.cd_lote = cd_lote,
                this.valid = valid,
                this.limit = limit,
                this.cd_origem = cd_origem,
                this.saida = saida,
                this.setorEstoque = setorEstoque
            }
        }
        
        let arrObject = []
        /* cd_product.length */
        let cd_mvto:any = Date.now() - 1000000000000
        let cd_lote:any = loteCar
        for(let i = 0; i < cd_product.length; i++){
            let ProductS = await new ProductSaida(cd_mvto,cd_product[i]?.textContent,
                ds_product[i]?.textContent,
                mvtoTotal[i]?.textContent,
                cd_uni[i]?.getAttribute("value"),
                cd_lote[i]?.textContent,
                valid[i]?.textContent,
                limit[i]?.textContent,
                cd_origem[i]?.getAttribute("value"),
                true,
                Cookies.get("setor"))
            
            arrObject.push(ProductS)
            
      

            
            
        }  
        await recOut(arrObject,true) 
    }

    async function recOut(ProductSaida,saida) {
        var response = await fetch("/api/set/setProduct",{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({    
                saida:saida,
                user: Cookies.get('usuario'),
                ProductSaida,
                data: convertDate()
            })
        }) 
        const responseItems = await response.json()

        if(responseItems){
            setMsgSucess(" - à Operação Foi Salva!")
            document.querySelector("#sucess_msg")?.classList.remove("hidden")
            document.querySelector(".display_register_product")?.classList.add("hidden")
            setTimeout(()=>{
                router.push('/')               
            }, 800)
        }else{
            let conf = confirm("Houve um erro ao realizar operação, à página será recarregada")
            if(conf){
                setTimeout(()=>{
                    window.location.reload()
                }, 300)
            }else{
                setTimeout(()=>{
                    window.location.reload()
                }, 300)
            }
        }
    }

    return(
        <div className="flex justify-center">
            <div className="w-full">
                {renderForm()}
            </div>            
        </div>
    )
}