import IProduct from "./Interface/IProduct";
import {database} from "../database/OracleDb/Db"
import {databaseMysql} from "../database/Mysql/Db"

export default class Product implements IProduct{
    codigo: number;
    date: string;
    sector: string;
    batch: number;
    qntd: number;
    unity: string;
    unityDescription: string;
    factor: number;
    codeProduct: number;
    productDescription: string;
    productDescriptionRes: string;

    construction(
    codigo: number,
    date: string,
    sector: string,
    batch: number,
    qntd: number,
    unity: string,
    unityDescription: string,
    factor: number,
    codeProduct: number,
    productDescription: string,
    productDescriptionRes: string,
    ){
        this.codigo = codigo
        this.date = date
        this.sector = sector
        this.batch = batch
        this.qntd = qntd
        this.unity = unity
        this.unityDescription = unityDescription
        this.unityDescription = unityDescription,
        this.factor = factor,
        this.codeProduct = codeProduct,
        this.productDescription = productDescription,
        this.productDescriptionRes = productDescriptionRes

    }

    async consultMvtoExist(codeMvto){
        let consult = await databaseMysql.select("*")
                                            .where("CD_MVTO","=",codeMvto)
                                            .table("movimentacao")

        if(consult.length > 0){
            return false
        }else{
            return true
        }
    }


    async showProduct(cdMvtoEstoque: number):Promise<object>{
        let especie = await databaseMysql.select("CD_ESPECIE").table("config")
        let classe = await databaseMysql.select("CD_CLASSE").table("config")
        let arrEspec:any = []
        let arrClasse:any = []

        for(let x = 0; x < especie.length;x++){
            arrEspec.push(especie[x].CD_ESPECIE)
            arrClasse.push(classe[x].CD_CLASSE)
        }

        let setorLocal = await databaseMysql.select("SETOR").table("setor")
        try {
            const mvtoToCode:object = await database
            .distinct("pr.CD_PRODUTO")
            .select(
                "mvto.CD_MVTO_ESTOQUE",
                "mvto.HR_MVTO_ESTOQUE",
                "mvto.CD_SETOR",
                "mvto.CD_ESTOQUE",
                "itmvto.CD_LOTE",
                "itmvto.QT_MOVIMENTACAO",
                "un.CD_UNIDADE",
                "un.DS_UNIDADE",
                "un.VL_FATOR",
                "pr.CD_PRODUTO",                              
                "pr.DS_PRODUTO",                              
                "pr.DS_PRODUTO_RESUMIDO",
                "itmvto.DT_VALIDADE"                              
                )
                .where({"mvto.CD_SETOR": setorLocal[0].SETOR, "mvto.CD_MVTO_ESTOQUE": cdMvtoEstoque})
                .whereRaw("CD_ESPECIE not in (" + arrEspec + ") and CD_CLASSE not in (" + arrClasse + ")")
                .table("MVTO_ESTOQUE as mvto")
                .join("ITMVTO_ESTOQUE as itmvto", "mvto.CD_MVTO_ESTOQUE","=", "itmvto.CD_MVTO_ESTOQUE")
                .join("PRODUTO as pr", "itmvto.CD_PRODUTO", "=", "pr.CD_PRODUTO")
                .join("UNI_PRO as un", "un.CD_UNI_PRO", "=", "itmvto.CD_UNI_PRO")
                .fullOuterJoin("LOT_PRO as l", "l.CD_LOTE", "=", "itmvto.CD_LOTE")
                .fullOuterJoin("LOT_PRO as lot", "lot.CD_PRODUTO", "=", "pr.CD_PRODUTO")
                .orderBy("mvto.CD_MVTO_ESTOQUE", "desc")


                return mvtoToCode
        } catch (error) {
            console.error("Houve um erro ao fazer o Select das informações da movimentação: " + error)
        }

    }

    async getProductsIn(){
        let setorLocal = await databaseMysql.select("SETOR").table("setor")
        let consult = await databaseMysql
        .distinct("mvto.CD_PRODUTO")
        .select("p.DS_PRODUTO","mvto.UNIDADE", "mvto.QUANTIDADE", "mvto.DATA_MVTO", "mvto.CD_MVTO", "mvto.ORIGEM","mvto.CD_PRODUTO")
        .where("p.SETOR","=", setorLocal[0].SETOR)/*  */
        .andWhere("mvto.TP_MOVIMENTACAO","=", "E")/*  */
        .limit(10)
        .table("estoque as p")
        .join("movimentacao as mvto", "mvto.CD_PRODUTO", "=", "p.CD_PRODUTO")
        .orderBy("mvto.DATA_MVTO", "desc")
        
        
        for(let i = 0; i < consult.length; i++){
            if(consult[i].CD_MVTO > 100000000){
                let consultEstoque = await database.select("NM_SETOR").where("CD_SETOR", "=", +consult[i].ORIGEM).table("SETOR")
                consult[i].ORIGEM = consultEstoque[0].NM_SETOR

            }else{
                let consultEstoque = await database.select("DS_ESTOQUE").where("CD_ESTOQUE", "=", +consult[i].ORIGEM).table("ESTOQUE")
                consult[i].ORIGEM = consultEstoque[0].DS_ESTOQUE
            }
        }
        
        return consult
    }    
    async getProductsInQntd(){
        let consult = await databaseMysql
        .select("*")
        .table("estoque")        
        
               
        return consult
    }    


    async getProductsOut(){
        let consult = await databaseMysql
        .select("CD_PRODUTO","CD_ESTOQUE","DS_PRODUTO", "ORIGEM", "SETOR", "DATA_SAIDA", "DATA_DEVOLUCAO","LOTE")
        .count("* AS QUANTIDADE")
        .limit(10)
        .table("saidas_estoque")
        .groupBy("SETOR")
        .groupBy("SETOR")
        .orderBy("DATA_SAIDA", "desc")

        for(let i = 0; i < consult.length; i++){
            
                let consultEstoque = await database.select("NM_SETOR").where("CD_SETOR", "=", +consult[i].SETOR).table("SETOR")
                consult[i].CD_SETOR = consult[i].SETOR 
                consult[i].SETOR = consultEstoque[0].NM_SETOR
            
        }

        return consult
    }
    async getProductsOutDevolutions(){
        let consult = await databaseMysql
        .select("CD_SAIDA","CD_ESTOQUE" ,"CD_PRODUTO", "DS_PRODUTO","UNIDADE", "ORIGEM", "SETOR", "DATA_SAIDA", "DATA_DEVOLUCAO", "LOTE")
        .sum("QUANTIDADE AS QUANTIDADE")
        .whereNull("DATA_DEVOLUCAO")
        .andWhere("ATIVO", "=", "S")
        .groupBy("SETOR")
        .groupBy("LOTE")
        .groupBy("DS_PRODUTO")
        .orderBy("DS_PRODUTO")
        .table("saidas_estoque")
    
        for(let i = 0; i < consult.length; i++){
            
                let consultEstoque = await database.select("NM_SETOR").where("CD_SETOR", "=", +consult[i].SETOR).table("SETOR")
                consult[i].CD_SETOR = consult[i].SETOR 
                consult[i].SETOR = consultEstoque[0].NM_SETOR
            
        }

        return consult
    }

}