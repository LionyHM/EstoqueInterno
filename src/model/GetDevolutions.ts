import { databaseMysql } from "../database/Mysql/Db";
import { database } from "../database/OracleDb/Db";

export default class GetDevolutions{
    async getDevolutionsDatabase(){
        let consult = await databaseMysql.distinct("SETOR")
                                        .select("SETOR")
                                        .whereNull("DATA_DEVOLUCAO")
                                        .table("saidas_estoque")


        for(let i = 0; i < consult.length; i++){
            
            let consultEstoque = await database.select("NM_SETOR").where("CD_SETOR", "=", +consult[i].SETOR).table("SETOR")
            consult[i].CD_SETOR = consult[i].SETOR
            consult[i].SETOR = consultEstoque[0].NM_SETOR
        
        }

        return consult
    }
}