import { databaseMysql } from "../database/Mysql/Db";
import IGetProductsEstoque from "./Interface/IGetProductsEstoque";


export default class GetProductsEstoque implements IGetProductsEstoque{
   
    async getQntdEstoque(cod):Promise<object>{
        let setorLocal = await databaseMysql.select("SETOR").table("setor")
        let consult:any = ''
        console.log(cod)
        if(cod != undefined || cod != null){
            consult = await databaseMysql.select("CD_PRODUTO","DS_PRODUTO","LOTE","CD_ESTOQUE","DT_VALIDADE","MAX_REPROCESSADO").where("ATIVO","=","S").sum("QUANTIDADE as QUANTIDADE").andWhere("CD_PRODUTO","=", cod).andWhere("SETOR", "=",+setorLocal[0].SETOR ).table("estoque").groupBy("LOTE") 
        }else{
            consult = await databaseMysql.select("CD_PRODUTO","DS_PRODUTO","QUANTIDADE","LOTE","CD_ESTOQUE","DT_VALIDADE","MAX_REPROCESSADO").where("ATIVO","=","S").andWhere("SETOR", "=",+setorLocal[0].SETOR ).table("estoque")
        }
        
            
        console.log(consult.length)
        return consult
    }
    async getMaxQntdEstoque(setor):Promise<object>{
        let setorLocal = await databaseMysql.select("SETOR").table("setor")
        let consult = await databaseMysql.distinct("CD_PRODUTO","DS_PRODUTO").where("ATIVO","=","S").andWhere("SETOR", "=",+setorLocal[0].SETOR ).table("estoque")
            

        return consult
    }

    async getOutQntdEstoque(){
        let consultOuts = await databaseMysql.select("CD_PRODUTO","QUANTIDADE", "LOTE").where("ATIVO","=","S").whereNull("DATA_DEVOLUCAO").table("saidas_estoque")

        return consultOuts
    }
    
}