import ISetProduct from "./Interface/ISetProduct";
import {databaseMysql} from "../database/Mysql/Db"
import convertDate from "../functions/convertDate";

export default class SetProduct implements ISetProduct{
    cdMvto: number 
    cdProduto: number;
    dsProduto: string;
    qntdTotal: number;
    unidade: string;
    setor: number;
    lote: string;
    origem: number;
    dt_validade: string;
    val_reprocess: number | boolean;
    user: string
    setorEstoque: string

    constructor(cdMvto: number, cdProduto: number,
         dsProduto: string, qntdTotal: number,
          unidade: string, setor: number, lote: string, origem: number,
          dt_validade: string, val_reprocess: number | boolean = null, user: string, setorEstoque: string){
            
            this.cdMvto = cdMvto
            this.cdProduto = cdProduto
            this.dsProduto = dsProduto
            this.qntdTotal= +qntdTotal
            this.unidade = unidade
            this.setor = setor
            this.lote = lote
            this.origem = +origem
            this.dt_validade = this.dt_validade 
            this.val_reprocess = +val_reprocess
            this.user = user
            this.setorEstoque = setorEstoque
        
           }

    async getProductInventory(): Promise<void>{               
        try {
            var consult = await databaseMysql.where({CD_PRODUTO: +this.cdProduto}).table("estoque")
        } catch (error) {
            console.log("Houve um erro ao buscar produto no estoque")
        }

        if(consult?.length > 0){
            await this.setProduct()
            await this.setMvto()
        }else{
            await this.setProduct()
            await this.setMvto()
        }
    }

    async setProduct(): Promise<boolean> {        

            try {
            
                await databaseMysql.insert({CD_MVTO: this.cdMvto,
                                            CD_PRODUTO: +this.cdProduto,
                                            DS_PRODUTO: this.dsProduto,
                                            SETOR: this.setorEstoque,
                                            LOTE: this.lote == 'null' || this.lote == null || this.lote == undefined || this.lote == "S.L" || this.lote == ''  ? "S/N" : this.lote,
                                            QUANTIDADE: +this.qntdTotal,
                                            UNIDADE: this.unidade,
                                            DS_REPROCESSADO: this.val_reprocess == null || this.val_reprocess == 1 || this.val_reprocess == 4 || this.val_reprocess == 0 ?  "N" : "S",
                                            MAX_REPROCESSADO: this.val_reprocess,
                                            DT_VALIDADE: this.dt_validade == null || this.dt_validade == 'null' ? null : this.dt_validade.slice(0,10),
                                            DT_CRIACAO: convertDate(),
                                            DT_ATUALIZACAO: convertDate(),
                                            USUARIO_ENTRADA: this.user
                                          })
                               .table("estoque")
    
    
                return true
            } catch (error) {
                console.error("Não foi possível gravar dados do produto no banco: " + error)
                return false
            }

    }

    async updateProduct(): Promise<boolean>{
        try {
            let qntdTotal = await databaseMysql.select("QUANTIDADE")
                                            .where({CD_PRODUTO: +this.cdProduto})
                                            .table("estoque")         
                                       
            try {
                await databaseMysql
                        .update({QUANTIDADE: (+this.qntdTotal + qntdTotal[0].QUANTIDADE),
                            DT_ATUALIZACAO: convertDate()})
                        .where({CD_PRODUTO: +this.cdProduto})
                        .table("estoque")    
                        
                await this.setMvto()
                        
            } catch (error) {
                console.error("Houve um erro ao gravar quantidades atuias dos produtos no estoque: " + error)
                return false
            }
        } catch (error) {
            console.error("Houve um erro ao buscar quantidades atuias dos produtos no estoque: " + error)
            return false
        }

        return true
    }

    async setMvto(tpMvto = "E"){
        try {
            
            await databaseMysql.insert({
                 CD_MVTO: this.cdMvto,
                 CD_PRODUTO: +this.cdProduto,
                 LOTE: this.lote == 'null' || this.lote == null || this.lote == undefined || this.lote == "S.L" || this.lote == ''  ? "S/N" : this.lote,
                 QUANTIDADE: +this.qntdTotal,
                 UNIDADE: this.unidade,
                 SETOR: +this.setor,
                 ORIGEM: +this.origem,
                 TP_MOVIMENTACAO:  tpMvto,
                 DATA_MVTO: convertDate(),
                 USUARIO_IMPORTACAO: this.user
                 })
            .table("movimentacao")

            return true

        } catch (error) {
            console.error("Houve um erro ao salvar movimentação no banco: " + error)
            return false
        }
    }

    async consultProduct(codProd, qntd, lote, setor){
        try {
            let qntdProd = await databaseMysql.count()
                                .where("CD_PRODUTO","=",codProd)
                                .sum("QUANTIDADE as QUANTIDADE")
                                .andWhere("LOTE","=",lote)
                                .andWhere("SETOR", "=", setor)
                                .table("estoque")

            if(qntdProd[0].QUANTIDADE >= qntd){
                return true
            }else{
                return false
            }
        } catch (error) {
            console.log("Houve um erro ao consultar se há quantidade disponível no estoque + " + error)

            return false
        }
    }
    
    async setProductOut(){        
       
        try {
                try {
                    let qntdEntradas = await databaseMysql.select("CD_ESTOQUE").where("CD_PRODUTO","=",this.cdProduto).andWhere("LOTE","=",this.lote).table("estoque")
                    for(let i = 0; i < qntdEntradas.length; i++){
                        let consultCdEstoque = await databaseMysql
                        .select("CD_ESTOQUE","QUANTIDADE")
                        .where("CD_PRODUTO","=",this.cdProduto)
                        .andWhere("LOTE","=",this.lote)
                        .andWhere("QUANTIDADE",">",0)
                        .table("estoque")
                        if(+this.qntdTotal <= 0){
                            return true
                        }
                        if(consultCdEstoque.length > 0 && consultCdEstoque[i] != undefined){

                            if(consultCdEstoque[i]?.QUANTIDADE >= +this.qntdTotal && +this.qntdTotal > 0){
                                    await databaseMysql
                                    .update({QUANTIDADE: consultCdEstoque[i]?.QUANTIDADE - +this.qntdTotal})
                                    .where("CD_ESTOQUE","=",consultCdEstoque[i]?.CD_ESTOQUE)
                                    .table("estoque")
        
                                    await databaseMysql.insert({
                                        CD_PRODUTO: +this.cdProduto,
                                        CD_MVTO: +this.cdMvto,
                                        UNIDADE: this.unidade,
                                        CD_ESTOQUE: consultCdEstoque[i]?.CD_ESTOQUE,
                                        DS_PRODUTO: this.dsProduto,
                                        LOTE: this.lote == 'null' || this.lote == null || this.lote == undefined || this.lote == "S.L" || this.lote == ''  ? "S/N" : this.lote,
                                        QUANTIDADE: +this.qntdTotal,
                                        ORIGEM: this.setorEstoque,
                                        SETOR: this.origem,
                                        DT_VALIDADE:  this.dt_validade == null || this.dt_validade == "S/N" ? null : this.dt_validade,
                                        DATA_SAIDA: convertDate(),
                                        USUARIO_RECEPTOR: this.user})
                                        .table("saidas_estoque")
    
                                        return true
                                    }else{
                                        await databaseMysql
                                        .update({QUANTIDADE: 0})
                                        .where("CD_ESTOQUE","=",consultCdEstoque[i]?.CD_ESTOQUE)
                                        .table("estoque")
    
                                        await databaseMysql.insert({
                                            CD_PRODUTO: +this.cdProduto,
                                            CD_MVTO: +this.cdMvto,
                                            UNIDADE: this.unidade,
                                            CD_ESTOQUE: consultCdEstoque[i]?.CD_ESTOQUE,
                                            DS_PRODUTO: this.dsProduto,
                                            LOTE: this.lote == 'null' || this.lote == null || this.lote == undefined || this.lote == "S.L" || this.lote == ''  ? "S/N" : this.lote,
                                            QUANTIDADE: +consultCdEstoque[i]?.QUANTIDADE,
                                            ORIGEM: this.setorEstoque,
                                            SETOR: this.origem,
                                            DT_VALIDADE:  this.dt_validade == null || this.dt_validade == "S/N" ? null : this.dt_validade,
                                            DATA_SAIDA: convertDate(),
                                            USUARIO_RECEPTOR: this.user})
                                            .table("saidas_estoque")
    
                                        this.qntdTotal = +this.qntdTotal - +consultCdEstoque[i]?.QUANTIDADE
                                        
                                        if(+this.qntdTotal == 0){
    
                                            await databaseMysql.insert({
                                                CD_PRODUTO: +this.cdProduto,
                                                CD_MVTO: +this.cdMvto,
                                                UNIDADE: this.unidade,
                                                CD_ESTOQUE: consultCdEstoque[i]?.CD_ESTOQUE,
                                                DS_PRODUTO: this.dsProduto,
                                                LOTE: this.lote == 'null' || this.lote == null || this.lote == undefined || this.lote == "S.L" || this.lote == ''  ? "S/N" : this.lote,
                                                QUANTIDADE: +consultCdEstoque[i]?.QUANTIDADE,
                                                ORIGEM: this.setorEstoque,
                                                SETOR: this.origem,
                                                DT_VALIDADE:  this.dt_validade == null || this.dt_validade == "S/N" ? null : this.dt_validade,
                                                DATA_SAIDA: convertDate(),
                                                USUARIO_RECEPTOR: this.user
                                            })
                                            .table("saidas_estoque")
    
                                                return true
                                        }
                                while(+this.qntdTotal != 0){
                                        let consultCdEstoqueNext = await databaseMysql
                                        .select("CD_ESTOQUE","QUANTIDADE")
                                        .where("CD_PRODUTO","=",this.cdProduto)
                                        .andWhere("CD_ESTOQUE","!=",consultCdEstoque[i]?.CD_ESTOQUE)
                                        .andWhere("QUANTIDADE",">",0)
                                        .andWhere("LOTE","=",this.lote)
                                        .limit(1)
                                        .table("estoque")
    
                                        let qntdSub = +this.qntdTotal
                                        this.qntdTotal = +this.qntdTotal - +consultCdEstoqueNext[0]?.QUANTIDADE
   
                                        if(this.qntdTotal == 0){
                                            await databaseMysql
                                            .update({QUANTIDADE: 0})
                                            .where("CD_ESTOQUE","=",consultCdEstoqueNext[0]?.CD_ESTOQUE)                         
                                            .table("estoque")
    
                                            await databaseMysql.insert({
                                                CD_PRODUTO: +this.cdProduto,
                                                CD_MVTO: +this.cdMvto,
                                                UNIDADE: this.unidade,
                                                CD_ESTOQUE: consultCdEstoqueNext[0]?.CD_ESTOQUE,
                                                DS_PRODUTO: this.dsProduto,
                                                LOTE: this.lote == 'null' || this.lote == null || this.lote == undefined || this.lote == "S.L" || this.lote == ''  ? "S/N" : this.lote,
                                                QUANTIDADE: +consultCdEstoqueNext[0]?.QUANTIDADE,
                                                ORIGEM: this.setorEstoque,
                                                SETOR: this.origem,
                                                DT_VALIDADE:  this.dt_validade == null || this.dt_validade == "S/N" ? null : this.dt_validade,
                                                DATA_SAIDA: convertDate(),
                                                USUARIO_RECEPTOR: this.user
                                            })
                                            .table("saidas_estoque")
    
                                            break
                                        }else if(+this.qntdTotal < 0){
                                            await databaseMysql
                                            .update({QUANTIDADE: +this.qntdTotal * -1})
                                            .where("CD_ESTOQUE","=",consultCdEstoqueNext[0]?.CD_ESTOQUE)                         
                                            .table("estoque")
    
                                            await databaseMysql.insert({
                                                CD_PRODUTO: +this.cdProduto,
                                                CD_MVTO: +this.cdMvto,
                                                UNIDADE: this.unidade,
                                                CD_ESTOQUE: consultCdEstoqueNext[0]?.CD_ESTOQUE,
                                                DS_PRODUTO: this.dsProduto,
                                                LOTE: this.lote == 'null' || this.lote == null || this.lote == undefined || this.lote == "S.L" || this.lote == ''  ? "S/N" : this.lote,
                                                QUANTIDADE: +qntdSub,
                                                ORIGEM: this.setorEstoque,
                                                SETOR: this.origem,
                                                DT_VALIDADE:  this.dt_validade == null || this.dt_validade == "S/N" ? null : this.dt_validade,
                                                DATA_SAIDA: convertDate(),
                                                USUARIO_RECEPTOR: this.user
                                            })
                                            .table("saidas_estoque")
    
                                            break
                                        } else if(+this.qntdTotal > 0){
                                            await databaseMysql
                                            .update({QUANTIDADE: 0})
                                            .where("CD_ESTOQUE","=",consultCdEstoqueNext[0]?.CD_ESTOQUE)                         
                                            .table("estoque")
    
                                            await databaseMysql.insert({
                                                CD_PRODUTO: +this.cdProduto,
                                                CD_MVTO: +this.cdMvto,
                                                UNIDADE: this.unidade,
                                                CD_ESTOQUE: consultCdEstoqueNext[0]?.CD_ESTOQUE,
                                                DS_PRODUTO: this.dsProduto,
                                                LOTE: this.lote == 'null' || this.lote == null || this.lote == undefined || this.lote == "S.L" || this.lote == ''  ? "S/N" : this.lote,
                                                QUANTIDADE: +consultCdEstoqueNext[0]?.QUANTIDADE,
                                                ORIGEM: this.setorEstoque,
                                                SETOR: this.origem,
                                                DT_VALIDADE:  this.dt_validade == null || this.dt_validade == "S/N" ? null : this.dt_validade,
                                                DATA_SAIDA: convertDate(),
                                                USUARIO_RECEPTOR: this.user
                                            })
                                            .table("saidas_estoque")
                                        }
                                }
    
    
    
                            }

                            if(+this.qntdTotal <= 0){
                                return true
                            }
    
                        }else{
                            return false
                        }
                        }    
                   
                    
                } catch (error) {
                    console.log(error)
                }

            } catch (error) {
                console.error("Houve um erro ao alterar o setor do produto no estoque: " + error)
                return false
            }
       
    }
    
}
