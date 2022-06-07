import React from "react";
import Cookies from "js-cookie";
import convertDateBr from "../../functions/convertDateBr"

export default function Modal(props) {
    const [showModal, setShowModal] = React.useState(false);
    
    async function setProductStorage(){
        const cd_mvto = props.codeBatch
        const cd_product = document.querySelectorAll(".ProductCD")
        const ds_product = document.querySelectorAll(".productDS")
        const mvtoTotal = document.querySelectorAll(".MtoQTdTotal")
        const mvtoQtd = document.querySelectorAll(".MvtoQtd")
        const cd_uni = document.querySelectorAll(".UniCD")
        const cd_lote = document.querySelectorAll(".LoteCD")
        const cd_estoque = document.querySelectorAll(".EstoqueCD")
        const val_reprocess = document.querySelectorAll(".ReprocessadoVL")
        const ValidadeDt = document.querySelectorAll(".ValidadeDt")

        for(let x = 0; x < document.querySelectorAll(".requiredField").length; x++){
          if(document.querySelectorAll(".requiredField")[x].getAttribute('value') < '1' || document.querySelectorAll(".requiredField")[x].getAttribute('value') == ""){
            alert("Favor preencher as quantidades de vezes que o produto poderá ser movimentado." )
            return
          } 
        }
        for(let x = 0; x < document.querySelectorAll(".val_reprocess").length; x++){
          let valR:any = document.querySelectorAll(".val_reprocess")[x]
          if( valR.options[valR.selectedIndex].value == "---")
         {
            alert("Favor informar se o produto terá quantidade maxima de movimentação, selecione a opção 'Sim' ou 'Não'" )
            return
          } 
        }

        let consultMvto = await fetch("/api/consults/consultMvtoExist",{
          method: "POST",
          headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({                
              codeBatch: cd_mvto
            })
        })

        let responseConsultMvto = await consultMvto.json()

        if(responseConsultMvto == false){
            alert("Essa movimentação já foi importada por outro usuário, à página será recarregada")
            window.location.reload()
            return
        }else{
          document.querySelector(".menu_lateral ul").classList.add("hidden")
          document.querySelectorAll(".menu_lateral ul")[1].classList.add("hidden")
          document.querySelector(".btn_div").classList.add("hidden")

          class ProductEntrada{
            cd_mvto: number
            cd_product:string
            ds_product:string
            mvtoTotal:string
            cd_uni:string
            cd_lote:string
            cd_origem:string
            dt_validade:string
            limit:string
            saida:boolean
            setorEstoque: string
            constructor(cd_mvto:number,
                 cd_product:string,
                 ds_product:string,
                 mvtoTotal:string,
                 cd_uni:string,
                 cd_lote:string,
                 cd_origem:string,
                 dt_validade:string,
                 limit:string,
                 saida:boolean,
                 setorEstoque:string)
                {
                this.cd_mvto = cd_mvto,
                this.cd_product = cd_product,
                this.ds_product = ds_product,
                this.mvtoTotal = mvtoTotal,
                this.cd_uni = cd_uni,
                this.cd_lote = cd_lote,
                this.cd_origem = cd_origem,
                this.dt_validade = dt_validade,
                this.limit = limit,
                this.saida = saida,
                this.setorEstoque = setorEstoque
            }
          }
        
          let arrObject = []
          

          for(let i = 0; i < cd_product.length; i++){
              let ProductS = await new ProductEntrada(cd_mvto,cd_product[i]?.getAttribute("value"),
                  ds_product[i]?.getAttribute("value"),
                  mvtoTotal[i]?.getAttribute("value"),
                  cd_uni[i]?.getAttribute("value"),
                  cd_lote[i]?.getAttribute("value"),
                  cd_estoque[i]?.getAttribute("value"),
                  ValidadeDt[i]?.getAttribute("value"),
                  val_reprocess[i]?.getAttribute('value'),
                  undefined,
                  Cookies.get("setor"))
              
              arrObject.push(ProductS)     





           /*  await rec(cd_mvto,cd_product[i]?.getAttribute("value"),
            ds_product[i]?.getAttribute("value"),mvtoTotal[i].getAttribute("value")
            ,mvtoQtd[i]?.getAttribute("value"),
            cd_uni[i]?.getAttribute("value"),cd_lote[i]?.getAttribute("value"),
            cd_estoque[i]?.getAttribute("value"), ValidadeDt[i]?.getAttribute("value"),
            val_reprocess[i]?.value
            ) */

            document.querySelector(".layout_background").innerHTML = `<div class="flex h-32 justify-center mt-52 items-center bg-gray-800 text-white text-sm font-bold px-4 py-3" role="alert">
            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
              <p>Sua importação está sendo processada, favor aguardar.</p>
            </div>`
             
          }        
          
         /*  document.querySelector(".layout_background").innerHTML = `<div class="flex h-32 justify-center mt-52 items-center bg-gray-800 text-white text-sm font-bold px-4 py-3" role="alert">
            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
              <p>Sua importação está sendo processada, favor aguardar.</p>
            </div>` */

          await recOut(arrObject,undefined) 
         /*  document.querySelector(".layout_background").innerHTML = `<div class="flex h-32 justify-center mt-52 items-center bg-green-600 text-white text-sm font-bold px-4 py-3" role="alert">
          <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
              <p>Importação realizada com sucesso!, iremos atualizar suas informações.</p>
          </div>` */
       
        }
        
       
    }

    async function recOut(ProductSaida,saida) {
      var response = await fetch("/api/set/setProduct",{
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({    
              saida:saida,
              user: Cookies.get('usuario'),
              ProductSaida
          })
      }) 
      const responseItems = await response.json()

      if(responseItems){
        document.querySelector(".layout_background").innerHTML = `<div class="flex h-32 justify-center mt-52 items-center bg-green-600 text-white text-sm font-bold px-4 py-3" role="alert">
          <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
              <p>Importação realizada com sucesso!, iremos atualizar suas informações.</p>
          </div>`

          setTimeout(() => {
            window.location.reload()
          }, 5000);
      }
    }


    
      
    


     async function rec(cd_mvto,cd_product,ds_product,mvtoTotal,mvtoQtd,cd_uni,cd_lote, cd_estoque, dt_validade, val_reprocess){
           let responde = await fetch("/api/set/setProduct",{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({                
              cd_mvto: cd_mvto,
              cd_product: cd_product,
              ds_product: ds_product,
              mvtoTotal: mvtoTotal,
              mvtoQtd: mvtoQtd,
              cd_uni: cd_uni,
              cd_lote: cd_lote,
              cd_estoque: cd_estoque,
              dt_validade: dt_validade  == "Sem Validade" ? null : dt_validade,
              val_reprocess: val_reprocess || null,
              user: Cookies.get('usuario'),
              setor: Cookies.get('setor')
            })
            
        })          
    }
    async function getProducts(){
            await fetch('/api/consults/consultMvto',{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({                
                'codeBatch': props.codeBatch 
            })
        }).then(
            async function res(response) {
                let product = await response.json()
                product.forEach((p,i) => {                    
                document.querySelector("#display_product").insertAdjacentHTML("afterbegin", `
                    <div style="margin-top: 20px;">
                        <h2 value="${p.DS_PRODUTO}" class="productDS"><strong style="color: black">Produto:</strong> ${p.DS_PRODUTO}</h2>
                        <h2 value="${p.HR_MVTO_ESTOQUE}" class="dtMovimentacao"><strong style="color: black">Data da Movimentação:</strong> ${convertDateBr(p.HR_MVTO_ESTOQUE)}</h2>
                        <h2 value="${p.QT_MOVIMENTACAO * p.VL_FATOR}" class="MtoQTdTotal"><strong style="color: black">Quantidade:</strong> ${p.QT_MOVIMENTACAO * p.VL_FATOR}</h2>
                        <h2 value="${p.CD_UNIDADE}" class="UniCD"><strong style="color: black">Unidade:</strong> ${p.CD_UNIDADE}</h2>
                        <h2 value="${p.QT_MOVIMENTACAO}" class="MvtoQtd"><strong style="color: black">Descrição da Unidade:</strong> ${p.QT_MOVIMENTACAO} ${p.DS_UNIDADE}</h2>
                        <h2 value="${p.CD_PRODUTO}" class="ProductCD"><strong style="color: black">Códido do Produto:</strong> ${p.CD_PRODUTO}</h2>
                        <h2 value="${p.CD_LOTE}" class="LoteCD"><strong style="color: black">Lote do Produto:</strong> ${p.CD_LOTE != null ? p.CD_LOTE : "S.L"}</h2>
                        <h2 value="${p.DT_VALIDADE}" class="ValidadeDt"><strong style="color: black">Validade do Produto:</strong> ${p.DT_VALIDADE != null ? `${p.DT_VALIDADE.slice(8,10)}/${p.DT_VALIDADE.slice(5,7)}/${p.DT_VALIDADE.slice(0,4)}` : "Sem Validade"}</h2>
                        <label><strong style="color: black">O produto terá quantidade máxima de movimentações?</strong>
                          <select class="ml-4 border border-black rounded val_reprocess"}>
                          <option>Não</option>
                          <option>Sim</option>
                          <option>---</option>
                          </select>
                        </label>
                        <h2 value="${p.CD_ESTOQUE}" class="hidden EstoqueCD"><strong style="color: black">Estoque:</strong> ${p.CD_ESTOQUE}</h2>
                        <div class="val_reprocess_qntd">
                            <label class="block ReprocessadoVL_label hidden">
                            <strong style="color: black">Quantidade de vezes:</strong>
                              <input type="number" class="text-center ReprocessadoVL w-20 border border-black rounded" min="0" />
                            </label>
                          </div>
                    </div>
                    `)
                })

                  for(let i = 0; i < document.querySelectorAll(".val_reprocess").length; i++){
                   let element:any = document.querySelectorAll(".val_reprocess")
                   element[i].addEventListener("change",()=>{
                    if(element[i].options[element[i].selectedIndex].value == "Sim"){
                      document.querySelectorAll(".val_reprocess_qntd .ReprocessadoVL_label")[i].classList.remove("hidden")
                      document.querySelectorAll(".val_reprocess_qntd .ReprocessadoVL")[i].classList.add("requiredField")
                    }else{
                      document.querySelectorAll(".val_reprocess_qntd .ReprocessadoVL_label")[i].classList.add("hidden")
                      document.querySelectorAll(".val_reprocess_qntd .ReprocessadoVL")[i].classList.remove("requiredField")
                    }
                   })
                 }
                } 
                )                    
              }       
              

    return (        
      <>
        <button
          className="hover:bg-black hover:text-white text-sm xl:text-xl text-black dark:text-white active:bg-pink-600 font-bold uppercase px-6 py-3 rounded shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() =>{ 
            setShowModal(true)
             getProducts()}
            }

        >
          {props.codeBatch}
        </button>
        {showModal ? (
          <>
            <div
              className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-xl text-black font-semibold">
                      Código da Movimentação: <strong className="text-gray-700">{props.codeBatch}</strong>
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div id="display_product" className="relative p-6 flex-auto text-sm text-gray-700">
                    
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b btn_div">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Fechar
                    </button>
                    <button
                      className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={()=>{
                       setProductStorage()

                      }
                    }                      
                          
                    >
                      Importar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );
  }