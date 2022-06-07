import { database } from "../database/OracleDb/Db";
import { databaseMysql } from "../database/Mysql/Db";
import IGetSectors from "./Interface/IGetSectors";

export default class GetSectors implements IGetSectors{
    async getSectors(): Promise<object> {
        try {
            let consult = await database.select("CD_SETOR", "NM_SETOR")
                                        .where("SN_ATIVO", "=", "S")
                                        .whereNot("NM_SETOR","like","AEBES%")
                                        .table("SETOR")
                                        .orderBy("NM_SETOR", "asc")

            return consult
        } catch (error) {
            console.error("Houve um erro ao buscar setores no banco")
        }
    }
    async getSectorsEstoque(): Promise<object> {
        try {
            let consult = await databaseMysql.select("SETOR")
                                        .where("ATIVO", "=", "S")
                                        .table("estoque") 

            return consult
        } catch (error) {
            console.error("Houve um erro ao buscar setores no banco")
        }
    }
    
}