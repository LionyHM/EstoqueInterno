import { databaseMysql } from "../database/Mysql/Db";
import convertDate from "../functions/convertDate";

export default class SetDevolution{
    async setDateDevolution(cdSaida, setor,quantidade,lote,setorEstoque){

        /* let product = await databaseMysql.select("CD_PRODUTO").where("DS_PRODUTO", "=", cdSaida).limit("1").table("saidas_estoque") */
     /*    for(let i = 0; i < quantidade; i++){
            await databaseMysql.insert({CD_MVTO: 0, LOTE: 0, CD_PRODUTO: product[0].CD_PRODUTO, DS_PRODUTO: cdSaida,DT_CRIACAO: convertDate(),DT_ATUALIZACAO: convertDate(), UNIDADE: "UN", QUANTIDADE: 1}).table("estoque")

        } */
        console.log(cdSaida + ' - ' + setor + ' - ' + quantidade + ' - ' + lote + ' - ' + setorEstoque)
        
       try {
            try {
                await databaseMysql.update({DATA_DEVOLUCAO: convertDate()}).where("CD_PRODUTO","=",+cdSaida).whereNull("DATA_DEVOLUCAO").andWhere("SETOR","=", parseInt(setor)).andWhere("LOTE","=",lote).limit(+quantidade).table("saidas_estoque")
            } catch (error) {
                console.log("Houve um erro ao atualizar devolucao na tabela")
            }
            try {
                await databaseMysql.update({SETOR: +setorEstoque}).where("CD_PRODUTO","=",+cdSaida).andWhere("LOTE","=",lote).andWhere("SETOR", "=" , setor).limit(+quantidade).table("estoque")
                return true
                
            } catch (error) {
             console.log("Houve umerro ao atualizar o setor de estoque no estoque: " + error)
            }
       } catch (error) {
           console.log("Houve um erro ao atualizar data de devolucao no estoque de saida: " + error)
       }

    }



    
}