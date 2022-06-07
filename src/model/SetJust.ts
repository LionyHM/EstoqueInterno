import { databaseMysql } from "../database/Mysql/Db";
import { database } from "../database/OracleDb/Db";
import convertDate from "../functions/convertDate";

export default class SetJust{
    async setJust(produto, setor, produtoQntd, cateJust, justif, codJust, justCdSetor,lote, unidade,usuario,setorEstoque){
        var hasProductJust:any = ''
        if(justCdSetor != setorEstoque){
            hasProductJust = await databaseMysql.select('*').where("CD_PRODUTO", "=",+codJust).whereNull("DATA_DEVOLUCAO").table("saidas_estoque")
        }else{
            hasProductJust = [{true: true}]
        }
        
        if(hasProductJust.length > 0){   
        
            if(!isNaN(setor)){
                const dadosSectors = await database.select("CD_SETOR", "NM_SETOR").table("SETOR")
                
                await dadosSectors.map(sector =>{
                    setor == sector.CD_SETOR ? setor = sector.NM_SETOR : null
                }) 
            }
            if(isNaN(justCdSetor)){
                const dadosSectors = await database.select("CD_SETOR", "NM_SETOR").table("SETOR")

                await dadosSectors.map(sector =>{
                    justCdSetor == sector.NM_SETOR ? justCdSetor = sector.CD_SETOR : null
                }) 
            }
            let cdsetor = justCdSetor            
                          
               try {
                    let totalQntd = +produtoQntd 
                    var prodEstoque = await databaseMysql.select("CD_SAIDA","CD_MVTO","DATA_SAIDA","DATA_DEVOLUCAO","CD_ESTOQUE","QUANTIDADE" )
                                            .where("LOTE","=",lote)
                                            .andWhere("CD_PRODUTO","=",parseInt(codJust))
                                            .andWhere("SETOR","=",cdsetor)
                                            .andWhere("ATIVO","=","S")
                                            .whereNull("DATA_DEVOLUCAO")
                                            .table("saidas_estoque")
                    for(let i = 0; i < prodEstoque.length; i++){
                        console.log(i)
                        if(prodEstoque[i].QUANTIDADE >= 0){
                            if(+produtoQntd ==  prodEstoque[i].QUANTIDADE){
                                await databaseMysql
                                    .update({DATA_DEVOLUCAO: convertDate(), ATIVO: "N"})
                                    .where({CD_SAIDA: prodEstoque[i].CD_SAIDA})
                                    .andWhere({ATIVO: "S"})
                                    .table("saidas_estoque")  
                                    
                                    await databaseMysql.raw("INSERT INTO baixa_estoque (CD_PRODUTO, CD_MVTO, CD_ESTOQUE, DS_PRODUTO, LOTE,UNIDADE,QUANTIDADE, CATEGORIA, DESCRICAO, CD_SETOR, SETOR, USUARIO_CRIACAO, ESTOQUE ,DATA_CRIACAO, DATA_PRODUTO) VALUES ('" + parseInt(codJust) + "','"+ prodEstoque[0].CD_MVTO + "','" + prodEstoque[0].CD_ESTOQUE + "','"  + produto + "','" + lote + "','" + unidade + "','" + totalQntd + "','" + cateJust + "','" + justif + "','" + cdsetor + "','"  + setor + "','" + usuario + "','" + setorEstoque  + "','"  + convertDate() + "','" + prodEstoque[0].DATA_SAIDA + "'" + ")")

                                    return true
                            }else if(+produtoQntd > prodEstoque[i].QUANTIDADE){
                                await databaseMysql
                                    .update({DATA_DEVOLUCAO: convertDate(), ATIVO: "N"})
                                    .where({CD_SAIDA: prodEstoque[i].CD_SAIDA})
                                    .andWhere({ATIVO: "S"})
                                    .table("saidas_estoque")

                                    await databaseMysql.raw("INSERT INTO baixa_estoque (CD_PRODUTO, CD_MVTO, CD_ESTOQUE, DS_PRODUTO, LOTE,UNIDADE,QUANTIDADE, CATEGORIA, DESCRICAO, CD_SETOR, SETOR, USUARIO_CRIACAO, ESTOQUE ,DATA_CRIACAO, DATA_PRODUTO) VALUES ('" + parseInt(codJust) + "','"+ prodEstoque[0].CD_MVTO + "','" + prodEstoque[0].CD_ESTOQUE + "','"  + produto + "','" + lote + "','" + unidade + "','" + prodEstoque[i].QUANTIDADE + "','" + cateJust + "','" + justif + "','" + cdsetor + "','"  + setor + "','" + usuario + "','" + setorEstoque  + "','"  + convertDate() + "','" + prodEstoque[0].DATA_SAIDA + "'" + ")")

                                produtoQntd =  +produtoQntd - prodEstoque[i].QUANTIDADE

                                while(+produtoQntd != 0){

                                    var prodEstoqueNext = await databaseMysql.select("CD_SAIDA","CD_MVTO","CD_ESTOQUE","QUANTIDADE","DATA_SAIDA","DATA_DEVOLUCAO" )
                                    .where("LOTE","=",lote)
                                    .andWhere("CD_PRODUTO","=",parseInt(codJust))
                                    .andWhere("SETOR","=",cdsetor)
                                    .andWhere("ATIVO","=","S")
                                    .andWhere("CD_SAIDA","!=",prodEstoque[i].CD_SAIDA)
                                    .whereNull("DATA_DEVOLUCAO")
                                    .table("saidas_estoque")
                                    
                                    if(produtoQntd == prodEstoqueNext[0].QUANTIDADE){
                                                    await databaseMysql
                                                    .update({DATA_DEVOLUCAO: convertDate(), ATIVO: "N"})
                                                    .where({CD_SAIDA: prodEstoqueNext[0].CD_SAIDA})
                                                    .andWhere({ATIVO: "S"})
                                                    .table("saidas_estoque")

                                        await databaseMysql.raw("INSERT INTO baixa_estoque (CD_PRODUTO, CD_MVTO, CD_ESTOQUE, DS_PRODUTO, LOTE,UNIDADE,QUANTIDADE, CATEGORIA, DESCRICAO, CD_SETOR, SETOR, USUARIO_CRIACAO, ESTOQUE ,DATA_CRIACAO, DATA_PRODUTO) VALUES ('" + parseInt(codJust) + "','"+ prodEstoqueNext[0].CD_MVTO + "','" + prodEstoqueNext[0].CD_ESTOQUE + "','"  + produto + "','" + lote + "','" + unidade + "','" + produtoQntd + "','" + cateJust + "','" + justif + "','" + cdsetor + "','"  + setor + "','" + usuario + "','" + setorEstoque  + "','"  + convertDate() + "','" + prodEstoqueNext[0].DATA_SAIDA + "'" + ")")

                                        return true

                                    }
                                                    
                                                    

                                    produtoQntd =  +produtoQntd - prodEstoqueNext[0].QUANTIDADE        
                                        
                                         if(+produtoQntd < prodEstoqueNext[0].QUANTIDADE){
                                            await databaseMysql
                                            .update({DATA_DEVOLUCAO: convertDate(), ATIVO: "N"})
                                            .where({CD_SAIDA: prodEstoqueNext[0].CD_SAIDA})
                                            .andWhere({ATIVO: "S"})
                                            .table("saidas_estoque")


/*                                             await databaseMysql.insert({CD_PRODUTO: +codJust,
                                                CD_ESTOQUE: prodEstoqueNext[0].CD_ESTOQUE,
                                                CD_MVTO: prodEstoqueNext[0].CD_MVTO,
                                                DS_PRODUTO: produto,
                                                LOTE: lote,
                                                UNIDADE: unidade,
                                                QUANTIDADE: +produtoQntd < 0 ? +produtoQntd * -1 : +produtoQntd,
                                                ORIGEM: setorEstoque,
                                                SETOR: justCdSetor,
                                                DT_VALIDADE: null,
                                                DATA_SAIDA: convertDate(),
                                                USUARIO_RECEPTOR: usuario,
                                                ATIVO: "S"
                                              })
                                            .table("saidas_estoque")
     */
                                            await databaseMysql.raw("INSERT INTO baixa_estoque (CD_PRODUTO, CD_MVTO, CD_ESTOQUE, DS_PRODUTO, LOTE,UNIDADE,QUANTIDADE, CATEGORIA, DESCRICAO, CD_SETOR, SETOR, USUARIO_CRIACAO, ESTOQUE ,DATA_CRIACAO, DATA_PRODUTO) VALUES ('" + parseInt(codJust) + "','"+ prodEstoqueNext[0].CD_MVTO + "','" + prodEstoqueNext[0].CD_ESTOQUE + "','"  + produto + "','" + lote + "','" + unidade + "','" + (+produtoQntd < 0 ? +produtoQntd * -1 : +produtoQntd) + "','" + cateJust + "','" + justif + "','" + cdsetor + "','"  + setor + "','" + usuario + "','" + setorEstoque  + "','"  + convertDate() + "','" + prodEstoqueNext[0].DATA_SAIDA + "'" + ")")
  
                                             break    
                                            
                                        } else if(+produtoQntd >= prodEstoqueNext[0].QUANTIDADE){
                                            await databaseMysql
                                            .update({DATA_DEVOLUCAO: convertDate(), ATIVO: "N"})
                                            .where({CD_SAIDA: prodEstoqueNext[0].CD_SAIDA})
                                            .andWhere({ATIVO: "S"})
                                            .table("saidas_estoque")
    
                                            
                                        }  
                                        
                                        if(+produtoQntd <= 0){
                                            return true
                                        }

                                }





                            }
                            
                        }
                        /* await databaseMysql.insert({CD_PRODUTO: +codJust,
                            CD_ESTOQUE: Date.now() - 1000000000000,
                            DS_PRODUTO: produto,
                            LOTE: lote,
                            UNIDADE: 'xxx',
                            QUANTIDADE: +produtoQntd,
                            ORIGEM: setorEstoque,
                            SETOR: justCdSetor,
                            DT_VALIDADE: null,
                            DATA_SAIDA: convertDate(),
                            USUARIO_RECEPTOR: usuario,
                            ATIVO: "S"
                          })
               .table("saida_estoque") */
                    }                                            
                    
                } catch (error) {
                    console.log("Houve um erro ao selecionar produto no estoque para remoção: " + error)
                }
            try {
                   
                   /*  try {
                        await databaseMysql.update({ATIVO: "N", DATA_DEVOLUCAO: convertDate()}).where("CD_PRODUTO", "=", parseInt(codJust)).whereNull("DATA_DEVOLUCAO").andWhere("LOTE","=", lote).andWhere("ATIVO","=", "S").andWhere("SETOR","=", justCdSetor).limit("1").table("saidas_estoque")
                    } catch (error) {
                        console.log("Houve um erro ao realizar à baixa na saída do estoque: " + error)
                    } */
                    
            
            } catch (error) {
                console.log("Houve um erro ao realizar à criação da baixa: " + error)
            }               
                
            
      
     
        

            return true
        }
        return false
    }



    
}