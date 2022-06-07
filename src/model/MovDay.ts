import IMovDay from "./Interface/IMovDay";
import {database} from "../database/OracleDb/Db"
import {databaseMysql} from "../database/Mysql/Db"

export default class MovDay implements IMovDay{
    codigo: number;
    async showMvtoDay():Promise<object> {
        let especie = await databaseMysql.select("CD_ESPECIE").table("config")
        let classe = await databaseMysql.select("CD_CLASSE").table("config")
        let arrEspec:any = []
        let arrClasse:any = []
        let setorLocal = await databaseMysql.select("SETOR").table("setor")
        
        for(let x = 0; x < especie.length;x++){
            arrEspec.push(especie[x].CD_ESPECIE)
            arrClasse.push(classe[x].CD_CLASSE)
        }

       try {

        let mvtoDay = await database.distinct(
            "mvto.CD_MVTO_ESTOQUE"                           
            )
            .where("mvto.CD_SETOR", "=", setorLocal[0].SETOR)
            .whereRaw("(CD_ESPECIE not in (" + arrEspec + ") and CD_CLASSE not in (" + arrClasse + "))")
            .andWhere(database.raw("HR_MVTO_ESTOQUE > sysdate - 30"))
            .table("MVTO_ESTOQUE as mvto")
            .join("ITMVTO_ESTOQUE as itmvto", "mvto.CD_MVTO_ESTOQUE","=", "itmvto.CD_MVTO_ESTOQUE")
            .join("PRODUTO as pr", "itmvto.CD_PRODUTO", "=", "pr.CD_PRODUTO")
            .join("UNI_PRO as un", "un.CD_UNI_PRO", "=", "itmvto.CD_UNI_PRO")

        return mvtoDay
           
       } catch (error) {
           console.error("Houve um erro ao exibir as movimentações pendentes: " + error)
       }
    }

    
    async ifMvtoExist(cdMvto: number):Promise<boolean>{
        try {
            let consult = await databaseMysql.where({CD_MVTO: cdMvto}).table("movimentacao")

            if(consult.length > 0){
                return true
            }else{
                return false
            }
        } catch (error) {
            console.error("Houve um erro ao conferir se movimentação já está lançada: " + error)
        }
    }

}