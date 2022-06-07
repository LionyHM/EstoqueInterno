import Product from '../../../model/Product'

export default  async function consultMvto(req, res) {

let mvtoToCode = await new Product
let product = await mvtoToCode.consultMvtoExist(req.body.codeBatch)

  res.status(200).json(product)
}
