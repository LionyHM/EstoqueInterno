import GetProductsEstoque from "../../../model/GetProductsEstoque"
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }

export default async function getProductsEstoque(req, res){
    await runMiddleware(req, res, cors)
    const getProductsEstoque = new GetProductsEstoque()
    
    const productsEstoque = await getProductsEstoque.getMaxQntdEstoque(req.body.setor)

    res.status(200).json(productsEstoque)
}
