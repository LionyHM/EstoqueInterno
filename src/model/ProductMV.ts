import { database } from "../database/OracleDb/Db";
import IProductMV from "./Interface/IProductMV";

export default class ProductMV implements IProductMV{


    async getProductMV(): Promise<object> {
       
            try {
                let consult = await database.select("CD_PRODUTO", "DS_PRODUTO")
                                            .where("SN_MOVIMENTACAO","=","S")
                                            .andWhere("SN_BLOQUEIO_DE_COMPRA","=","N")
                                            .whereRaw("CD_ESPECIE not in (1,2,3,4,7,11,13,19,20,23)")
                                            .whereNot("DS_PRODUTO","like","%INATIVO%")
                                            .table("PRODUTO")

                return consult

            } catch (error) {
                console.error("Houve um erro ao buscar produtos no banco do sistema MV: " + error)
            }
        
    }
    
}