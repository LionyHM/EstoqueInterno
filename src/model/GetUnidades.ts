import { database } from "../database/OracleDb/Db";
import IGetUnidades from "./Interface/IGetUnidades";

export default class GetUnidades implements IGetUnidades{
    
    async getUnidades(): Promise<object> {
        try {
            const consult = await database.select("CD_UNI_PRO","CD_UNIDADE", "CD_PRODUTO","DS_UNIDADE", "VL_FATOR")
                                            .table("UNI_PRO")
                                            .orderBy("DS_UNIDADE", "asc")
            return consult
        } catch (error) {
            console.error("Houve um erro ao consultar as unidades")
        }
    }

    async getItensUnidades(): Promise<object> {
        try {
            const consult = await database.select("CD_UNIDADE", "DS_ITUNIDADE", "VL_FATOR")
                                            .table("ITUNIDADE")
                                            .orderBy("DS_ITUNIDADE", "asc")

            return consult
        } catch (error) {
            console.error("Houve um erro ao consultar os itens de unidades: " + error)
        }
    }
    
}