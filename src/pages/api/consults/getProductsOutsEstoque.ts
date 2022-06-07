import GetProductsEstoque from "../../../model/GetProductsEstoque"

export default async function getProductsOutsEstoque(req, res){
    
    const getProductsEstoque = new GetProductsEstoque()
    
    const getOutQntdEstoque = await getProductsEstoque.getOutQntdEstoque()

    res.status(200).json(getOutQntdEstoque)
}