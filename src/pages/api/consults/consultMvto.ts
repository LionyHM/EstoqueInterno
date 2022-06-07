import Product from '../../../model/Product'

export default  async function consultMvto(req, res) {

let mvtoToCode = await new Product
let product:object = await mvtoToCode.showProduct(req.body.codeBatch || 12507506)

  res.status(200).json(product)
}
