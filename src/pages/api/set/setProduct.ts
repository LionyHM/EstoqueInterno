import SetProduct from "../../../model/SetProduct"

export default async function setProduct(req, res) {

    let validDatabaseRec = false
    let tpMvto = ""

    for(let i = 0; i < req.body.ProductSaida.length; i++){
        

            var setProduct = await new SetProduct(req.body.ProductSaida[i].cd_mvto,
                    req.body.ProductSaida[i].cd_product,
                    req.body.ProductSaida[i].ds_product,
                    req.body.ProductSaida[i].mvtoTotal,
                    req.body.ProductSaida[i].cd_uni,
                    req.body.ProductSaida[i].setorEstoque,
                    req.body.ProductSaida[i].cd_lote,
                    req.body.ProductSaida[i].cd_origem,
                    req.body.ProductSaida[i].dt_validade,
                    req.body.ProductSaida[i].val_reprocess,
                    req.body.user,
                    req.body.ProductSaida[i].setorEstoque)
                    
                if(req.body.saida != undefined){
                    let qntdValid = await setProduct.consultProduct(req.body.ProductSaida[i].cd_product,
                        req.body.ProductSaida[i].mvtoTotal,
                        req.body.ProductSaida[i].cd_lote,
                        req.body.ProductSaida[i].setorEstoque)
                    if(qntdValid){
                        validDatabaseRec = await setProduct.setProductOut()
                        tpMvto = "S"
                    }
                }else{
                    validDatabaseRec = await setProduct.setProduct()
                    tpMvto = "E"
                }
                
            
            var setProductMvto = await new SetProduct(req.body.ProductSaida[i].cd_mvto,
                                                        req.body.ProductSaida[i].cd_product,
                                                        req.body.ProductSaida[i].ds_product,
                                                        +req.body.ProductSaida[i].mvtoTotal,
                                                        req.body.ProductSaida[i].cd_uni,
                                                        req.body.ProductSaida[i].setorEstoque,
                                                        req.body.ProductSaida[i].cd_lote,
                                                        req.body.ProductSaida[i].cd_origem,
                                                        req.body.ProductSaida[i].dt_validade,
                                                        req.body.ProductSaida[i].val_reprocess,
                                                        req.body.user,
                                                        req.body.ProductSaida[i].setorEstoque)
            if(validDatabaseRec){
                validDatabaseRec = await setProductMvto.setMvto(tpMvto)
    
            }
        }

        res.status(200).json(validDatabaseRec)  
}
