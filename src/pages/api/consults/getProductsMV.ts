import ProductMV from "../../../model/ProductMV"

export default async function getProductsMV(req, res) {

    const getProductsMV = new ProductMV()

    let product = await getProductsMV.getProductMV()
      res.status(200).json({product})
}