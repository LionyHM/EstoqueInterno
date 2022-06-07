import GetProductsEstoque from "../../../model/GetProductsEstoque"
import Cors from 'cors'

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '8mb' // Set desired value here
      }
  }
}
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

    if(req.method == "POST"){
      const productsEstoque = await getProductsEstoque.getQntdEstoque(req.body.cod)
      res.status(200).json(productsEstoque)
    }else{
      
      const productsEstoque = await getProductsEstoque.getQntdEstoque(req.body.setor)
  
      res.status(200).json(productsEstoque)

    }
}

